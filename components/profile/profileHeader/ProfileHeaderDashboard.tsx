/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/user";
import Link from "next/link";

interface ProfileHeaderProps {
  user: UserType;
}

export default function ProfileHeaderDashboard({ user }: ProfileHeaderProps) {
  const formatAddress = (
    address:
      | {
          street: string;
          city: string;
          state: string;
          country: string;
        }
      | null
      | undefined
  ) => {
    if (!address) return "";
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
  };

  return (
    <div className="relative overflow-visible mb-6">
      <div className="">
        <Avatar className="h-30 w-30 border-4 border-white bg-white shadow-lg">
          <AvatarImage
            src={user.image || "/images/pela.png"}
            alt={user.name || ""}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{user.name?.[0] || "ME"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="pb-4 relative py-6">
        <div className="space-y-3">
          <div>
            <h1 className="text-lg font-bold leading-tight">{user.name}</h1>
            <div className="text-primary">{user.title}</div>
            <div className="text-xs text-muted mt-1">
              {formatAddress(user.address)}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {user.status === "open-to-work" && (
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                Open to work
              </span>
            )}
          </div>
          <div>
            <Link
              href="/app/me"
              className="w-full bg-primary block p-2 text-white text-center rounded-md font-bold"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
