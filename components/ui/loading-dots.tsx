import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <div className="h-1 w-1 animate-bounce rounded-full bg-current" />
    </div>
  );
}
