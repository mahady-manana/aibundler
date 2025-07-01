"use client";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Education } from "../EducationSection";
import { EditEducationModal } from "../modals/EditEducationModal";

interface EditEducationButtonProps {
  education: Education;
}

export function EditEducationButton({ education }: EditEducationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleProfileOperation } = useProfile();
  const [loading, setloading] = useState(false);
  const handleSubmit = async (data: any) => {
    try {
      setloading(true);
      await handleProfileOperation({
        type: "education",
        action: "update",
        data: { ...data, id: education.id },
      });
      setIsOpen(false);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Failed to update education:", error);
    }
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
        <Pencil className="h-6 w-6" />
      </Button>
      <EditEducationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        education={education}
        loading={loading}
      />
    </>
  );
}
