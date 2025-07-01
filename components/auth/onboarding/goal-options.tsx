import {
  Briefcase,
  Building2,
  Coffee,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";

export type GoalType =
  | "get-job"
  | "search-talent"
  | "show-talent"
  | "grow-business"
  | "learn-network"
  | "mentor-others"
  | "chill";

export const goalOptions = [
  {
    value: "get-job" as GoalType,
    label: "Get a Job",
    description: "Find your next career opportunity",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    value: "show-talent" as GoalType,
    label: "Show my Talent",
    description: "Build your personal brand and showcase your work",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    value: "search-talent" as GoalType,
    label: "Search for Talent",
    description: "Discover and connect with skilled professionals",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    value: "grow-business" as GoalType,
    label: "Grow my Business",
    description: "Find partners, investors, and opportunities to scale",
    icon: <Target className="w-6 h-6" />,
  },
  {
    value: "learn-network" as GoalType,
    label: "Learn & Network",
    description: "Connect with mentors and expand your knowledge",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    value: "chill" as GoalType,
    label: "Just Chill",
    description: "Take your time to explore the platform",
    icon: <Coffee className="w-6 h-6" />,
  },
];
