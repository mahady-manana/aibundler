import { azureChatAuth } from "@/azure/authentication";
import { systemInst } from "@/azure/instruction";
import { verifySession } from "@/services/session/session";
import { ChatMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;
export const POST = async (req: NextRequest, res: any) => {
  try {
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await readStream(req);
    const { messages, summary } = body;

    const client = await azureChatAuth();
    const oaiResponse = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: systemInst(summary),
        },
        ...messages.map((m: ChatMessage) => ({ ...m, type: "text" })),
      ],
      temperature: 0.7,
      stream: true,
      stream_options: { include_usage: true },
    });
    const encoder = new TextEncoder();

    async function* makeIterator() {
      for await (const chunk of oaiResponse) {
        const delta = chunk.choices[0]?.delta?.content as string;
        if (delta) {
          yield encoder.encode(delta);
        }
      }
    }

    return new Response(iteratorToStream(makeIterator()));
  } catch (error) {
    console.log(error);

    throw Error("ERROR");
  }
};

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

async function readStream(req: any) {
  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    result += decoder.decode(value, { stream: true });
  }

  return JSON.parse(result);
}
