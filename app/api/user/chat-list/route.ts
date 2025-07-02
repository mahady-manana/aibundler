import { prisma } from "@/prisma/prisma";
import { verifySession } from "@/services/session/session";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const saveChat = await prisma.chat.findMany({
      where: { userId: session.userId },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(saveChat);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
};
