import { UserType } from "@/types/user";
import { FC } from "react";

/* eslint-disable @next/next/no-img-element */
export const BannerPublic: FC<{ user: UserType }> = ({ user }) => {
  return (
    <div className="h-70 w-full relative overflow-hidden">
      {user.coverPhoto ? (
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-r from-primary to-primary/80" />
      )}
    </div>
  );
};
