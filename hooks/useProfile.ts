import { getUser } from "@/services/auth/getUser";
import { createShortLink } from "@/services/links";
import {
  updateContact,
  updateEducation,
  updateExperience,
  updateProfile,
  updateShowcase,
  updateUsername,
} from "@/services/profile";
import { updateSkills } from "@/services/skills";
import { useUser } from "@/stores/user.store";
import { UserType } from "@/types/user";
import { toast } from "sonner";

interface ProfileOperation {
  type:
    | "education"
    | "experience"
    | "skills"
    | "showcase"
    | "basic"
    | "contact"
    | "username"
    | "shortLink";
  action: "create" | "update" | "delete";
  data: any;
}

type ReturnActionType = {
  error?: string;
  success?: boolean;
  user?: any;
  contact?: any;
};
interface ReturnHookType extends Partial<UserType> {
  error?: string;
}
export function useProfile() {
  const { user, updateUser } = useUser();

  const handleProfileOperation = async (
    operation: ProfileOperation
  ): Promise<ReturnHookType> => {
    try {
      const { type, action, data } = operation;
      let result: ReturnActionType | null = null;

      switch (type) {
        case "basic":
          result = await updateProfile(data);
          break;

        case "contact":
          result = await updateContact(user.id, data);
          break;

        case "education":
          result = await updateEducation(user.id, data);
          break;

        case "experience":
          result = await updateExperience(user.id, data);
          break;

        case "skills":
          result = await updateSkills({ userId: user.id, skills: data });
          break;

        case "showcase":
          result = await updateShowcase(user.id, data);
          break;

        case "username":
          if (data?.username) {
            result = await updateUsername(user.id, data.username);
          }
          break;

        case "shortLink":
          result = await createShortLink(user.id);
          break;
      }

      if (result?.error) {
        return { error: result.error };
      }
      if (!result?.success) {
        throw new Error(`Operation failed with error`);
      }

      // Refresh the user data after successful operation
      const response = await getUser();
      if (response?.id) {
        updateUser(response);

        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} ${
            action === "create"
              ? "added"
              : action === "update"
              ? "updated"
              : "deleted"
          } successfully`
        );

        return response;
      }
      return { error: "Something went wrong" };
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
      throw error;
    }
  };

  return {
    handleProfileOperation,
    user,
  };
}
