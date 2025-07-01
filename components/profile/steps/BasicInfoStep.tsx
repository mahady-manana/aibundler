"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoData {
  name: string;
  title: string;
  company: string;
}

interface BasicInfoStepProps {
  formData: BasicInfoData;
  onChange: (data: BasicInfoData) => void;
}

export function BasicInfoStep({ formData, onChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          placeholder="e.g. Senior Software Engineer"
          value={formData.title}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={(e) => onChange({ ...formData, company: e.target.value })}
        />
      </div>
    </div>
  );
}
