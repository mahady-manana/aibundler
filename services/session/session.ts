"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);

    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const session = await encrypt({ userId });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

import "server-only";

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as { userId: string | null };
  if (!session?.userId) {
    return { isAuth: false, userId: null };
  }

  return { isAuth: true, userId: session?.userId };
};
