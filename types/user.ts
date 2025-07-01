import { Chat, User } from "@prisma/client";

export interface UserType extends User {
  chat: Chat[];
}
