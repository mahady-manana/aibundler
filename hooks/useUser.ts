import { getUser } from "@/services/auth/getUser";
import { useUser } from "@/stores/user.store";

export const useUserInfo = () => {
  const updateUser = useUser((s) => s.updateUser);

  const loadUser = async () => {
    try {
      const userData = await getUser();
      if (userData?.id) {
        updateUser(userData);
      }
    } catch (error) {
      return null;
    }
  };

  return { loadUser };
};
