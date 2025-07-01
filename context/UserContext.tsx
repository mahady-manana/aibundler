/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getUser } from "@/services/auth/getUser";
import { useUser } from "@/stores/user.store";
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  loading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const updateUser = useUser((s) => s.updateUser);
  const user = useUser((s) => s.user);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      if (!user.id && loading) {
        const userData = await getUser();
        if (userData?.id) {
          updateUser(userData);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  }, [user.id, loading]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider value={{ loading }}>{children}</UserContext.Provider>
  );
};
