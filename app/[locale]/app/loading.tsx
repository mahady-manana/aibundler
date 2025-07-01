"use client";

import { Logo } from "@/components/ui/logo";

export default function Loading() {
  return (
    <div className="fixed h-screen w-full left-0 top-0 z-100 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="relative h-30 w-30 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
          <div className="p-8">
            <Logo className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
