"use client";

import { UserType } from "@/types/user";
import { useState } from "react";
import { EditBasicInfoModal } from "../modals/EditBasicInfoModal";
import { EditButton } from "./EditButton";

interface ProfileHeaderEditButtonProps {
  user: UserType & {
    contact?: {
      cv?: string;
      in?: string;
      website?: { link: string; name: string }[];
      email?: string;
      phone?: string;
      github?: string;
      x?: string;
    };
    experiences?: { company?: string }[];
  };
}

export function ProfileHeaderEditButton({
  user,
}: ProfileHeaderEditButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatAddress = (
    address:
      | {
          street: string;
          city: string;
          state: string;
          zip: string;
          country: string;
        }
      | null
      | undefined
  ) => {
    if (!address) return "";
    return `${address.city}, ${address.state}, ${address.country}`;
  };

  return (
    <>
      <EditButton
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 bg-white"
      >
        <span className="pl-2"></span>
      </EditButton>
      <EditBasicInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={user.id}
        initialData={{
          name: user.name || "",
          title: user.title || "",
          company: user.experiences?.[0]?.company || "",
          address: user.address || {
            street: "",
            city: "",
            state: "",
            country: "",
          },
          summary: user.summary || "",
          openToWork: user.status === "open-to-work",
          contact: user.contact,
        }}
      />
    </>
  );
}
