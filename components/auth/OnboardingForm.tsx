/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { updateOnboarding } from "@/services/auth/onboarding";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoalType, goalOptions } from "./onboarding/goal-options";
import { ProfileType, profileOptions } from "./onboarding/profile-options";

interface OnboardingFormProps {
  userId: string;
}

export function OnboardingForm({ userId }: OnboardingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(
    null
  );
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSelect = (profile: ProfileType) => {
    setSelectedProfile(profile);
    setStep(2);
  };

  const handleGoalSelect = async (goal: GoalType) => {
    if (!selectedProfile) return;
    setSelectedGoal(goal);
    setIsLoading(true);
    try {
      await updateOnboarding({
        profileType: selectedProfile,
        goal: goal,
        userId,
      });
      router.push("/app/me");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update onboarding information",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Prolika</h1>
        <p className="text-muted-foreground">
          Let's get started by setting up your profile
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              What best describes you?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all bg-white ${
                    selectedProfile === option.value
                      ? "border-primary ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleProfileSelect(option.value)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {option.icon}
                    <h3 className="font-semibold">{option.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              What's your main goal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalOptions.map((option) => (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all bg-white ${
                    selectedGoal === option.value
                      ? "border-primary ring-2 ring-primary"
                      : "hover:border-primary/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLoading && handleGoalSelect(option.value)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {isLoading && selectedGoal === option.value ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      option.icon
                    )}
                    <h3 className="font-semibold">{option.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {step === 2 && (
        <div className="flex justify-end">
          <Button
            onClick={() => selectedProfile && setStep(1)}
            disabled={!selectedProfile || isLoading}
            size="lg"
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
