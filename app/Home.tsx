/* eslint-disable @next/next/no-img-element */
"use client";

import { AI_MODELS } from "@/azure/models";
import { LoginButtons } from "@/components/auth/LoginButtons";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Image,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
  Video,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const aiFeatures = [
  {
    icon: <MessageCircle className="h-10 w-10 text-blue-500" />,
    title: "Chat",
    description: "Converse with AI for any topic, Q&A, or brainstorming.",
    link: "/app/chat",
  },
  {
    icon: <Image className="h-10 w-10 text-green-500" />,
    title: "Create Image",
    description: "Generate stunning images from text prompts.",
    link: "/app/image",
  },
  {
    icon: <Video className="h-10 w-10 text-purple-500" />,
    title: "Create Short Video",
    description: "Turn your ideas into short, engaging videos.",
    link: "/app/video",
  },
  {
    icon: <Volume2 className="h-10 w-10 text-orange-500" />,
    title: "Text to Speech",
    description: "Convert written text into natural-sounding speech.",
    link: "/app/text-to-speech",
  },
  {
    icon: <MoreHorizontal className="h-10 w-10 text-gray-500" />,
    title: "And More",
    description: "Explore additional free AI tools and services.",
    link: "/app/more",
  },
];

export default function HomePage() {
  // Get the current locale from the pathname
  const pathname = usePathname();
  // Extract the locale (first segment after the slash)
  const locale = pathname.split("/")[1] || "";

  return (
    <div className="min-h-screen bg-background">
      <nav className="w-full py-4 px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">AI Bundler</span>
            <span className="text-xs font-bold">By Azespace.com</span>
          </div>
        </div>
        <LoginButtons></LoginButtons>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <section className="text-center space-y-6">
          <div className=" max-w-2xl mx-auto space-y-6">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight">
              All AI Models in one place just for you
            </h1>
            <p className="text-lg">
              Instantly access Chat, Image Generation, Video Creation, Text to
              Speech, and more. No limits. Just creativity and productivity,
              powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary text-white hover:bg-primary/90"
              >
                <Link href="#features">
                  Explore Features <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/app/chat`}>Try Chat Now</Link>
              </Button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap max-w-4xl mx-auto justify-center">
            {AI_MODELS.map((model) => {
              return (
                <div
                  key={model.name}
                  className="flex rounded-md bg-background3 px-4 py-2 gap-2"
                >
                  <img
                    src={model.logo}
                    alt={model.name}
                    width={20}
                    height={20}
                  />
                  <p className="font-bold">{model.name}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section id="features" className="mt-16 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-background2 rounded-xl shadow-xl p-6 flex flex-col items-center text-center transition hover:shadow-xl"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="mb-4">{feature.description}</p>
                <Button asChild variant="default">
                  <Link href={`${feature.link}`}>Try {feature.title}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm bg-white/70 mt-12">
        &copy; {new Date().getFullYear()} Open Free AI. All rights reserved.
      </footer>
    </div>
  );
}
