"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useChatList } from "@/hooks/useChatList";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { useUser } from "@/stores/user.store";
import Link from "next/link";
import React, { useEffect } from "react";

const ChatList: React.FC = () => {
  const chatLit = useChatMessageStore((state) => state.chatLit);
  const user = useUser((s) => s.user);
  const { loadChatList } = useChatList();

  useEffect(() => {
    if (user.id && !chatLit.length) {
      loadChatList();
    }
  }, [user.id, chatLit.length]);

  return (
    <div className="mt-4">
      <h2 className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase tracking-wider">
        Chats
      </h2>
      <ul className="space-y-1 px-2">
        {chatLit.length ? (
          chatLit.map((chat) => (
            <Link
              key={chat.id}
              className="px-4 block py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              // Placeholder for navigation
              href={"/app/chat/" + chat.id}
            >
              <span className="font-medium truncate">{chat.name}</span>
            </Link>
          ))
        ) : (
          <div className="text-gray-400 px-4 py-2">No chats found.</div>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
