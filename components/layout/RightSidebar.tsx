"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, MapPin, Plus } from "lucide-react";
import { ProfileLink } from "../profile/edits/ProfileLink";

const suggestedProfiles = [
  {
    name: "Sarah Johnson",
    role: "Senior Product Designer",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    company: "InnovateAI",
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Emma Wilson",
    role: "Marketing Director",
    company: "GrowthLabs",
    avatar: "/avatars/emma.jpg",
  },
];

const jobPosts = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    logo: "/companies/techcorp.png",
  },
  {
    title: "Product Manager",
    company: "InnovateAI",
    location: "Remote",
    logo: "/companies/innovateai.png",
  },
];

export default function RightSidebar() {
  return (
    <aside className="w-80 space-y-4">
      {/* Suggested Profiles Card */}
      <ProfileLink></ProfileLink>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">People you may know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedProfiles.map((profile) => (
            <div key={profile.name} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{profile.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {profile.role}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {profile.company}
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Job Posts Card */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Recommended jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobPosts.map((job) => (
            <div key={job.title} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={job.logo} alt={job.company} />
                  <AvatarFallback>
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{job.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {job.company}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Briefcase className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
