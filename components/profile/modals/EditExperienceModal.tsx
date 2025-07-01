"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { toast } from "sonner";

interface Experience {
  id?: string;
  role: string;
  description: string;
  company: string;
  location: string;
  startedAt: Date;
  endedAt?: Date;
  current: boolean;
  skills: string[];
}

interface EditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  initialExperience?: Experience;
}

export function EditExperienceModal({
  isOpen,
  onClose,
  profileId,
  initialExperience,
}: EditExperienceModalProps) {
  const [experience, setExperience] = useState<Experience>(
    initialExperience || {
      role: "",
      description: "",
      company: "",
      location: "",
      startedAt: new Date(),
      current: false,
      skills: [],
    }
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { handleProfileOperation } = useProfile();
  const handleSave = async () => {
    try {
      setIsUpdating(true);

      // Validate required fields
      if (!experience.company || !experience.role || !experience.startedAt) {
        toast.error("Please fill in all required fields");
        return;
      }

      // If current is true, set endedAt to null
      const experienceData = {
        ...experience,
        endedAt: experience.current ? null : experience.endedAt,
      };

      await handleProfileOperation({
        action: "update",
        data: experienceData,
        type: "experience",
      });
      toast.success(
        initialExperience
          ? "Experience updated successfully"
          : "Experience added successfully"
      );
      onClose();
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[500px] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="">
          <DialogTitle>
            {initialExperience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={experience.company}
                onChange={(e) =>
                  setExperience({ ...experience, company: e.target.value })
                }
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={experience.role}
                onChange={(e) =>
                  setExperience({ ...experience, role: e.target.value })
                }
                placeholder="Enter your role"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startedAt">Start Date</Label>
                <Input
                  id="startedAt"
                  type="month"
                  value={
                    experience.startedAt
                      ? new Date(experience.startedAt).toISOString().slice(0, 7)
                      : ""
                  }
                  onChange={(e) =>
                    setExperience({
                      ...experience,
                      startedAt: new Date(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endedAt">End Date</Label>
                <Input
                  id="endedAt"
                  type="month"
                  value={
                    experience.endedAt
                      ? new Date(experience.endedAt).toISOString().slice(0, 7)
                      : ""
                  }
                  onChange={(e) =>
                    setExperience({
                      ...experience,
                      endedAt: e.target.value
                        ? new Date(e.target.value)
                        : undefined,
                    })
                  }
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                checked={experience.current}
                onChange={(e) =>
                  setExperience({ ...experience, current: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="current" className="text-sm font-medium">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={experience.location}
                onChange={(e) =>
                  setExperience({ ...experience, location: e.target.value })
                }
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={experience.description}
                onChange={(e) =>
                  setExperience({ ...experience, description: e.target.value })
                }
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={experience.skills.join(", ")}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="Enter skills (comma-separated)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 py-2 border-t">
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
