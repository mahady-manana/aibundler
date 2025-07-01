"use client";
import { useNewChat } from "@/hooks/useNewChat";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChevronDown, MessagesSquare, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

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
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedModel, setSelectedModel] = useState(OPENAI_MODELS[0].value);
  const messages = useChatMessageStore((s) => s.messages);
  const loading = useChatMessageStore((s) => s.loading);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { createChat } = useNewChat();

  const handleCreate = async () => {
    await createChat();
  };

  return (
    <div className="flex flex-col h-full rounded-xl pb-8 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-300">
        <MessagesSquare className="h-7 w-7 text-blue-500" />
        <h1 className="lg:text-xl text-md font-bold text-blue-700">Chat</h1>
        <div className="flex items-center justify-end px-6 py-2">
          <label
            htmlFor="model-select"
            className="mr-2 text-sm font-medium text-blue-700"
          >
            Model:
          </label>
          <div className="relative">
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-sm appearance-none border border-blue-200 rounded-lg px-4 py-2 pr-8 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {OPENAI_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
          </div>
        </div>
      </div>

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
          <div className="flex items-center justify-center py-2">
            <label
              htmlFor="model-select"
              className="mr-2 text-sm font-medium text-blue-700"
            >
              Model:
            </label>
            <div className="relative">
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="text-sm appearance-none border border-blue-200 rounded-lg px-4 py-2 pr-8  text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {OPENAI_MODELS.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
            </div>
          </div>
          <button
            className="font-bold text-lg p-4 border rounded-full px-10 bg-secondary border-golden"
            onClick={handleCreate}
          >
            Start New Chat
          </button>
        </div>
      </div>
    </div>
  );
}
