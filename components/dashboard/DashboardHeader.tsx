import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/stores/user.store";
import Link from "next/link";

interface DashboardHeaderProps {
  profile: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    connections: number;
    views: number;
    address: string;
  };
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  const user = useUser((s) => s.user);
  return (
    <div className="space-y-4">
      <Card className="relative bg-white">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" />
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-28 w-28 border-2 border-background bg-white">
              <AvatarImage src="/images/pela.png" />
              <AvatarFallback>{user.name || "M"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-14">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {user.name || "Not provided"}
              </h2>
              <p className="">{user.title || "Not provided"}</p>
              <p className="text-sm text-muted-foreground">{profile.address}</p>
            </div>
            <Link href="/app/me">Edit Profile</Link>
          </div>
          <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">
                {profile.connections}
              </span>{" "}
              connections
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {profile.views}
              </span>{" "}
              profile views
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
