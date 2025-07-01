/* eslint-disable react/no-unescaped-entities */

import { OnboardingForm } from "@/components/auth/OnboardingForm";
import { getUser } from "@/services/auth/getUser";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const user = await getUser();

  if (!user?.id) {
    redirect("/auth/signin");
  }
  if (user?.onboardingCompleted) {
    redirect("/app/dashboard");
  }

  return (
    <div className="fixed h-screen w-full top-0 left-0 z-100 bg-neutral">
      <OnboardingForm userId={user.id} />
    </div>
  );
}
