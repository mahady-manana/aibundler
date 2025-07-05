"use client";
import { Video } from "lucide-react";

export default function PageVideo() {
  const generate = async () => {
    const x = await fetch("/api/azure/video/sora", {
      method: "POST",
      body: "{}",
    });
    const res = await x.json();
    console.log(res);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full text-center">
        <Video className="mx-auto h-12 w-12 text-purple-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Create Short Video</h1>
        <p className="text-muted-foreground mb-6">
          Turn your ideas into short, engaging videos. (Video generator coming
          soon!)
        </p>
        <button
          className="border cursor-pointer border-dashed border-gray-300 rounded-lg p-8 text-gray-400"
          onClick={generate}
        >
          Video Generator Placeholder
        </button>
      </div>
    </div>
  );
}
