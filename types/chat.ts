import { Chat } from "@prisma/client";
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  type?: string;
  summarized?: boolean;
}
export interface ChatMessageInput {
  role: "user" | "assistant" | "system";
  content: string;
  type?: string;
}

export type ChatType = Chat;
