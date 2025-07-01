import { prisma } from "@/prisma/prisma";
import { verifySession } from "@/services/session/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const { userId } = data;
    const saveChat = await prisma.chat.create({
      data: {
        userId: userId,
        name: "New Chat",
      },
    });
    return NextResponse.json(saveChat);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const { messages, chatId, summary } = data;
    const saveChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        messages: messages,
        summary: summary,
      },
    });
    return NextResponse.json(saveChat);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
};
export const DELETE = async (request: Request) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const { messages, chatId, summary } = data;
    const saveChat = await prisma.chat.delete({
      where: { id: chatId },
    });
    return NextResponse.json(saveChat);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const searchParams = request.nextUrl.searchParams;
    const chatId = searchParams.get("chatId");
    if (!chatId) {
      return NextResponse.json({ error: "Error" }, { status: 400 });
    }
    const saveChat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
    return NextResponse.json(saveChat);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
};
