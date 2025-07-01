/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChatMessage } from "@/types/chat";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighterPrisma } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import ChatErrorBounder from "./ChatErrorBoundary";

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

interface ChatItemProps {
  message: ChatMessage;
}
const SyntaxHighlighter = SyntaxHighlighterPrisma as any;
export default function ChatItem({ message }: ChatItemProps) {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied", { position: "bottom-center" });
  };
  return (
    <ChatErrorBounder>
      {message.role === "user" ? (
        <div className="bg-background3 max-w-2/3 ml-auto p-4 rounded-md">
          <p>{message.content}</p>
        </div>
      ) : (
        <div className="markdown-content prose py-4 space-y-4">
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
                        <button
                          onClick={() => handleCopy(String(children))}
                          className="flex items-center gap-1 cursor-pointer absolute z-50 text-gray-300 text-xs top-1 right-2 p-1 rounded-md "
                        >
                          <Copy className="w-4 h-4"></Copy> <span>copy</span>
                        </button>
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
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
    </ChatErrorBounder>
  );
}
