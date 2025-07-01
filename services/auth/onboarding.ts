"use server";
import { revalidatePath } from "next/cache";

export type ProfileType = "freelancer" | "company" | "recruiter";
export type GoalType = "find-work" | "hire-talent" | "network";

interface OnboardingData {
  profileType: string;
  goal: string;
  userId: string;
}

export async function updateOnboarding(data: OnboardingData) {
  try {
    // const session = await verifySession();
    // if (!session.isAuth || !session.userId) {
    //   throw new Error("Unauthorized");
    // }
    // if (data.userId !== session.userId) {
    //   throw new Error("Unauthorized");
    // }

    // const updatedUser = await prisma.user.update({
    //   where: { id: data.userId },
    //   data: {
    //     profileType: data.profileType,
    //     goal: data.goal,
    //     onboardingCompleted: true,
    //   },
    // });

    revalidatePath("/app/me");
    return { success: true };
  } catch (error) {
    console.error("Error updating onboarding:", error);
    throw error;
  }
}
