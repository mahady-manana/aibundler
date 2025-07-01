"use client";

import { UploadButton } from "@/components/ui/upload-button";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/services/profile";
import { uploadToS3 } from "@/services/s3";
import { UserType } from "@/types/user";
import { Camera } from "lucide-react";

interface ProfilePhotoUploadProps {
  user: UserType;
  onUploadComplete?: () => void;
}

export function ProfilePhotoUpload({
  user,
  onUploadComplete,
}: ProfilePhotoUploadProps) {
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    try {
      const { url } = await uploadToS3(file);
      await updateProfile({ id: user.id, image: url });
      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been updated successfully.",
      });
      onUploadComplete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
      <UploadButton
        onUpload={handleUpload}
        accept="image/*"
        icon={Camera}
        buttonText=""
        variant="secondary"
        className="bg-white/90 hover:bg-white text-gray-700"
      />
    </div>
  );
}
