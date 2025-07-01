import { appApiendpoints } from "@/azure/config";
import { ModelName } from "@/azure/models";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import { ChatMessage } from "@/types/chat";
import { useState } from "react";
export const useChat = () => {
  const [chat, setChat] = useState("");
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const updatesChatStore = useChatMessageStore((s) => s.updateMessages);
  const chatmodel = useChatMessageStore((s) => s.chatmodel);
  const setLoading = useChatMessageStore((s) => s.setLoading);
  const updateSummary = useChatMessageStore((s) => s.updateSummary);
  const messages = useChatMessageStore((s) => s.messages);
  const summary = useChatMessageStore((s) => s.summary);
  const streamedChat = async (input: string, chatId: string) => {
    // try {
    //   setLoading(true);
    //   const response = await fetch(getChatEndpoints(chatmodel), {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       messages: [
    //         ...messages.filter((m) => !m.summarized),
    //         { role: "user", content: input, type: "text" },
    //       ],
    //       summary,
    //     }),
    //   });
    //   let keepChat = "";
    //   const reader = response?.body?.getReader();
    //   const decoder = new TextDecoder("utf-8");
    //   let done = false;
    //   let f = "";
    //   while (!done) {
    //     const { value, done: readerDone } = (await reader?.read()) || {};
    //     done = readerDone || false;
    //     const chunk = decoder.decode(value, { stream: true });
    //     if (chunk && typeof chunk === "string") {
    //       const ch = chunk.replaceAll('"', "");
    //       f = f + ch;
    //       keepChat = keepChat + ch;
    //       setChat((prev) => prev + ch);
    //     }
    //   }

    //   if (done && f?.length) {
    //     const allmessages: ChatMessage[] = [
    //       ...messages,
    //       { role: "user", content: input, type: "text" },
    //       { role: "assistant", content: keepChat, type: "text" },
    //     ];
    //     updatesChatStore(allmessages);
    //     if (allmessages.filter((m) => !m.summarized).length > 4) {
    //       summarizeGpt(allmessages, chatId);
    //     } else {
    //       updateCurrentChat({
    //         summary: summary,
    //         id: chatId,
    //         messages: [
    //           ...allmessages.map((m) => {
    //             delete m.summarized;
    //             return m;
    //           }),
    //         ],
    //       });
    //     }
    //     setChat("");
    //     setLoading(false);
    //   }
    //   setLoading(false);
    //   return;
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
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
          const errorData = await response.json();
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

        if (allMessages.filter((m) => !m.summarized).length > 4) {
          summarizeGpt(allMessages, chatId);
        } else {
          updateCurrentChat({
            summary,
            id: chatId,
            messages: allMessages.map((m) => ({ ...m, summarized: undefined })),
          });
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
      updatesChatStore(messagesInput.map((m) => ({ ...m, summarized: true })));
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
  }: {
    messages: ChatMessage[];
    id: string;
    summary: string;
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
