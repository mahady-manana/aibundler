import ShowcaseSection from "@/components/profile/ShowcaseSection";
import SkillsSection from "@/components/profile/SkillsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationSection } from "../EducationSection";
import ExperienceSection from "../ExperienceSection";
import ProfileHeaderCreator from "../profileHeader/ProfileHeaderCreator";

interface MainProfileProps {
  user: any;
  layout?: "default" | "compact" | "grid";
}

export function CreatorProfile({ user, layout = "default" }: MainProfileProps) {
  return (
    <div className={`mx-auto px-2`}>
      <div className="flex gap-4">
        <div className="max-w-80">
          <ProfileHeaderCreator user={user} />
        </div>
        <div className="flex-1">
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
            <TabsContent value="home">
              <div className="space-y-4">
                <SkillsSection user={user} />
                <ExperienceSection user={user} />
                <ShowcaseSection user={user} />
                <EducationSection user={user} />
              </div>
            </TabsContent>
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
              <ShowcaseSection title={false} card={2} user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
