"use client";
import ChatList from "@/components/shared/ChatList";
import { logout } from "@/services/auth/logout";
import clsx from "clsx";
import {
  Image,
  LucideLogOut,
  MessagesSquare,
  MoreHorizontal,
  Sparkles,
  Video,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

interface SidebarProps {
  activePage?: string;
}

const SidebarLeft: React.FC<SidebarProps> = ({ activePage }) => {
  const pathname = usePathname();
  // Extract the current page from the pathname (e.g., /en/chat -> chat)
  const current = pathname.split("/")[2] || "";
  const { push } = useRouter();
  const menuItems = [
    {
      id: "chat",
      label: "Chat",
      icon: MessagesSquare,
      href: `/app/chat`,
      available: true,
    },
    { id: "image", label: "Create Image", icon: Image, href: `/app/image` },
    {
      id: "video",
      label: "Create Short Video",
      icon: Video,
      href: `/app/video`,
    },
    {
      id: "tts",
      label: "Text to Speech",
      icon: Volume2,
      href: `/app/text-to-speech`,
    },
    // {
    //   id: "stt",
    //   label: "Speech To Text",
    //   icon: Volume2,
    //   href: `./speech-to-text`,
    // },
    {
      id: "more",
      label: "More AI Tools",
      icon: MoreHorizontal,
      href: `/app/more`,
    },
  ];

  const handleLogout = async () => {
    await logout();
    push("/");
  };

  return (
    <div className="lg:block hidden w-65 dark:bg-background bg-white flex flex-col h-full shadow-sm border-r dark:border-none border-gray-200">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AI Bundler</h1>
            <p className="text-sm">By Azespace.com</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  `w-full relative flex items-center px-4 py-1 rounded-md text-left transition-all duration-200 group no-underline ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "hover:bg-background2"
                  }`,
                  !item.available
                    ? "opacity-30 cursor-not-allowed pointer-events-none"
                    : ""
                )}
              >
                <Icon
                  className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                    isActive ? "text-blue-600" : "group-hover:text-gray-700"
                  }`}
                />
                <span>{item.label}</span>
                {!item.available ? (
                  <span className="absolute right-0 top-1 text-blue-400 text-xs">
                    (soon)
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
      <ChatList />
      <div className="fixed flex flex-col gap-2 bottom-4 left-4">
        <ModeToggle></ModeToggle>
        <Button
          variant="neutral"
          size="icon"
          className="bg-background2"
          onClick={handleLogout}
        >
          <LucideLogOut></LucideLogOut>
        </Button>
      </div>
    </div>
  );
};

export default SidebarLeft;
