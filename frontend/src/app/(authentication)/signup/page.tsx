import { SignUpForm } from "@/components/authentication/signup-form";
import HomeLogo from "@/components/navbar/nav/HomeLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - PlateBook",
  description:
    "Join PlateBook today and be part of a thriving community of food lovers. Sign up to share recipes, discover new dishes, and get AI-powered chatbot assistance.",
  keywords: [
    "sign up",
    "PlateBook",
    "create account",
    "food community",
    "recipe sharing",
    "home cooking",
    "culinary network",
    "food lovers",
    "meal ideas",
  ],
  icons: "/favicon.ico",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background/70 w-full p-6 md:p-10 h-[50rem] dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <section className="relative mb-5 flex justify-center w-full md:absolute md:top-7 md:left-10 md:justify-start md:w-auto">
        <HomeLogo />
      </section>
      <div className="w-full max-w-sm md:max-w-3xl mt-7">
        <SignUpForm />
      </div>
    </div>
  );
}
