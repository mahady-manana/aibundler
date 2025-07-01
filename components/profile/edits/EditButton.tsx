"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  size?: boolean;
}

export function EditButton({
  onClick,
  size,
  className,
  children,
}: EditButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size ? "icon" : undefined}
      onClick={onClick}
      className={className}
    >
      <Pencil className="h-6 w-6" />
      {children}
    </Button>
  );
}
