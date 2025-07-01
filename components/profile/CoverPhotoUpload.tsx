"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/services/profile";
import { uploadToS3 } from "@/services/s3";
import { UserType } from "@/types/user";
import { ImagePlus } from "lucide-react";
import { useCallback } from "react";

interface CoverPhotoUploadProps {
  user: UserType;
  onUploadComplete?: () => void;
}

export function CoverPhotoUpload({
  user,
  onUploadComplete,
}: CoverPhotoUploadProps) {
  const { toast } = useToast();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const { url } = await uploadToS3(file);
        await updateProfile({ id: user.id, coverPhoto: url });
        toast({
          title: "Cover photo updated",
          description:
            "Your profile cover photo has been updated successfully.",
        });
        onUploadComplete?.();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update cover photo. Please try again.",
          variant: "destructive",
        });
      }
    },
    [user.id, onUploadComplete, toast]
  );

  return (
    <div className="absolute bottom-4 right-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="cover-upload"
      />
      <Button
        variant="secondary"
        size="sm"
        className="bg-white/90 hover:bg-white text-gray-700 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
        onClick={() => document.getElementById("cover-upload")?.click()}
      >
        <ImagePlus className="w-4 h-4 mr-2" />
        Change Cover
      </Button>
    </div>
  );
}
