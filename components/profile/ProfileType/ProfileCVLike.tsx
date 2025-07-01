import ShowcaseSection from "@/components/profile/ShowcaseSection";
import SkillsSection from "@/components/profile/SkillsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationSection } from "../EducationSection";
import ExperienceSection from "../ExperienceSection";
import ProfileHeaderNavLeft from "../profileHeader/ProfileHeaderNavLeft";
import { SummarySection } from "../SummarySection";

interface MainProfileProps {
  user: any;
  layout?: "default" | "compact" | "grid";
  isEditable?: boolean;
  noBanner?: boolean;
}

export function ProfileCVLike({
  user,
  isEditable,
  layout = "default",
  noBanner,
}: MainProfileProps) {
  return (
    <div className={`mx-auto px-2`}>
      <div className="md:flex gap-4">
        <div className="md:max-w-80 md:min-w-60 w-full">
          <ProfileHeaderNavLeft
            noBanner={noBanner}
            editable={isEditable}
            user={user}
          />
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
                  value="summary"
                  className="bg-white rounded-md data-[state=active]:bg-primary! data-[state=active]:text-white"
                >
                  Summary
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
                <SummarySection editable={isEditable} user={user} />
                <SkillsSection editable={isEditable} user={user} />
                <ExperienceSection editable={isEditable} user={user} />
                <ShowcaseSection editable={isEditable} user={user} />
                <EducationSection editable={isEditable} user={user} />
              </div>
            </TabsContent>
            <TabsContent value="summary">
              <SummarySection editable={isEditable} user={user} />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsSection editable={isEditable} user={user} />
            </TabsContent>
            <TabsContent value="experiences">
              <ExperienceSection editable={isEditable} user={user} />
            </TabsContent>
            <TabsContent value="projects">
              <ShowcaseSection
                editable={isEditable}
                title={false}
                card={2}
                user={user}
              />
            </TabsContent>
            <TabsContent value="educations">
              <EducationSection editable={isEditable} user={user} />
            </TabsContent>
            <TabsContent value="others">
              <ShowcaseSection
                editable={isEditable}
                title={false}
                card={2}
                user={user}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
