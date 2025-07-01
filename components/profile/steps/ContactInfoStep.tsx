"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoData {
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
}

interface ContactInfoStepProps {
  formData: ContactInfoData;
  onChange: (data: ContactInfoData) => void;
}

export function ContactInfoStep({ formData, onChange }: ContactInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => onChange({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          placeholder="Enter your website"
          value={formData.website}
          onChange={(e) => onChange({ ...formData, website: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="Enter your LinkedIn profile URL"
          value={formData.linkedin}
          onChange={(e) => onChange({ ...formData, linkedin: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          type="url"
          placeholder="Enter your GitHub profile URL"
          value={formData.github}
          onChange={(e) => onChange({ ...formData, github: e.target.value })}
        />
      </div>
    </div>
  );
}
