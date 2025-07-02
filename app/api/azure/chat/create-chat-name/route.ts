import { azureChatAuth } from "@/azure/authentication";
import { verifySession } from "@/services/session/session";
import { NextRequest, NextResponse } from "next/server";

const systemInst = (conversation: string, sum?: string) =>
  `
Your task is to create a short title of the conversation between an AI agent and a user based on their messages.
The title is used to identify the chat.

- Title must be very short, less than 80 characters

Below is the prior conversation summary (if any):

# Prior Summary and Context:
${sum?.trim() || "No previous summary available."}

# Conversation between AI and user

${conversation}

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
          content: systemInst(JSON.stringify(messages), summary),
        },
      ],
      temperature: 0.3,
    });
    const content = oaiResponse.choices.at(0)?.message.content;
    if (content) {
      return NextResponse.json({ title: content });
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
