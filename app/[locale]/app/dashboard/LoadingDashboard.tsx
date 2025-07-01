import { Skeleton } from "@/components/ui/skeleton";

export const LoadingDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto px-2 space-y-6 ">
      {/* Header Skeleton */}
      <div className="relative bg-white rounded-md overflow-hidden">
        <Skeleton className="h-20 w-full bg-gray-100" />
        <div className="absolute left-8 top-10 bg-gray-400 rounded-full">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
        <div className="pt-15 md:flex justify-between gap-4 pb-4 space-y-2 px-6">
          <div className="space-y-2 md:w-1/2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6" />
          </div>
        </div>
      </div>

      {/* stats Skeleton */}
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 bg-white rounded-md">
              <div className="p-2 space-y-2">
                <Skeleton className="h-3" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Experience Skeleton */}
      <div className="flex gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6 md:w-1/2 bg-white p-4 rounded-md">
            <div className="space-y-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-2 w-32" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
