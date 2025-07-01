import { Video } from "lucide-react";

export default function VideoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full text-center">
        <Video className="mx-auto h-12 w-12 text-purple-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Create Short Video</h1>
        <p className="text-muted-foreground mb-6">
          Turn your ideas into short, engaging videos. (Video generator coming
          soon!)
        </p>
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-gray-400">
          Video Generator Placeholder
        </div>
      </div>
    </div>
  );
}
