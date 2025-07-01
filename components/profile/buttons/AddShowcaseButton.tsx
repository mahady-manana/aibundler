"use client";

import { useState } from "react";
import { EditShowcaseModal } from "../modals/EditShowcaseModal";
import { AddButton } from "./AddButton";

interface AddShowcaseButtonProps {
  profileId: string;
}

export function AddShowcaseButton({ profileId }: AddShowcaseButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddButton onClick={() => setIsModalOpen(true)} />
      <EditShowcaseModal
        isOpen={isModalOpen}
        onClose={handleClose}
        profileId={profileId}
      />
    </>
  );
}
