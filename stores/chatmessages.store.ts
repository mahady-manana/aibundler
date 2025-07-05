import { ChatMessage, ChatType } from "@/types/chat";

import { create } from "zustand";

interface ChatStoreType {
  messages: ChatMessage[];
  loading: boolean;
  summary: string;
  chatLit: ChatType[];
  chatmodel: string;
  updateChatModel: (model: string) => void;
  updateChatList: (c: ChatType[]) => void;
  updateSummary: (s: string) => void;
  setLoading: (b: boolean) => void;
  updateMessages: (messages: ChatMessage[]) => void;
}

export const useChatMessageStore = create<ChatStoreType>()((set) => ({
  messages: [],
  loading: false,
  summary: "",
  chatLit: [],
  chatmodel: "gpt-4.1",
  updateChatModel(model) {
    set({ chatmodel: model });
  },
  updateChatList(c) {
    set({ chatLit: c });
  },
  updateSummary(s) {
    set({ summary: s });
  },
  setLoading(b) {
    set({ loading: b });
  },
  updateMessages(messages) {
    set({ messages: messages });
  },
}));
