"use client";

import { CountrySelect } from "@/components/ui/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Address, BasicInfo } from "@/types/profile";

interface MainProfileFormProps {
  info: BasicInfo;
  onInfoChange: (field: keyof BasicInfo, value: any) => void;
  onAddressChange: (field: keyof Address, value: string) => void;
}

export function MainProfileForm({
  info,
  onInfoChange,
  onAddressChange,
}: MainProfileFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={info.name}
          onChange={(e) => onInfoChange("name", e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={info.title}
          onChange={(e) => onInfoChange("title", e.target.value)}
          placeholder="Enter your title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={info.company}
          onChange={(e) => onInfoChange("company", e.target.value)}
          placeholder="Enter your company"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={info.summary}
          onChange={(e) => onInfoChange("summary", e.target.value)}
          placeholder="Enter your summary"
          rows={6}
        />
      </div>

      <div className="space-y-4">
        <Label>Address *</Label>
        <div className="space-y-2">
          <Input
            id="street"
            value={info.address.street}
            onChange={(e) => onAddressChange("street", e.target.value)}
            placeholder="Street address"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Input
              id="city"
              value={info.address.city}
              onChange={(e) => onAddressChange("city", e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="state"
              value={info.address.state}
              onChange={(e) => onAddressChange("state", e.target.value)}
              placeholder="State"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <CountrySelect
            value={info.address.country}
            onChange={(value) => onAddressChange("country", value)}
            placeholder="Select your country"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="openToWork"
          checked={info.openToWork}
          onCheckedChange={(checked) => onInfoChange("openToWork", checked)}
        />
        <Label htmlFor="openToWork">Open to work</Label>
      </div>
    </div>
  );
}
