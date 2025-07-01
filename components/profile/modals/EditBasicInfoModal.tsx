"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/useProfile";
import { updateContact } from "@/services/profile";
import { Address, BasicInfo, ContactInfo } from "@/types/profile";
import { useState } from "react";
import { toast } from "sonner";
import { ContactForm } from "../forms/ContactForm";
import { MainProfileForm } from "../forms/MainProfileForm";

interface EditBasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  initialData: BasicInfo;
}

export function EditBasicInfoModal({
  isOpen,
  onClose,
  profileId,
  initialData,
}: EditBasicInfoModalProps) {
  const [info, setInfo] = useState<BasicInfo>(initialData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const { handleProfileOperation } = useProfile();
  const handleInfoChange = (field: keyof BasicInfo, value: any) => {
    setInfo({
      ...info,
      [field]: value,
    });
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setInfo({
      ...info,
      address: {
        ...info.address,
        [field]: value,
      },
    });
  };

  const handleContactChange = (field: keyof ContactInfo, value: any) => {
    setInfo({
      ...info,
      contact: {
        ...info.contact,
        [field]: value,
      },
    });
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!info.name.trim()) {
        toast.error("Name is required");
        setActiveTab("main");
        return;
      }

      if (!info.title.trim()) {
        toast.error("Title is required");
        setActiveTab("main");
        return;
      }

      // Validate address fields
      const { street, city, state, country } = info.address;
      if (!street.trim() || !city.trim() || !state.trim() || !country.trim()) {
        toast.error("All address fields are required");
        setActiveTab("main");
        return;
      }

      setIsUpdating(true);
      await handleProfileOperation({
        action: "update",
        type: "basic",
        data: { id: profileId, ...info },
      });
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleContactSave = async () => {
    try {
      setIsUpdating(true);
      await handleProfileOperation({
        action: "update",
        type: "contact",
        data: info.contact,
      });
      await updateContact(profileId, info.contact || {});
      toast.success("Contact information updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update contact information");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="sticky top-0 z-10 bg-white">
              <TabsList className="">
                <TabsTrigger value="main">Main Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="main" className="space-y-4 py-4">
              <MainProfileForm
                info={info}
                onInfoChange={handleInfoChange}
                onAddressChange={handleAddressChange}
              />
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 py-4">
              <ContactForm
                contact={info.contact}
                onContactChange={handleContactChange}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === "main" ? (
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <Button onClick={handleContactSave} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Contact Info"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
