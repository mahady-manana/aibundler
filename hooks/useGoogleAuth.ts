import { handleGoogleAuth } from "@/services/auth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(tokenResponse);

        const redirectPath = await handleGoogleAuth(tokenResponse.access_token);
        router.push(redirectPath);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to authenticate with Google"
        );
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Failed to connect to Google");
      setIsLoading(false);
    },
  });

  return {
    login,
    isLoading,
    error,
  };
}
