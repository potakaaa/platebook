import { LoginForm } from "@/components/authentication/login-form";
import HomeLogo from "@/components/navbar/nav/HomeLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Platebook",
  description:
    "Access your PlateBook account and connect with a vibrant community of food lovers. Log in to save recipes, share culinary creations, and explore AI-powered chatbot assistance.",
  keywords: [
    "login",
    "PlateBook",
    "food community",
    "recipe sharing",
    "cooking inspiration",
    "home cooks",
    "culinary network",
    "food lovers",
    "meal planning",
  ],
  icons: "/favicon.ico",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background/70 w-full p-6 md:p-10 h-[50rem] dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <section className="relative mb-5 flex justify-center w-full md:absolute md:top-7 md:left-10 md:justify-start md:w-auto">
        <HomeLogo />
      </section>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
