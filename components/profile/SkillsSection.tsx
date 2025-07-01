"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserType } from "@/types/user";
import { EditSkillsModal } from "./edits/EditSkillsModal";

interface SkillsSectionProps {
  user: UserType;
  onUpdate?: () => void;
  editable?: boolean;
}

export default function SkillsSection({
  user,
  onUpdate,
  editable,
}: SkillsSectionProps) {
  return (
    <Card className="py-4 bg-white">
      <CardContent className="py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold">SKILLS</div>
          {editable && <EditSkillsModal user={user} onUpdate={onUpdate} />}
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((skill) => (
            <div
              key={skill.id}
              className="text-md px-3 py-1 rounded-md bg-green-100 text-green-800 font-bold"
            >
              {skill.skill.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsList({ user, onUpdate, editable }: SkillsSectionProps) {
  return (
    <div className="mb-2 relative">
      <div className="flex items-center justify-between">
        <div className="font-bold">SKILLS</div>
        <div className="">
          {editable && <EditSkillsModal user={user} onUpdate={onUpdate} />}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {user.skills?.map((skill) => (
          <div
            key={skill.id}
            className="text-md px-3 py-1 rounded-md bg-blue-100 text-blue-800"
          >
            {skill.skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
