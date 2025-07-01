/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getUser } from "@/services/auth/getUser";
import { handleGoogleAuth } from "@/services/auth/google";
import { useUser } from "@/stores/user.store";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AutoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      if (!credentialResponse.credential) {
        toast.error("No credential received from Google");
        return;
      }

      try {
        setIsLoading(true);
        const redirectPath = await handleGoogleAuth(
          credentialResponse.credential,
          true
        );
        router.push(redirectPath);
      } catch (error) {
        toast.error("Failed to sign in with Google");
        console.log("One tap login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Failed to connect to Google");
      setIsLoading(false);
    },
    auto_select: true,
    cancel_on_tap_outside: false,
  });

  return null;
};

export const GoogleTapIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const user = useUser((state) => state.user);
  const updateUser = useUser((state) => state.updateUser);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // If we already have a user in the store, don't show one-tap
        if (user.id) {
          setShouldShow(false);
          return;
        }

        // Check if user exists in the session
        const userData = await getUser();
        if (userData?.id) {
          updateUser(userData);
          setShouldShow(false);
        } else {
          setShouldShow(true);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setShouldShow(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [user.id]);

  if (isLoading || !shouldShow) {
    return null;
  }

  // return <AutoLogin />;
  return <></>;
};
