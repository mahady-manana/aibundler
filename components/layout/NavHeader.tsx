"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth/logout";
import {
  Bell,
  Briefcase,
  Home,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/app/dashboard" },
  { icon: Users, label: "Network", href: "/network" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: User, label: "Me", href: "/app/me" },
  { icon: MoreHorizontal, label: "More", href: "#" },
];

function LogoAndSearch() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="text-2xl font-bold text-primary">
        Prolika
      </Link>
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search"
          className="pl-10 bg-neutral border-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}

function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 h-full">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="h-full">
          <Button
            variant={pathname === item.href ? "neutral" : "ghost"}
            className={cn(
              "flex flex-col items-center gap-1 h-full px-4 border-b-2 rounded-none",
              pathname === item.href ? "border-gray-500" : "border-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        </Link>
      ))}
    </nav>
  );
}

function UserActions() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
          5
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/app/me" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default function NavHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <LogoAndSearch />
        <MainNavigation />
        <UserActions />
      </div>
    </header>
  );
}
