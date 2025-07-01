import { azureChatAuth } from "@/azure/authentication";
import { verifySession } from "@/services/session/session";
import { ChatMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

const systemInst = (sum?: string) =>
  `
You are a summarizer. Your task is to summarize the following conversation between a USER and an AI Assistant.

This summary will be reused as system context in future chat turns. Focus on the key topics, user goals, and assistant responses. Be concise and informative. Do not repeat every turn, and avoid unnecessary details.

IMPORTANT:
- If the user has defined any specific rules or constraints, preserve them exactly as stated.
- Ensure the summary includes enough context to allow the assistant to continue the conversation naturally and helpfully.

Below is the prior conversation summary (if any):

# Prior Summary and Context:
${sum?.trim() || "No previous summary available."}
`.trim();

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
      temperature: 0.3,
    });
    const content = oaiResponse.choices.at(0)?.message.content;
    if (content) {
      return NextResponse.json({ summary: content });
    }

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    throw Error("ERROR");
  }
};

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
