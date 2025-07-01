"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";

interface TextTruncateProps {
  text: string;
  maxLength?: number;
  className?: string;
  buttonClassName?: string;
}

export function TextTruncate({
  text,
  maxLength = 200,
  className,
  buttonClassName,
}: TextTruncateProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength) + "...";

  return (
    <div className={cn("", className)}>
      <div className="text-sm text-foreground whitespace-pre-wrap">
        {displayText}
      </div>
      {shouldTruncate && (
        <Button
          variant="link"
          className={cn("h-auto p-0 text-sm text-primary", buttonClassName)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          ...{isExpanded ? "show less" : "show more"}
        </Button>
      )}
    </div>
  );
}
