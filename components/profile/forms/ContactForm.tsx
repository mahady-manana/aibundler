"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactInfo, Website } from "@/types/profile";
import { useState } from "react";

interface ContactFormProps {
  contact: ContactInfo | undefined;
  onContactChange: (field: keyof ContactInfo, value: any) => void;
}

export function ContactForm({ contact, onContactChange }: ContactFormProps) {
  const [website, setWebsite] = useState<Website>({ link: "", name: "" });

  const handleWebsiteAdd = () => {
    if (website.link && website.name) {
      onContactChange("website", [...(contact?.website || []), website]);
      setWebsite({ link: "", name: "" });
    }
  };

  const handleWebsiteRemove = (index: number) => {
    const updatedWebsites =
      contact?.website?.filter((_, i) => i !== index) || [];
    onContactChange("website", updatedWebsites);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={contact?.email || ""}
          onChange={(e) => onContactChange("email", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={contact?.phone || ""}
          onChange={(e) => onContactChange("phone", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          placeholder="Enter your LinkedIn profile URL"
          value={contact?.in || ""}
          onChange={(e) => onContactChange("in", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          placeholder="Enter your GitHub profile URL"
          value={contact?.github || ""}
          onChange={(e) => onContactChange("github", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="x">X (Twitter)</Label>
        <Input
          id="x"
          placeholder="Enter your X (Twitter) profile URL"
          value={contact?.x || ""}
          onChange={(e) => onContactChange("x", e.target.value)}
        />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="cv">CV/Resume URL</Label>
        <Input
          id="cv"
          placeholder="Enter your CV/Resume URL"
          value={contact?.cv || ""}
          onChange={(e) => onContactChange("cv", e.target.value)}
        />
      </div> */}

      <div className="space-y-4">
        <Label>Websites</Label>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Website name"
              value={website.name}
              onChange={(e) => setWebsite({ ...website, name: e.target.value })}
            />
            <Input
              placeholder="Website URL"
              value={website.link}
              onChange={(e) => setWebsite({ ...website, link: e.target.value })}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWebsiteAdd}
            disabled={!website.name || !website.link}
          >
            Add Website
          </Button>
        </div>

        {contact?.website && contact.website.length > 0 && (
          <div className="space-y-2">
            {contact.website.map((site, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <p className="font-medium">{site.name}</p>
                  <p className="text-sm text-gray-500">{site.link}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleWebsiteRemove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
