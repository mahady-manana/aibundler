import { useUser } from "@/stores/user.store";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LoginButton } from "./LoginComponent";

export const LoginButtons = () => {
  const user = useUser((s) => s.user);

  return (
    <div>
      {user.id ? (
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2 px-3 h-9 rounded-md text-sm font-medium"
        >
          <Avatar className="bg-primary text-white">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <LoginButton />
          <LoginButton isLogin={false} />
        </div>
      )}
    </div>
  );
};
