import { AI_MODELS } from "@/azure/models";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { Component, Send } from "lucide-react";
import { FC, FormEvent, useMemo, useRef } from "react";
import { ChooseModel } from "../elements/ChooseModel";

interface ChatPromptInputProps {
  onSubmit?: (value: string) => void;
  loading?: boolean;
}
export const ChatPromptInput: FC<ChatPromptInputProps> = ({
  loading,
  onSubmit,
}) => {
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const refInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const modelName = useMemo(() => {
    return AI_MODELS.find((m) => m.value === chatmodel)?.name || "GPT 4.1";
  }, [chatmodel]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = refInput.current?.value;
    if (!text) {
      return;
    }
    onSubmit?.(text);
    formRef.current?.reset();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const inputValue = refInput.current?.value;
      if (!inputValue?.trim()) return;
      onSubmit?.(inputValue);
      formRef.current?.reset();
    }
  };
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background3 p-2">
        <form className="relative" ref={formRef} onSubmit={handleSubmit}>
          <input
            id="chat-input"
            className="w-full flex-1 p-4 rounded-xl focus:outline-none"
            placeholder="What's in your mind..."
            ref={refInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-12 h-8 absolute right-4 bottom-0 text-blue-500 bg-background2 flex items-center justify-center rounded-full font-semibold transition"
          >
            <Send className="w-5 h-5 text-blue-500"></Send>
          </button>
        </form>
        <div className="flex items-center pt-2">
          <ChooseModel>
            <button className="flex items-center gap-2 opacity-50 text-sm font-semibold px-4 rounded-md">
              <Component size={15}></Component>
              <span>{modelName}</span>
            </button>
          </ChooseModel>
        </div>
      </div>
    </div>
  );
};
