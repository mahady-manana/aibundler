import { azureCrossModelAuth, readStream } from "@/azure/authentication";
import { systemInst } from "@/azure/instruction";
import { verifySession } from "@/services/session/session";
import { ChatMessage } from "@/types/chat";
import { NextRequest } from "next/server";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  try {
    // Authentication check
    const session = await verifySession();
    if (!session.isAuth || !session.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request body
    let body;
    try {
      body = await readStream(req);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, summary, model } = body;
    const client = azureCrossModelAuth(model);

    // API request
    const oaiResponse = await client.chat.completions.create({
      model: model || "gpt-4.1",
      messages: [
        {
          role: "system",
          content: systemInst(summary),
        },
        ...messages.map((m: ChatMessage) => ({ ...m, type: "text" })),
      ],
      temperature: 0.3,
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

    throw Error("[ERROR: Service interrupted]");
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
