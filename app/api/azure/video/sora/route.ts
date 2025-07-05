import { azureSoraKeys, readStream } from "@/azure/authentication";
import { verifySession } from "@/services/session/session";
import { NextRequest, NextResponse } from "next/server";

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
    const { apiKey, deployment, endpoint } = await azureSoraKeys();

    // API request
    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json", "Api-key": apiKey } as any,
      method: "POST",
      body: JSON.stringify({
        model: "sora",
        prompt: "Create a cat video",
        height: "1080",
        width: "1080",
      }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
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
