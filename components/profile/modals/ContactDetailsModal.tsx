"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe, Linkedin, Mail, Phone, Share2, X } from "lucide-react";

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function ContactDetailsModal({
  isOpen,
  onClose,
  contact,
}: ContactDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {contact.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${contact.email}`}
                className="text-sm hover:text-primary"
              >
                {contact.email}
              </a>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${contact.phone}`}
                className="text-sm hover:text-primary"
              >
                {contact.phone}
              </a>
            </div>
          )}
          {contact.in && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a
                href={contact.in}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                GitHub Profile
              </a>
            </div>
          )}
          {contact.x && (
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-muted-foreground" />
              <a
                href={contact.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                X (Twitter) Profile
              </a>
            </div>
          )}
          {contact.website?.map((site, index) => (
            <div key={index} className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                {site.name}
              </a>
            </div>
          ))}
          {contact.cv && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={contact.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                Resume/CV
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
