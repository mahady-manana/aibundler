import { useUser } from "@/stores/user.store";
import {
  Briefcase,
  Building2,
  Coffee,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export function Dashboard() {
  const user = useUser((s) => s.user);

  const getProfileIcon = (type: string) => {
    switch (type) {
      case "professional":
        return <Briefcase className="w-5 h-5" />;
      case "creator":
        return <Sparkles className="w-5 h-5" />;
      case "recruiter":
        return <Building2 className="w-5 h-5" />;
      case "student":
        return <GraduationCap className="w-5 h-5" />;
      case "entrepreneur":
        return <Users className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case "get-job":
        return <Briefcase className="w-5 h-5" />;
      case "search-talent":
        return <Building2 className="w-5 h-5" />;
      case "show-talent":
        return <Sparkles className="w-5 h-5" />;
      case "grow-business":
        return <Target className="w-5 h-5" />;
      case "learn-network":
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg p-6">
        {/* Profile Header */}

        <p>Dahbaord</p>
      </div>
    </div>
  );
}
