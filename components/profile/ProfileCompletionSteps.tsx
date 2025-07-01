"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { ContactInfoStep } from "./steps/ContactInfoStep";
import { SkillsStep } from "./steps/SkillsStep";

export interface ProfileFormData {
  basic: {
    name: string;
    title: string;
    company: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  experience: any[];
  education: any[];
  showcase: any[];
}

interface ProfileCompletionStepsProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (stepData: { step: string; data: any }) => void;
  isUpdating?: boolean;
}

export function ProfileCompletionSteps({
  isOpen,
  onClose,
  onComplete,
  isUpdating = false,
}: ProfileCompletionStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfileFormData>({
    basic: {
      name: "",
      title: "",
      company: "",
    },
    contact: {
      email: "",
      phone: "",
      website: "",
      linkedin: "",
      github: "",
    },
    skills: [],
    experience: [],
    education: [],
    showcase: [],
  });

  const steps = [
    { id: "basic", label: "Basic Info" },
    { id: "contact", label: "Contact Info" },
    { id: "skills", label: "Skills" },
  ] as const;

  const handleNext = () => {
    const currentStepData = {
      step: steps[currentStep].id,
      data: formData[steps[currentStep].id as keyof ProfileFormData],
    };
    onComplete(currentStepData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData.basic}
            onChange={(data) => setFormData({ ...formData, basic: data })}
          />
        );
      case 1:
        return (
          <ContactInfoStep
            formData={formData.contact}
            onChange={(data) => setFormData({ ...formData, contact: data })}
          />
        );
      case 2:
        return (
          <SkillsStep
            skills={formData.skills}
            onChange={(skills) => setFormData({ ...formData, skills })}
          />
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Complete Your Profile
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Fill in your basic information to get started
            </p>
          </DialogHeader>
        </div>

        <div className="px-6 py-4">
          <Progress value={progress} className="h-2" />
        </div>

        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                    index < currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : index === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium",
                    index === currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-4 left-[calc(100%+8px)] w-[calc(100%-16px)] h-[2px]",
                      index < currentStep
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">{renderStepContent()}</div>
        </div>

        <div className="flex items-center justify-between p-6 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0 || isUpdating}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={isUpdating} className="gap-2">
            {isUpdating ? (
              "Saving..."
            ) : currentStep === steps.length - 1 ? (
              "Complete"
            ) : (
              <>
                Save & Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
