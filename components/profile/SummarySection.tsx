/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TextTruncate } from "@/components/ui/text-truncate";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user";
import { ProfileHeaderEditButton } from "./edits/ProfileHeaderEditButton";

interface ProfileHeaderProps {
  user: UserType & {
    contact?: {
      cv?: string;
      in?: string;
      website?: { link: string; name: string }[];
      email?: string;
      phone?: string;
      github?: string;
      x?: string;
    };
    experiences?: { company?: string }[];
  };
  editable?: boolean;
  noBanner?: boolean;
}

export function SummarySection({ user, editable }: ProfileHeaderProps) {
  return (
    <Card className="relative overflow-visible bg-white">
      <div className="">
        <CardContent className={cn("relative")}>
          {editable && <ProfileHeaderEditButton user={user} />}
          <div className="pt-6 max-w-2xl">
            <p className="font-bold pb-4">SUMMARY</p>
            <TextTruncate
              text={user.summary || ""}
              maxLength={300}
              buttonClassName="text-primary hover:text-primary/80"
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
