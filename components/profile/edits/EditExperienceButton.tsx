"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EditExperienceModal } from "../modals/EditExperienceModal";

interface Experience {
  id: string;
  role: string;
  description: string;
  company: string;
  location: string;
  startedAt: Date;
  endedAt?: Date;
  current: boolean;
  skills: string[];
}

interface EditExperienceButtonProps {
  experience: Experience;
  userId: string;
}

export function EditExperienceButton({
  experience,
  userId,
}: EditExperienceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)}>
        <Pencil className="h-6 w-6" />
      </Button>

      <EditExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={userId}
        initialExperience={experience}
      />
    </>
  );
}
