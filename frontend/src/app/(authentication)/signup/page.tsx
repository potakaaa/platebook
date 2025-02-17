import { SignUpForm } from "@/components/authentication/signup-form";
import HomeLogo from "@/components/navbar/nav/HomeLogo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted w-full p-6 md:p-10">
      <section className="fixed top-5 left-10 m-2">
        <HomeLogo />
      </section>
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignUpForm />
      </div>
    </div>
  );
}
