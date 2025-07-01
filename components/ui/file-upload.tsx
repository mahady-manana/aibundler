"use client";

import { isValidFileSize } from "@/lib/file";
import { cn } from "@/lib/utils";
import { uploadToS3 } from "@/services/s3";
import { Loader2, Upload } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
  accept?: string[];
  maxSize?: number;
  className?: string;
  buttonText?: ReactNode;
  showPreview?: boolean;
  currentURL?: string;
}

export function FileUpload({
  onUploadComplete,
  onError,
  accept = ["image/*"],
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  buttonText = "Upload File",
  showPreview = true,
  currentURL,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        // Validate file type

        // Validate file size
        if (!isValidFileSize(file, maxSize)) {
          throw new Error(
            `File size must be less than ${maxSize / 1024 / 1024}MB`
          );
        }

        setIsUploading(true);

        // Create preview if it's an image
        if (file.type.startsWith("image/") && showPreview) {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        }

        // Upload to S3
        const { url } = await uploadToS3(file);
        onUploadComplete(url);
      } catch (error) {
        console.error("Upload error:", error);
        onError?.(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [accept, maxSize, onUploadComplete, onError, showPreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the file here</p>
            ) : (
              <p>
                Drag & drop a file here, or{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  disabled={isUploading}
                >
                  {buttonText}
                </Button>
              </p>
            )}
          </div>
        </div>
      </div>

      {showPreview && (preview || currentURL) && (
        <div className="mt-4">
          <img
            src={preview || currentURL}
            alt="Preview"
            className="max-h-40 rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}
