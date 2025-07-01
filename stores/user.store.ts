import { UserType } from "@/types/user";

import { create } from "zustand";

interface UserStoreType {
  user: UserType;
  isLoading: boolean;
  updateUser: (user: UserType) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUser = create<UserStoreType>()((set) => ({
  user: {} as UserType,
  isLoading: true,

  updateUser(user) {
    set({ user });
  },

  setLoading(isLoading) {
    set({ isLoading });
  },
}));
