import { useChatMessageStore } from "@/stores/chatmessages.store";

export const useChatList = () => {
  const updateChatList = useChatMessageStore((s) => s.updateChatList);

  const loadChatList = async () => {
    try {
      const response = await fetch("/api/user/chat-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.ok) {
        const data = await response.json();
        if (data?.length) {
          updateChatList(data);
        }
      }
    } catch (error) {
      return null;
    }
  };
  return { loadChatList };
};
