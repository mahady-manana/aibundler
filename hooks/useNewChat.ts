import { useUser } from "@/stores/user.store";
import { useRouter } from "next/navigation";

export const useNewChat = () => {
  const user = useUser((s) => s.user);

  const { push } = useRouter();
  const createChat = async (redirect = true) => {
    try {
      const response = await fetch("/api/user/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (!redirect) {
          return data;
        }
        if (data && data.id) {
          push("/app/chat/" + data.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { createChat };
};
