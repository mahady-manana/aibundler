"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useCallback } from "react";

interface UploadButtonProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  icon?: LucideIcon;
  buttonText?: string;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function UploadButton({
  onUpload,
  accept = "image/*",
  icon: Icon,
  buttonText = "Upload",
  className,
  variant = "secondary",
  size = "sm",
}: UploadButtonProps) {
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      await onUpload(file);
      // Reset the input so the same file can be selected again
      e.target.value = "";
    },
    [onUpload]
  );

  return (
    <>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="upload-input"
      />
      <Button
        variant={variant}
        size={size}
        className={cn(
          "bg-white/90 hover:bg-white text-gray-700 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm",
          className
        )}
        onClick={() => document.getElementById("upload-input")?.click()}
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {buttonText}
      </Button>
    </>
  );
}
