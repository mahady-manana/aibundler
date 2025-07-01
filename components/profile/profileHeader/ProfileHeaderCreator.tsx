"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextTruncate } from "@/components/ui/text-truncate";
import { UserType } from "@/types/user";
import { Globe, Linkedin, Share2 } from "lucide-react";
import { ContactButton } from "../ContactButton";
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
}

export default function ProfileHeaderCreator({ user }: ProfileHeaderProps) {
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
    <Card className="relative overflow-visible mb-6 bg-white">
      <div className="px-4 pt-6">
        <CardContent className="relative">
          <div className="relative w-32 pb-4">
            <Avatar className="h-32 w-32 border-4 border-white bg-white shadow-lg">
              <AvatarImage
                src={user.image || "/images/pela.png"}
                alt={user.name || ""}
              />
              <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <ProfilePhotoUpload user={user}></ProfilePhotoUpload>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
              <div className="font-bold text-primary">{user.title}</div>
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
              <ProfileHeaderEditButton user={user} />
            </div>
          </div>
          <div className="mt-4 max-w-2xl">
            <TextTruncate
              text={user.summary || ""}
              maxLength={200}
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
