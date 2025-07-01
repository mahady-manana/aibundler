import { cn } from "@/lib/utils";
import { LayoutGrid, LayoutList, LayoutTemplate } from "lucide-react";
import Link from "next/link";

interface LayoutSelectorProps {
  currentLayout: "default" | "compact" | "grid";
}

export function LayoutSelector({ currentLayout }: LayoutSelectorProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Link
        href="?layout=default"
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          currentLayout === "default"
            ? "bg-primary text-primary-foreground"
            : "bg-white hover:bg-gray-100"
        )}
      >
        <LayoutList className="h-4 w-4" />
        Default
      </Link>
      <Link
        href="?layout=compact"
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          currentLayout === "compact"
            ? "bg-primary text-primary-foreground"
            : "bg-white hover:bg-gray-100"
        )}
      >
        <LayoutTemplate className="h-4 w-4" />
        Compact
      </Link>
      <Link
        href="?layout=grid"
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
          currentLayout === "grid"
            ? "bg-primary text-primary-foreground"
            : "bg-white hover:bg-gray-100"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        Grid
      </Link>
    </div>
  );
}
