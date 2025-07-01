import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { getUserLink } from "@/services/links";
import { useUser } from "@/stores/user.store";
import { UserType } from "@/types/user";
import { Link2, Link as LinkIcon, Pencil, Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfileLink() {
  const { toast } = useToast();
  const user = useUser((s) => s.user);
  const { handleProfileOperation } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState<UserType["links"]>(
    user.links || []
  );

  const fullUrl = `www.prolika.com/me/${username}`;

  const handleCreateShortLink = async () => {
    setIsLoading(true);
    try {
      const result = await handleProfileOperation({
        type: "shortLink",
        action: "create",
        data: {},
      });
      if (result?.id) {
        const link = await getUserLink(user.id);
        if (link && !shortLink?.find(({ id }) => id === link.id)) {
          setShortLink((prev) => (prev || []).concat(link));
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create short link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      toast({
        title: "Error",
        description:
          "Username can only contain letters, numbers, underscores, and hyphens",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await handleProfileOperation({
        type: "username",
        action: "update",
        data: {
          id: user.id,
          username,
        },
      });
      if (res?.error) {
        toast({
          title: "Error",
          description: res.error || "Failed to update username",
          variant: "destructive",
        });
      }
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update username",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  useEffect(() => {
    if (user.username) {
      setUsername(user.username || "");
    }
  }, [user.username]);

  useEffect(() => {
    if (user.links) {
      setShortLink(user.links || []);
    }
  }, [user.links]);

  console.log(shortLink);

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Profile Links</h3>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Username/Public Link */}
          <div className="space-y-2">
            <p className="text-sm flex items-center gap-4 font-bold">
              Public Link
              <Link
                href={"https://" + fullUrl}
                target="_blank"
                className="text-blue-800"
              >
                <Link2 size={20}></Link2>
              </Link>
            </p>
            {isEditing ? (
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsEditing(false);
                    setUsername(user?.username || "");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </Button>
              </div>
            ) : (
              <div className="gap-2">
                <div className="py-2 bg-muted rounded-md break-all">
                  {fullUrl}
                </div>
              </div>
            )}
          </div>

          {/* Short Link */}
          <div className="space-y-2">
            <label className="text-sm font-bold">
              Short Link -{" "}
              <span className="text-gray-500">For quick share</span>
            </label>
            {shortLink?.length ? (
              <div className="gap-2">
                {shortLink.map((li) => {
                  return (
                    <p
                      key={li.id}
                      className="flex justify-between py-2 bg-muted rounded-md"
                    >
                      www.prolika.com/{li.link}
                      <Link
                        href="/stats"
                        className="pl-2 text-blue-600 underline"
                      >
                        {li.visits} views
                      </Link>
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 py-2 bg-muted rounded-md text-muted-foreground">
                No short link generated yet
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleCreateShortLink}
                disabled={isLoading}
              >
                Generate new link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
