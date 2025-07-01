import {
  Briefcase,
  Building2,
  Coffee,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

export type ProfileType =
  | "professional"
  | "creator"
  | "recruiter"
  | "chill"
  | "student"
  | "entrepreneur";

export const profileOptions = [
  {
    value: "professional" as ProfileType,
    label: "Professional",
    description:
      "I'm looking to advance my career and connect with industry peers",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    value: "creator" as ProfileType,
    label: "Creator",
    description: "I create content and want to showcase my work",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    value: "recruiter" as ProfileType,
    label: "Recruiter",
    description: "I'm hiring and looking for top talent",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    value: "student" as ProfileType,
    label: "Student",
    description: "I'm learning and looking for opportunities to grow",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    value: "entrepreneur" as ProfileType,
    label: "Entrepreneur",
    description: "I'm building my own business and seeking connections",
    icon: <Users className="w-6 h-6" />,
  },
  {
    value: "chill" as ProfileType,
    label: "Just Chill",
    description: "I'm here to explore and see what's possible",
    icon: <Coffee className="w-6 h-6" />,
  },
];
