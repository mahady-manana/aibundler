/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextTruncate } from "@/components/ui/text-truncate";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user";
import { Globe, Linkedin, Share2 } from "lucide-react";
import { ContactButton } from "../ContactButton";
import { CoverPhotoUpload } from "../CoverPhotoUpload";
import { ProfileHeaderEditButton } from "../edits/ProfileHeaderEditButton";
import { ProfilePhotoUpload } from "../edits/ProfilePhotoUpload";

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

export default function ProfileHeaderNavLeft({
  user,
  editable,
  noBanner,
}: ProfileHeaderProps) {
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
    <Card className="relative overflow-visible mb-6 bg-white border-none !shadow-none">
      <div className="">
        {!noBanner ? (
          <div className="h-30 w-full relative rounded-t-lg overflow-hidden">
            {user.coverPhoto ? (
              <img
                src={user.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-primary to-primary/80" />
            )}
            {editable ? (
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <CoverPhotoUpload user={user} />
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={cn(noBanner ? "px-6" : "absolute left-8 top-10")}>
          <Avatar className="h-32 w-32 border-4 border-white bg-white shadow-lg">
            <AvatarImage
              src={user.image || "/images/pela.png"}
              alt={user.name || ""}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          {editable ? (
            <ProfilePhotoUpload user={user}></ProfilePhotoUpload>
          ) : null}
        </div>
        <CardContent className={cn("relative", !noBanner ? "pt-20" : "pt-8")}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-xl font-bold leading-tight">{user.name}</h1>
              <div className="text-primary font-medium">{user.title}</div>
              <div className="text-sm text-muted-foreground mt-1">
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
              {editable && <ProfileHeaderEditButton user={user} />}
            </div>
          </div>
          <div className="mt-4 pb-8 max-w-2xl">
            <TextTruncate
              text={user.summary || ""}
              maxLength={180}
              buttonClassName="text-primary hover:text-primary/80"
            />
          </div>
          <div className="flex flex-col justify-start flex-wrap gap-4">
            {user.contact?.cv && (
              <Button
                variant="link"
                className="p-0 text-white bg-primary"
                asChild
              >
                <a
                  href={user.contact.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume/CV
                </a>
              </Button>
            )}
            {user.contact?.in && (
              <Button
                variant="link"
                className="p-0 text-white bg-primary"
                asChild
              >
                <a
                  href={user.contact.in}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="inline w-4 h-4 mr-1" /> LinkedIn
                </a>
              </Button>
            )}
            {user.contact?.website?.map((site, index) => (
              <Button
                key={index}
                variant="link"
                className="p-0 text-white bg-primary"
                asChild
              >
                <a href={site.link} target="_blank" rel="noopener noreferrer">
                  <Globe className="inline w-4 h-4 mr-1" /> {site.name}
                </a>
              </Button>
            ))}
            {user.contact?.github && (
              <Button
                variant="link"
                className="p-0 text-white bg-primary"
                asChild
              >
                <a
                  href={user.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="inline w-4 h-4 mr-1" /> GitHub
                </a>
              </Button>
            )}
            {user.contact && <ContactButton contact={user.contact} />}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
