/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUser } from "@/stores/user.store";
import { UserType } from "@/types/user";
import { ReactNode, useEffect } from "react";
import NavHeader from "./NavHeader";
import RightSidebar from "./RightSidebar";

interface AppLayoutProps {
  children: ReactNode;
  user: UserType;
}

export default function AppLayout({ children, user }: AppLayoutProps) {
  const updateUser = useUser((s) => s.updateUser);

  useEffect(() => {
    if (user.id) {
      updateUser(user);
    }
  }, [user.id]);
  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <div className="pt-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex gap-4">
            {/* Main Content */}
            <main className="flex-1 min-w-0">{children}</main>

            <div className="hidden lg:block">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
