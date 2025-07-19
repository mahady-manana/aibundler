import { LoaderCircle } from "lucide-react";

export const PageLoading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <LoaderCircle className="animate-spin"></LoaderCircle>
        <p>Loading...</p>
      </div>
    </div>
  );
};
