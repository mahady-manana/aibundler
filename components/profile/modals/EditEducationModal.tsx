"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EditEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  education?: any;
  loading?: boolean;
}

export function EditEducationModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  education,
}: EditEducationModalProps) {
  const [formData, setFormData] = useState({
    school: education?.school || "",
    degree: education?.degree || "",
    field: education?.field || "",
    startedAt: education?.startedAt ? education.startedAt : null,
    endedAt: education?.endedAt ? education.endedAt : null,
    current: education?.current || false,
    description: education?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {education ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              value={formData.field}
              onChange={(e) =>
                setFormData({ ...formData, field: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startedAt">Start Date</Label>
              <Input
                id="startedAt"
                type="month"
                value={
                  formData.startedAt
                    ? new Date(formData.startedAt).toISOString().slice(0, 7)
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startedAt: new Date(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endedAt">End Date</Label>
              <Input
                id="endedAt"
                type="month"
                value={
                  formData.endedAt
                    ? new Date(formData.endedAt).toISOString().slice(0, 7)
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endedAt: new Date(e.target.value),
                  })
                }
                disabled={formData.current}
                required={!formData.current}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, current: checked as boolean })
              }
            />
            <Label htmlFor="current">I currently study here</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{loading ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
