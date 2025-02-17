import { LoginForm } from "@/components/authentication/login-form";
import HomeLogo from "@/components/navbar/nav/HomeLogo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted w-full p-6 md:p-10">
      <section className="relative mb-5 flex justify-center w-full max-w-sm md:max-w-3xl items-center drop-shadow-md">
        <HomeLogo />
      </section>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
