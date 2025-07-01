import { Card, CardContent } from "@/components/ui/card";
import { EXPERIENCE_ICON_COLORS } from "@/lib/constants";
import { format } from "date-fns";
import { Briefcase } from "lucide-react";
import { Separator } from "../ui/separator";
import { AddExperienceButton } from "./buttons/AddExperienceButton";
import { EditExperienceButton } from "./edits/EditExperienceButton";

interface Experience {
  id: string;
  role: string;
  description: string;
  company: string;
  location: string;
  startedAt: Date;
  endedAt?: Date;
  current: boolean;
  skills: string[];
}

interface ExperienceSectionProps {
  user: {
    id: string;
    experiences: Experience[];
  };
  editable?: boolean;
}

export default function ExperienceSection({
  user,
  editable,
}: ExperienceSectionProps) {
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <Card className="py-4 bg-white">
      <CardContent className="">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          {editable && <AddExperienceButton userId={user.id} />}
        </div>
        <div className="">
          {user.experiences?.map((exp: Experience, index: number) => (
            <div key={exp.id}>
              <div className="flex gap-4 md:mb-0">
                <div
                  className={`h-10 w-10 mt-2 ${
                    EXPERIENCE_ICON_COLORS[
                      index % EXPERIENCE_ICON_COLORS.length
                    ]
                  } flex items-center justify-center font-bold text-md rounded-md`}
                >
                  <Briefcase size={18} />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-base">{exp.role}</div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {exp.company}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span role="img" aria-label="calendar">
                          📅
                        </span>{" "}
                        {formatDate(exp.startedAt)} —{" "}
                        {exp.current
                          ? "Present"
                          : exp.endedAt
                          ? formatDate(exp.endedAt)
                          : ""}{" "}
                        <span className="ml-2" role="img" aria-label="location">
                          📍
                        </span>{" "}
                        {exp.location}
                      </div>
                    </div>
                    {editable && (
                      <EditExperienceButton experience={exp} userId={user.id} />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exp.skills?.map((tech: string) => (
                      <button
                        key={tech}
                        className="text-xs bg-white text-primary/80 font-bold"
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Separator className="my-6 bg-gray-200 w-full"></Separator>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
