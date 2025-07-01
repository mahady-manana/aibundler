"use client";

import { useState } from "react";
import { EditButton } from "../edits/EditButton";
import { EditShowcaseModal } from "../modals/EditShowcaseModal";

interface Showcase {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

interface EditShowcaseButtonProps {
  profileId: string;
  showcase: Showcase;
}

export function EditShowcaseButton({
  profileId,
  showcase,
}: EditShowcaseButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EditButton onClick={() => setIsModalOpen(true)} />
      <EditShowcaseModal
        isOpen={isModalOpen}
        onClose={handleClose}
        profileId={profileId}
        initialShowcase={showcase}
      />
    </>
  );
}
