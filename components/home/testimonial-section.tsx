import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "LinkPro helped me land my dream job. The AI cover letter generator is a game-changer!",
    name: "Sarah Johnson",
    title: "UX Designer",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote:
      "I've tried other profile platforms, but LinkPro stands out with its professional design and features.",
    name: "Michael Rodriguez",
    title: "Software Engineer",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote:
      "The ability to showcase my projects visually alongside my experience makes LinkPro perfect for my portfolio.",
    name: "Emily Chen",
    title: "Graphic Designer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">
            Hear from professionals who have transformed their online presence
            with LinkPro.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="relative mb-2">
                  <div className="absolute -top-1 -left-1 text-4xl text-primary opacity-30">
                    &quot;
                  </div>
                  <p className="text-foreground/80 relative z-10 italic">
                    {testimonial.quote}
                  </p>
                  <div className="absolute -bottom-6 -right-1 text-4xl text-primary opacity-30">
                    &quot;
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-border flex items-center flex-col">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
