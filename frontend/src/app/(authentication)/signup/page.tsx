import { SignUpForm } from "@/components/authentication/signup-form";
import HomeLogo from "@/components/navbar/nav/HomeLogo";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted w-full p-6 md:p-10">
      <section className="relative mb-5 flex justify-center w-full md:absolute md:top-7 md:left-10 md:justify-start md:w-auto">
        <HomeLogo />
      </section>
      <div className="w-full max-w-sm md:max-w-3xl mt-7">
        <SignUpForm />
      </div>
    </div>
  );
}
