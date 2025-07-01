"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { ContactDetailsModal } from "./modals/ContactDetailsModal";

interface ContactButtonProps {
  contact: {
    cv?: string;
    in?: string;
    website?: { link: string; name: string }[];
    email?: string;
    phone?: string;
    github?: string;
    x?: string;
  };
}

export function ContactButton({ contact }: ContactButtonProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <Button
        variant="link"
        className="p-0 text-blue-600"
        onClick={() => setShowContactModal(true)}
      >
        <Mail className="inline w-4 h-4 mr-1" /> Contact details
      </Button>

      <ContactDetailsModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contact={contact}
      />
    </>
  );
}
