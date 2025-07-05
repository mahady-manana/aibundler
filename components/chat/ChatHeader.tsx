"use client";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChevronDown, MessagesSquare } from "lucide-react";
import { ChooseModel } from "../elements/ChooseModel";

export default function ChatHeader() {
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  return (
    <div className="flex items-center dark:bg-background3 justify-between gap-3 px-6 py-2 shadow">
      <h1 className="lg:text-xl flex items-center gap-4 text-md font-bold">
        <MessagesSquare className="h-5 w-5" /> <span>Chat</span>
      </h1>
      <div className="flex items-center justify-end px-6">
        <p className="mr-2 text-sm font-medium">Model:</p>
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
  );
}
