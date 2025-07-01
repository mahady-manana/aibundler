"use client";
import { AI_MODELS } from "@/azure/models";
import ChatHeader from "@/components/chat/ChatHeader";
import { useChat } from "@/hooks/useChat";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  LoaderCircle,
  Send,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighterPrisma } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { LoadChat } from "./[chatid]/LoadChat";
import ChatErrorBounder from "./ChatErrorBoundary";
import ChatItem from "./ChatItems";

const customPreStyle = {
  boxShadow: `0px 1px 2px 1px var(--color-background)`, // Add a border
  borderRadius: "10px",
  padding: "1.5em",
  marginBlock: 35,
};

const OPENAI_MODELS = [
  { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
  { label: "GPT-4.1", value: "gpt-4.1" },
  { label: "GPT-4o", value: "gpt-4o" },
];

interface NewChatProps {
  chatId: string;
}
const SyntaxHighlighter = SyntaxHighlighterPrisma as any;
export default function ChatPage({ chatId }: NewChatProps) {
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const updateChatModel = useChatMessageStore((s) => s.updateChatModel);
  const messages = useChatMessageStore((s) => s.messages);
  const loading = useChatMessageStore((s) => s.loading);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const [noChat, setNoChat] = useState(false);
  const { streamedChat, chat } = useChat();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue?.trim()) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setInput(inputValue);
    formRef.current?.reset();
    await streamedChat(inputValue, chatId);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied", { position: "bottom-center" });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const inputValue = inputRef.current?.value;
      if (!inputValue?.trim()) return;
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setInput(inputValue);
      formRef.current?.reset();

      streamedChat(inputValue, chatId);
    }
  };

  const handleScrollDown = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const handleScrollUp = () => {
    messagesStartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!Boolean(chat) && !messages.length) {
      setNoChat(true);
    }
  }, [Boolean(chat), messages.length]);

  return (
    <div className="flex flex-col h-full pb-8 shadow-lg overflow-hidden dark:bg-background2 bg-white">
      {/* Header */}
      <ChatHeader></ChatHeader>
      {/* Model Selector */}

      {/* Messages */}
      <div className="px-4 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto flex-1  px-4 py-6 space-y-4 relative">
          {noChat ? (
            <div>
              <div className="flex items-center py-4">
                <div className="flex items-end pr-8">
                  <Sparkles className="w-6 h-6 text-blue-700" />
                </div>
                <p className="font-bold lg:text-3xl text-lg">
                  How I can help you today?
                </p>
              </div>
              <p>AI can and will make mistakes. Check important info.</p>
              <div className="flex items-center  py-4">
                <label
                  htmlFor="model-select"
                  className="mr-2 text-sm font-medium text-blue-700"
                >
                  Model:
                </label>
                <div className="relative">
                  <select
                    id="model-select"
                    value={chatmodel || "gpt-4.1"}
                    onChange={(e) => updateChatModel(e.target.value)}
                    className="text-sm appearance-none border border-blue-200 rounded-lg px-4 py-2 pr-8  text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
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
          ) : null}
          <LoadChat chatId={chatId}></LoadChat>
          <div
            className={`px-4 py-2 space-y-6 text-base"
              `}
          >
            <div ref={messagesStartRef} />
            {messages.length
              ? messages.map((message, index) => {
                  return <ChatItem key={index} message={message}></ChatItem>;
                })
              : null}

            {chat ? (
              <>
                <div className="bg-background3 max-w-2/3 ml-auto p-4 rounded-md">
                  <p>{input}</p>
                </div>

                <div className="markdown-content prose py-4 space-y-4">
                  <ChatErrorBounder>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");

                          return (
                            <span className="relative">
                              {match ? (
                                <>
                                  <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    customStyle={customPreStyle}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                  <span
                                    onClick={() => handleCopy(String(children))}
                                    className="w-6 h-6 cursor-pointer absolute z-50 top-4 right-4 bg-white text-neutral-700 p-1 rounded-md "
                                  >
                                    <Copy className="w-4 h-4"></Copy>{" "}
                                  </span>
                                </>
                              ) : (
                                <code {...rest} className={className}>
                                  {children}
                                </code>
                              )}
                            </span>
                          );
                        },
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {chat}
                    </ReactMarkdown>
                  </ChatErrorBounder>
                </div>
              </>
            ) : null}
            {messages.length ? <div className="h-[40vh]" /> : null}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {/* Input */}
      <form
        onSubmit={handleSend}
        className="items-center relative gap-2 max-w-3xl mx-auto w-full px-2relative "
        ref={formRef}
      >
        {loading ? (
          <div className="flex gap-2 items-center">
            <LoaderCircle size={15} className="animate-spin" />
            <span className="font-bold text-gray-400">processing...</span>
          </div>
        ) : null}
        {messages.length ? (
          <div className="absolute -top-15 -right-10 flex flex-col gap-1">
            <button
              onClick={handleScrollUp}
              className="w-6 h-6  cursor-pointer flex items-center justify-center  bg-blue-200 rounded-full y-50 right-4"
            >
              <ArrowUp size={15} className="text-blue-700"></ArrowUp>
            </button>
            <button
              onClick={handleScrollDown}
              className="w-6 h-6 cursor-pointer  flex items-center justify-center bg-blue-200 rounded-full y-50 right-4"
            >
              <ArrowDown size={15} className="text-blue-700" />
            </button>
          </div>
        ) : null}
        <input
          id="chat-input"
          className="w-full flex-1 p-4 px-8 rounded-xl bg-background3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="What's in your mind..."
          onKeyDown={handleKeyDown}
          disabled={loading}
          ref={inputRef}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-12 h-8 absolute right-4 bottom-2 text-blue-500 bg-blue-50 flex items-center justify-center rounded-full font-semibold transition"
        >
          <Send className="w-5 h-5 text-blue-500"></Send>
        </button>
      </form>
    </div>
  );
}
