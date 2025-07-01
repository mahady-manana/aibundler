import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-background to-muted">
      <div className="container px-4 md:px-6 py-10 rounded-md">
        <div className="flex flex-col items-center space-y-10 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter animate-fade-in">
              Boost your career opportunities with
              <span className="text-primary"> a smart profile </span>
              built for success
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[550px] mx-auto">
              Showcase your skills, highlight your value — share your profile
              and get more opportunities.
            </p>
          </div>
          <div className="flex sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <Link href="/app/register">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pro/demo">View Demo</Link>
            </Button>
          </div>
          <div className="sm:flex gap-2 text-gray-500">
            <p className="bg-neutral py-1 px-2 rounded-md">
              ⚡ 10× visibility & trust
            </p>
            <p className="bg-neutral py-1 px-2 rounded-md">
              🧩 Highlight your value
            </p>

            <p className="bg-neutral py-1 px-2 rounded-md">
              🌍 Share your one profile link
            </p>
            <p className="bg-neutral py-1 px-2 rounded-md">
              ✍️ Get more opportunities
            </p>
          </div>
          <div className="relative w-full max-w-4xl mt-8 rounded-lg overflow-hidden shadow-2xl border border-border">
            <img
              src="/images/linkpro.png"
              alt="LinkPro Profile Example"
              className="w-full h-auto object-fit"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
