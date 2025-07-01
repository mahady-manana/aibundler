import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/UserContext";
import { routing } from "@/i18n/routing";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import "../globals.css";

export const metadata: Metadata = {
  title: "AI Bundler - All AI models in one place by Azespace.com",
  description:
    "Choose and use any AI model that make your work smother than ever",
};

const fonts = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  variable: "--font-main",
  display: "swap",
});
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Check if we're on the landing page
  const isLandingPage = false; // You can implement your own logic here

  // <body className={`${roboto.variable} bg-neutral`}>
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`bg-neutral ${fonts.className} text-neutral`}>
        <NextIntlClientProvider>
          <UserProvider>
            <GoogleOAuthProvider clientId="950843751967-nvq90gro6el4l72smsotasok08cdn60v.apps.googleusercontent.com">
              <ThemeProvider attribute="class" defaultTheme="system">
                {children}
                <Toaster />
              </ThemeProvider>
            </GoogleOAuthProvider>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
