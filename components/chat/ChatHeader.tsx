"use client";
import { AI_MODELS, ModelName } from "@/azure/models";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChevronDown, MessagesSquare } from "lucide-react";

export default function ChatHeader() {
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const updateChatModel = useChatMessageStore((s) => s.updateChatModel);

  return (
    <div className="flex items-center dark:bg-background3 justify-between gap-3 px-6 py-2 shadow">
      <MessagesSquare className="h-5 w-5" />
      <h1 className="lg:text-xl text-md font-bold">Chat</h1>
      <div className="flex items-center justify-end px-6">
        <label htmlFor="model-select" className="mr-2 text-sm font-medium">
          Model:
        </label>
        <div className="relative">
          <select
            id="model-select"
            value={chatmodel || ModelName.gpt_4_1}
            onChange={(e) => updateChatModel(e.target.value)}
            className="text-sm bg-white text-gray-500 appearance-none border border-blue-200 rounded-lg px-4 py-2 pr-8 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {AI_MODELS.map((model) => (
              <option
                key={model.value}
                value={model.value}
                disabled={!model.available}
              >
                {model.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
