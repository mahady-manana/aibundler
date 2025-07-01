"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useChat } from "@/hooks/useChat";
import { LoaderCircle } from "lucide-react";
import { FC, useEffect } from "react";

interface LoadChatProps {
  chatId: string;
}
export const LoadChat: FC<LoadChatProps> = ({ chatId }) => {
  const { loadCurrentChat, loadingChat } = useChat();

  useEffect(() => {
    if (chatId) {
      loadCurrentChat(chatId);
    }
  }, [chatId]);

  if (!loadingChat) {
    return null;
  }
  return (
    <div className="py-4">
      <div className="flex items-center gap-4 text-gray-400 font-bod">
        <LoaderCircle className=" w-6 h-6 animate-spin"></LoaderCircle>
        <span>Load conversation...</span>
      </div>
    </div>
  );
};
