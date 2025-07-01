"use server";
import { prisma } from "@/prisma/prisma";
import { UserType } from "@/types/user";
import { verifySession } from "../session/session";

export const getUser = async () => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      include: {
        chat: true,
      },
    });
    return user as UserType;
  } catch (error) {
    console.log(error);

    return null;
  }
};
