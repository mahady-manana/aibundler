"use server";
import { prisma } from "@/prisma/prisma";
import { createSession } from "@/services/session/session";
import { OAuth2Client } from "google-auth-library";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string): Promise<GoogleUser> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("No payload in Google token");
    }

    return {
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture!,
      sub: payload.sub!,
    };
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Failed to verify Google token");
  }
}

export async function getGoogleUser(
  token: string,
  credential?: boolean
): Promise<GoogleUser> {
  // If the token is a JWT (from one-tap login)
  if (credential) {
    return verifyGoogleToken(token);
  }

  // If the token is an access token (from OAuth flow)
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Google user");
  }

  return response.json();
}

export async function handleGoogleAuth(token: string, credential?: boolean) {
  try {
    const googleUser = await getGoogleUser(token, credential);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          googleId: googleUser.sub,
        },
      });

      // Create session
      await createSession(user.id);

      // Return path for new users
      return "/app/chat/";
    }

    // Create session
    await createSession(user.id);

    // Return path for existing users
    return "/app/chat";
  } catch (error) {
    console.error("Google auth error:", error);
    throw error;
  }
}
