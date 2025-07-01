"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EditExperienceModal } from "../modals/EditExperienceModal";

interface AddExperienceButtonProps {
  userId: string;
}

export function AddExperienceButton({ userId }: AddExperienceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>

      <EditExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={userId}
      />
    </>
  );
}
