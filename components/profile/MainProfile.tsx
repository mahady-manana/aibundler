import ShowcaseSection from "@/components/profile/ShowcaseSection";
import SkillsSection from "@/components/profile/SkillsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationSection } from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProfileHeaderFlex from "./profileHeader/ProfileHeaderFlex";
import { SummarySection } from "./SummarySection";

interface MainProfileProps {
  user: any;
  layout?: "default" | "compact" | "grid";
}

export function MainProfile({ user, layout = "default" }: MainProfileProps) {
  const getLayoutClass = () => {
    switch (layout) {
      case "compact":
        return "max-w-6xl";
      case "grid":
        return "max-w-6xl";
      default:
        return "max-w-6xl";
    }
  };

  const getContentLayout = () => {
    if (layout === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <SummarySection user={user} />
            <SkillsSection user={user} />
            <ExperienceSection user={user} />
          </div>
          <div className="space-y-4">
            <ShowcaseSection user={user} />
            <EducationSection user={user} />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <SummarySection user={user} />
        <SkillsSection user={user} />
        <ExperienceSection user={user} />
        <ShowcaseSection user={user} />
        <EducationSection user={user} />
      </div>
    );
  };

  return (
    <div className={`${getLayoutClass()} mx-auto px-2`}>
      <ProfileHeaderFlex user={user} />
      <Tabs defaultValue="home" className="w-full">
        <div className="overflow-x-auto md:overflow-none">
          <TabsList className="mb-4 gap-2">
            <TabsTrigger
              value="home"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="experiences"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              Experiences
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="educations"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              Educations & Formations
            </TabsTrigger>
            <TabsTrigger
              value="others"
              className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
            >
              Others
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="home">{getContentLayout()}</TabsContent>
        <TabsContent value="skills">
          <SkillsSection user={user} />
        </TabsContent>
        <TabsContent value="experiences">
          <ExperienceSection user={user} />
        </TabsContent>
        <TabsContent value="projects">
          <ShowcaseSection user={user} />
        </TabsContent>
        <TabsContent value="educations">
          <EducationSection user={user} />
        </TabsContent>
        <TabsContent value="others">
          <ShowcaseSection user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
