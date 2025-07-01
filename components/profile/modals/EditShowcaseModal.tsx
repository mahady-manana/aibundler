"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { toast } from "sonner";

interface Showcase {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

interface EditShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  initialShowcase?: Showcase;
}

export function EditShowcaseModal({
  isOpen,
  onClose,
  profileId,
  initialShowcase,
}: EditShowcaseModalProps) {
  const [showcase, setShowcase] = useState<Showcase>(
    initialShowcase || {
      title: "",
      description: "",
      image: "",
      link: "",
    }
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { handleProfileOperation } = useProfile();
  const handleSave = async () => {
    try {
      setIsUpdating(true);

      // Validate required fields
      if (!showcase.title || !showcase.description) {
        toast.error("Please fill in all required fields");
        return;
      }

      await handleProfileOperation({
        action: "update",
        data: showcase,
        type: "showcase",
      });
      toast.success(
        initialShowcase
          ? "Showcase updated successfully"
          : "Showcase added successfully"
      );
      onClose();
    } catch (error) {
      console.error("Error saving showcase:", error);
      toast.error("Failed to save showcase");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {initialShowcase ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={showcase.title}
                onChange={(e) =>
                  setShowcase({ ...showcase, title: e.target.value })
                }
                placeholder="Enter project title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Project URL</Label>
              <Input
                id="link"
                value={showcase.link}
                onChange={(e) =>
                  setShowcase({ ...showcase, link: e.target.value })
                }
                placeholder="Enter project URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={showcase.description}
                onChange={(e) =>
                  setShowcase({ ...showcase, description: e.target.value })
                }
                placeholder="Enter project description"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Image</Label>
              <FileUpload
                onUploadComplete={(url) =>
                  setShowcase({ ...showcase, image: url })
                }
                onError={(error) => toast.error(error)}
                accept={["image/*"]}
                maxSize={5 * 1024 * 1024} // 5MB
                buttonText="Upload Project Image"
                showPreview={true}
                currentURL={showcase.image}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
