import { azureDeepSeekAuth } from "@/azure/authentication";
import { systemInst } from "@/azure/instruction";
import { verifySession } from "@/services/session/session";
import { ChatMessage } from "@/types/chat";
import { createSseStream } from "@azure/core-sse";
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
      body = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, summary } = body;
    const client = azureDeepSeekAuth();

    // API request
    const response = await client
      .path("/chat/completions")
      .post({
        body: {
          messages: [
            {
              role: "system",
              content: systemInst(summary),
            },
            ...messages.map((m: ChatMessage) => ({
              ...m,
              content: m.content || "",
            })),
          ],
          model: "DeepSeek-R1-0528",
          stream: true,
          temperature: 0.3,
        },
      })
      .asNodeStream();

    // Validate response
    if (response.status === "nok") {
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Empty response stream from API");
    }

    // SSE Stream processing
    const encoder = new TextEncoder();
    const sses = createSseStream(response.body);

    async function* generateStream() {
      try {
        for await (const event of sses) {
          if (event.data === "[DONE]") break;

          const data = JSON.parse(event.data);
          for (const choice of data.choices) {
            const content = choice.delta?.content || "";
            const transformed = content
              .replace(
                /<think>/g,
                '\n<div class="thinking space-y-4">\n<p class="tk-title">Thinking...</p>\n'
              )
              .replace(/<\/think>/g, "\n</div>\n");

            if (transformed) {
              yield encoder.encode(transformed);
            }
          }
        }
      } catch (e) {
        console.error("Stream processing error:", e);
        yield encoder.encode("\n\n[ERROR: Stream processing failed]");
      }
    }

    // Return streaming response
    return new Response(iteratorToStream(generateStream()), {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Convert async iterator to ReadableStream
function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) controller.close();
        else controller.enqueue(value);
      } catch (e) {
        controller.enqueue(
          new TextEncoder().encode("\n[ERROR: Stream interrupted]")
        );
        controller.close();
      }
    },
  });
}
