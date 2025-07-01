import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  type: "view" | "endorsement" | "connection" | "comment";
  user: string;
  company?: string;
  skill?: string;
  role?: string;
  project?: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="col-span-4 bg-white">
      <CardHeader>
        <CardTitle>Recent Profile Activity</CardTitle>
        <CardDescription>
          Your profile&apos;s recent interactions and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${activity.user}`}
                  />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.user}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.type === "view" &&
                      `Viewed your profile at ${activity.company}`}
                    {activity.type === "endorsement" &&
                      `Endorsed your ${activity.skill} skills`}
                    {activity.type === "connection" &&
                      `Connected as ${activity.role}`}
                    {activity.type === "comment" &&
                      `Commented on your ${activity.project}`}
                  </p>
                </div>
                <Badge variant="secondary">{activity.time}</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
