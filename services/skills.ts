"use server";
import { prisma } from "@/lib/prisma";

interface UpdateSkillsParams {
  userId: string;
  skills: string[];
}

export async function updateSkills({ userId, skills }: UpdateSkillsParams) {
  // First, get or create skills
  const skillPromises = skills.map(async (skillName) => {
    const skill = await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName },
    });
    return skill;
  });

  const createdSkills = await Promise.all(skillPromises);

  // Delete existing user skills
  await prisma.userSkill.deleteMany({
    where: { userId },
  });

  // Create new user skills
  const userSkillPromises = createdSkills.map((skill) =>
    prisma.userSkill.create({
      data: {
        userId,
        skillId: skill.id,
        level: 1,
        starred: false,
        endorsements: 0,
      },
    })
  );

  await Promise.all(userSkillPromises);

  return { success: true };
}

export async function getUserSkills(userId: string) {
  const userSkills = await prisma.userSkill.findMany({
    where: { userId },
    include: {
      skill: true,
    },
  });

  return userSkills.map((us) => ({
    id: us.skill.id,
    name: us.skill.name,
    level: us.level,
    starred: us.starred,
    endorsements: us.endorsements,
  }));
}

export async function searchSkills(query: string) {
  const skills = await prisma.skill.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));
}
