"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import { ChooseModel } from "@/components/elements/ChooseModel";
import { useNewChat } from "@/hooks/useNewChat";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChevronDown, Sparkles } from "lucide-react";

const customPreStyle = {
  border: "1px solid #ccc", // Add a border
  borderRadius: "5px",
  padding: "1.5em",
};

const OPENAI_MODELS = [
  { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
  { label: "GPT-4", value: "gpt-4" },
  { label: "GPT-4o", value: "gpt-4o" },
];

export default function NewChatPage() {
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const { createChat } = useNewChat();

  const handleCreate = async () => {
    await createChat();
  };

  return (
    <div className="flex flex-col h-full rounded-xl pb-8 shadow-lg overflow-hidden">
      {/* Header */}
      <ChatHeader></ChatHeader>
      <div className="px-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto text-center flex-1  px-4 py-6 space-y-4">
          <div>
            <div className="flex items-center justify-center py-4">
              <div className="flex items-end pr-8">
                <Sparkles className="w-6 h-6 text-blue-700" />
              </div>
              <p className="font-bold lg:text-3xl text-lg">
                How I can help you today?
              </p>
            </div>
            <p>AI can and will make mistakes. Check important info.</p>
          </div>
          <div className="inline-flex items-center  py-4">
            <p className="mr-2 text-sm font-medium text-blue-700">Model:</p>
            <div className="relative">
              <div className="relative">
                <ChooseModel>
                  <button className="flex items-center gap-4 px-4  h-9  p-2 rounded-md border border-primary font-semibold">
                    <span>{chatmodel || "GPT 4.1"}</span>
                    <ChevronDown className="" size={15} />
                  </button>
                </ChooseModel>
              </div>
            </div>
          </div>
          <div>
            <button
              className="font-bold cursor-pointer text-lg p-4 rounded-full px-10 bg-primary text-white shadow-xl"
              onClick={handleCreate}
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
