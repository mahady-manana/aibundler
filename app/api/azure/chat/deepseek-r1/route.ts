import { azureDeepSeekAuth } from "@/azure/authentication";
import { systemInst } from "@/azure/instruction";
import { verifySession } from "@/services/session/session";
import { ChatMessage } from "@/types/chat";
import { createSseStream } from "@azure/core-sse";
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

    const client = azureDeepSeekAuth();

    let response = await client
      .path("chat/completions")
      .post({
        body: {
          messages: [
            {
              role: "system",
              content: systemInst(summary),
            },
            ...messages.map((m: ChatMessage) => ({ ...m, type: "text" })),
          ],
          max_tokens: 1000,
          model: "DeepSeek-R1-0528",
          stream: true,
          response_format: { type: "text" },
          temperature: 0.3,
        },
      })
      .asNodeStream();

    const encoder = new TextEncoder();

    const stream = response.body;
    if (!stream) {
      throw new Error("The response stream is undefined");
    }

    if (response.status !== "200") {
      throw new Error("Failed to get chat completions");
    }

    const sses = createSseStream(stream as any);
    async function* makeIterator() {
      for await (const event of sses) {
        if (event.data === "[DONE]") {
          return;
        }
        for (const choice of JSON.parse(event.data).choices) {
          const content = choice.delta?.content as string;
          const delta = content
            ?.replace(
              /<think>/g,
              '\n<div class="thinking space-y-4">\n<p class="tk-title">Thinking...</p>\n'
            )
            ?.replace(/<\/think>/g, "\n</div>\n");
          if (delta) {
            yield encoder.encode(delta);
          }
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
