"use client";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EditEducationModal } from "../modals/EditEducationModal";

export function AddEducationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleProfileOperation } = useProfile();

  const handleSubmit = async (data: any) => {
    try {
      await handleProfileOperation({
        type: "education",
        action: "create",
        data,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </Button>
      <EditEducationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
