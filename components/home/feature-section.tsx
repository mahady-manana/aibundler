import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Edit3, Link, Shield, FileText, User } from 'lucide-react';

const features = [
  {
    icon: <User className="h-10 w-10 text-blue-500" />,
    title: 'Professional Profile',
    description: 'Create a comprehensive professional profile with your experience, skills, and projects.'
  },
  {
    icon: <Link className="h-10 w-10 text-blue-500" />,
    title: 'Shareable Link',
    description: 'Get a unique URL to share your profile with potential employers and your network.'
  },
  {
    icon: <Edit3 className="h-10 w-10 text-blue-500" />,
    title: 'Easy Editing',
    description: 'Update your profile anytime with our intuitive editor interface.'
  },
  {
    icon: <Briefcase className="h-10 w-10 text-blue-500" />,
    title: 'Showcase Experience',
    description: 'Display your work history, education, and professional achievements.'
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-500" />,
    title: 'AI Cover Letters',
    description: 'Generate tailored cover letters with AI to match job descriptions.'
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: 'Secure & Private',
    description: 'Control what information is visible to the public and what remains private.'
  }
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need</h2>
          <p className="text-muted-foreground">
            LinkPro offers all the essential tools to create a standout professional presence online.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}