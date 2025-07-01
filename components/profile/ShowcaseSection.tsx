/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AddShowcaseButton } from "./buttons/AddShowcaseButton";
import { EditShowcaseButton } from "./buttons/EditShowcaseButton";

interface Showcase {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

interface ShowcaseSectionProps {
  user: { id: string; showcases?: Showcase[] };
  card?: number;
  title?: boolean;
  editable?: boolean;
}

export default function ShowcaseSection({
  user,
  card = 3,
  title = true,
  editable,
}: ShowcaseSectionProps) {
  const showcaseList = user.showcases ?? [];

  return (
    <div className="mb-6">
      {title ? (
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold">Projects</div>
          {editable && <AddShowcaseButton profileId={user.id} />}
        </div>
      ) : null}
      <div className={cn("grid grid-cols-1 gap-4", "md:grid-cols-" + card)}>
        {showcaseList.length === 0 ? (
          <>
            {Array.from(Array(card)).map((index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white border-dashed"
              >
                <div className="h-36 w-full bg-muted flex items-center justify-center">
                  <p className="text-gray-300">Showcase</p>
                </div>
              </Card>
            ))}
          </>
        ) : (
          showcaseList.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white relative">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.title || "Project"}
                className="h-36 w-full object-cover"
              />
              <CardContent className="pt-4 space-y-2">
                <div>
                  <p className="font-semibold text-base">{item.title}</p>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="text-gray-500"
                      target="_blank"
                    >
                      {item.link.replace(/^https?:\/\//, "")}
                    </Link>
                  )}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full">
                  {editable && (
                    <EditShowcaseButton profileId={user.id} showcase={item} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {!title ? (
        <div className="flex justify-center border-t border-b my-2 mt-4 py-2 border-gray-400">
          {editable && <AddShowcaseButton profileId={user.id} />}
        </div>
      ) : null}
    </div>
  );
}
