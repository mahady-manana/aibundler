import { appApiendpoints } from "@/azure/config";
import { ModelName } from "@/azure/models";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChatMessage } from "@/types/chat";
import { useState } from "react";
import { useChatList } from "./useChatList";
export const useChat = () => {
  const [chat, setChat] = useState("");
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const updatesChatStore = useChatMessageStore((s) => s.updateMessages);
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const setLoading = useChatMessageStore((s) => s.setLoading);
  const updateSummary = useChatMessageStore((s) => s.updateSummary);
  const messages = useChatMessageStore((s) => s.messages);
  const summary = useChatMessageStore((s) => s.summary);
  const chatList = useChatMessageStore((s) => s.chatLit);
  const { loadChatList } = useChatList();
  const streamedChat = async (input: string, chatId: string) => {
    try {
      setLoading(true);
      const abortController = new AbortController();

      const response = await fetch(getChatEndpoints(chatmodel), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.filter((m) => !m.summarized),
            { role: "user", content: input, type: "text" },
          ],
          summary,
          model: chatmodel,
        }),
        signal: abortController.signal,
      });

      // Handle non-200 responses
      if (!response.ok) {
        try {
          throw new Error(`[Service interruption]`);
        } catch (e) {
          throw new Error(`[Service interruption]`);
        }
      }

      // Handle missing response body
      if (!response.body) {
        throw new Error("Empty response stream from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantResponse = "";
      let isStreamError = false;

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Handle server-side stream errors
        if (chunk.includes("[ERROR:")) {
          isStreamError = true;
          setChat((prev) => prev + "\n\n[Service interruption]");
          assistantResponse += "\n\n[Service interruption]";
          break;
        }

        // Update UI incrementally
        assistantResponse += chunk;
        setChat(assistantResponse);
      }

      // Update chat store only if stream completed successfully
      if (!isStreamError && assistantResponse) {
        const allMessages: ChatMessage[] = [
          ...messages,
          { role: "user", content: input, type: "text" },
          { role: "assistant", content: assistantResponse, type: "text" },
        ];

        updatesChatStore(allMessages);

        if (allMessages.filter((m) => !m.summarized).length > 10) {
          summarizeGpt(allMessages, chatId);
        } else {
          const currentName = chatList.find((m) => m.id === chatId)?.name;
          if (!currentName && allMessages.length > 4) {
            await createChatName(allMessages, chatId, summary);

            return;
          } else {
            updateCurrentChat({
              summary,
              id: chatId,
              messages: allMessages.map((m) => ({
                ...m,
                summarized: undefined,
              })),
            });
          }
        }
      }

      setChat("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Request failed";
      setChat((prev) => prev + `\n\n[Error: ${errorMessage}]`);
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const summarizeGpt = async (messagesInput: ChatMessage[], id: string) => {
    const response = await fetch("/api/azure/chat/summarize-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...messagesInput.map((m) => {
            delete m.summarized;
            return m;
          }),
        ],
        summary: summary,
      }),
    });

    const json = await response.json();
    if (json?.summary) {
      updateSummary(json.summary);
      updateCurrentChat({
        summary: json.summary,
        messages: [
          ...messagesInput.map((m) => {
            delete m.summarized;
            return m;
          }),
        ],
        id: id,
      });
    }
  };

  const createChatName = async (
    messagesInput: ChatMessage[],
    id: string,
    summary?: string
  ) => {
    const response = await fetch("/api/azure/chat/create-chat-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...messagesInput.map((m) => {
            delete m.summarized;
            return m;
          }),
        ],
        id: id,
        summary: summary,
      }),
    });

    const json = await response.json();
    if (json?.title) {
      await fetch("/api/user/chat/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messagesInput.map((m) => {
              delete m.summarized;
              return m;
            }),
          ],
          chatId: id,
          summary: summary,
          name: json.title,
        }),
      });
      loadChatList();
    }
  };

  const loadCurrentChat = async (chatId: string) => {
    try {
      setLoadingChat(true);
      const response = await fetch("/api/user/chat?chatId=" + chatId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataJson = await response.json();
      setLoadingChat(false);
      if (dataJson?.messages) {
        updatesChatStore(dataJson?.messages);
      }
    } catch (error) {
      setLoadingChat(false);
      return null;
    }
  };

  const updateCurrentChat = async ({
    messages,
    id,
    summary,
    name,
  }: {
    messages: ChatMessage[];
    id: string;
    summary: string;
    name?: string;
  }) => {
    setLoadingChat(true);
    const response = await fetch("/api/user/chat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
        summary: summary,
        chatId: id,
        name,
      }),
    });

    await response.json();
    return { ok: true };
  };
  return {
    chat,
    loadingChat,
    streamedChat,
    loadCurrentChat,
  };
};

const getChatEndpoints = (model: string) => {
  switch (model) {
    case ModelName.DeepSeek_R1_0528:
      return appApiendpoints.deepseek_r1_0528;

    case ModelName.o1:
      return appApiendpoints.azure_cross_model_o_serie;
    case ModelName.gpt_o4_mini:
      return appApiendpoints.azure_cross_model_o_serie;
    case ModelName.gpt_4o:
      return appApiendpoints.azure_cross_model_o_serie;

    default:
      return appApiendpoints.azure_cross_model;
  }
};
