"use server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/services/session/session";
import { UserType } from "@/types/user";

interface ProfileStatus {
  isComplete: boolean;
  completionPercentage: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Website {
  link: string;
  name: string;
}

interface ContactData {
  cv?: string;
  in?: string;
  website?: Website[];
  email?: string;
  phone?: string;
  github?: string;
  x?: string;
}

interface UpdateProfileData {
  name: string;
  title: string;
  company: string;
  address: Address;
  summary: string;
  openToWork: boolean;
  contact?: ContactData;
}

async function validateUser(userId: string) {
  const session = await verifySession();
  if (!session.isAuth || !session.userId) {
    throw new Error("Unauthorized");
  }
  if (userId !== session.userId) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function checkProfileStatus(): Promise<ProfileStatus> {
  // Implement your own logic here or call your API
  // Placeholder: always returns complete
  return { isComplete: true, completionPercentage: 100 };
}

export async function updateProfile(data: Partial<UserType>) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id!,
      },
      data: {
        name: data.name,
        title: data.title,
        summary: data.summary,
        status: data.status,
        image: data.image,
        coverPhoto: data.coverPhoto,
        address: data.address
          ? {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
            }
          : undefined,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function updateContact(userId: string, contact: ContactData) {
  try {
    await validateUser(userId);
    const updatedContact = await prisma.contact.upsert({
      where: { userId },
      create: {
        userId,
        cv: contact.cv,
        in: contact.in,
        website: contact.website || [],
        email: contact.email,
        phone: contact.phone,
        github: contact.github,
        x: contact.x,
      },
      update: {
        cv: contact.cv,
        in: contact.in,
        website: contact.website || [],
        email: contact.email,
        phone: contact.phone,
        github: contact.github,
        x: contact.x,
      },
    });
    return { success: true, contact: updatedContact };
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

export async function updateSkills(userId: string, skills: string[]) {
  try {
    await validateUser(userId);
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          deleteMany: {},
          create: skills.map((skillId) => ({
            skillId,
            level: 1,
          })),
        },
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Error updating skills:", error);
    throw error;
  }
}

export async function updateExperience(userId: string, experience: any) {
  try {
    await validateUser(userId);

    if (experience.id) {
      // Update existing experience
      await prisma.experience.update({
        where: { id: experience.id },
        data: {
          role: experience.role,
          description: experience.description,
          company: experience.company,
          location: experience.location,
          startedAt: experience.startedAt,
          endedAt: experience.current ? null : experience.endedAt,
          current: experience.current,
          skills: experience.skills,
        },
      });
    } else {
      // Create new experience
      await prisma.experience.create({
        data: {
          userId,
          role: experience.role,
          description: experience.description,
          company: experience.company,
          location: experience.location,
          startedAt: experience.startedAt,
          endedAt: experience.current ? null : experience.endedAt,
          current: experience.current,
          skills: experience.skills,
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
}

export async function updateShowcase(userId: string, showcase: any) {
  try {
    await validateUser(userId);

    if (showcase.id) {
      // Update existing showcase
      await prisma.showcase.update({
        where: { id: showcase.id },
        data: {
          title: showcase.title,
          description: showcase.description,
          image: showcase.image,
          link: showcase.link,
        },
      });
    } else {
      // Create new showcase
      await prisma.showcase.create({
        data: {
          userId,
          title: showcase.title,
          description: showcase.description,
          image: showcase.image,
          link: showcase.link,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating showcase:", error);
    throw error;
  }
}

export async function updateEducation(userId: string, education: any) {
  try {
    await validateUser(userId);

    if (education.id) {
      // Update existing education
      await prisma.education.update({
        where: { id: education.id },
        data: {
          school: education.school,
          degree: education.degree,
          field: education.field,
          startedAt: education.startedAt,
          endedAt: education.current ? null : education.endedAt,
          current: education.current,
          description: education.description,
        },
      });
    } else {
      // Create new education
      await prisma.education.create({
        data: {
          userId,
          school: education.school,
          degree: education.degree,
          field: education.field,
          startedAt: education.startedAt,
          endedAt: education.current ? null : education.endedAt,
          current: education.current,
          description: education.description,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating education:", error);
    throw error;
  }
}

export async function updateUsername(userId: string, username: string) {
  try {
    await validateUser(userId);

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== userId) {
      return { error: "Username is already taken" };
    }

    // Update username
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
}
