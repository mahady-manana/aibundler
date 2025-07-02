"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useChatList } from "@/hooks/useChatList";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { useUser } from "@/stores/user.store";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfirmDelete from "../confirmDelete";

const ChatList: React.FC = () => {
  const chatLit = useChatMessageStore((state) => state.chatLit);
  const [openDelete, setOpenDelete] = useState(false);
  const [seletectChatId, setseletectChatId] = useState<string>("");
  const params = useParams<{ chatid: string }>();
  const user = useUser((s) => s.user);
  const { push } = useRouter();
  const { loadChatList } = useChatList();
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (user.id && !chatLit.length) {
      loadChatList();
    }
  }, [user.id, chatLit.length]);

  const handleDelete = async () => {
    try {
      if (!seletectChatId) {
        setOpenDelete(false);
        return;
      }
      setDeleting(true);
      const response = await fetch("/api/user/chat", {
        method: "DELETE",
        body: JSON.stringify({ chatId: seletectChatId }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setOpenDelete(false);
        loadChatList();
        if (params?.chatid === seletectChatId) {
          push("/app/chat");
        }
      }
      setOpenDelete(false);
      setDeleting(false);
    } catch (error) {
      setOpenDelete(false);
      setDeleting(false);
    }
  };
  return (
    <div className="mt-4">
      <h2 className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase tracking-wider">
        Chats
      </h2>
      <ul className="space-y-1 px-2">
        {chatLit.length ? (
          chatLit.map((chat) => (
            <div
              key={chat.id}
              className="group flex  items-center cursor-pointer transition-colors"
            >
              <Link
                className="px-4 block py-1 rounded-lg w-[calc(100%-30px)] overflow-hidden"
                // Placeholder for navigation
                href={"/app/chat/" + chat.id}
              >
                <span className="font-medium truncate">
                  {chat.name || "New chat"}
                </span>
              </Link>
              <button
                className="w-[30px] flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                onClick={() => {
                  console.log(chat);

                  setseletectChatId(chat.id);
                  setOpenDelete(true);
                }}
              >
                <Trash className="text-red-500" size={15} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 px-4 py-2">No chats found.</div>
        )}
      </ul>
      <ConfirmDelete
        title="Delete chat"
        open={openDelete}
        onConfirm={handleDelete}
        onCancel={() => setOpenDelete(false)}
        loading={deleting}
      ></ConfirmDelete>
    </div>
  );
};

export default ChatList;
