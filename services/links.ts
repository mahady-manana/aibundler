"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/services/session/session";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createShortLink(userId: string) {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      throw new Error("Unauthorized");
    }
    if (userId !== session.userId) {
      throw new Error("Unauthorized");
    }

    // Check if user already has a short link
    const existingLink = await prisma.userLink.findFirst({
      where: { userId },
    });

    if (existingLink) {
      return { success: true, link: existingLink };
    }

    // Try to create a new short link with retries
    let attempts = 0;
    const maxAttempts = 5;
    let link = null;

    while (attempts < maxAttempts) {
      const shortCode = nanoid(8);

      // Check if the code already exists
      const existingCode = await prisma.userLink.findUnique({
        where: { link: shortCode },
      });

      if (!existingCode) {
        // Create new short link with unique code
        link = await prisma.userLink.create({
          data: {
            userId,
            link: shortCode,
          },
        });
        break;
      }

      attempts++;
    }

    if (!link) {
      throw new Error(
        "Failed to generate unique short link after multiple attempts"
      );
    }

    return { success: true, link };
  } catch (error) {
    console.error("Error creating short link:", error);
    throw error;
  }
}

export async function getUserLink(userId: string) {
  try {
    const link = await prisma.userLink.findFirst({
      where: { userId },
    });
    return link;
  } catch (error) {
    console.error("Error getting user link:", error);
    return null;
  }
}

export async function visitLink(linkCode: string) {
  let redirectLink = "";
  try {
    const link = await prisma.userLink.findFirst({
      where: { link: linkCode },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    if (link?.id && link.user?.username) {
      await prisma.userLink.update({
        where: { link: linkCode },
        data: {
          visits: {
            increment: 1,
          },
        },
      });
      redirectLink = "/me/" + link.user.username;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user link:", error);
    return null;
  }
  if (redirectLink) {
    redirect(redirectLink);
  }
}
