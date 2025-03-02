"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputAnimated } from "@/components/ui/input-animated";
import { Label } from "@/components/ui/label";
import SideImage from "./side-image";
import Link from "next/link";
import { LabelInputContainer } from "../ui/label-input-container";
import OauthButtons from "./oauth-buttons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ForgetForm from "./forget-form";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [isForgetPass, setIsForgetPass] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      loginForm.clearErrors();

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        router.push("/home");
      } else {
        console.error("Login failed:", response?.error);
      }

      console.log("Login Response:", response);

      if (response?.error) {
        let errorMessage = response.error;
        try {
          const errorData = JSON.parse(response.error);
          console.log("Parsed Error Data:", errorData);

          Object.keys(errorData).forEach((key) => {
            if (key in data) {
              loginForm.setError(
                key as "email" | "password" | `root.${string}` | "root",
                {
                  type: "server",
                  message: errorData[key][0],
                }
              );
            }
          });

          if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors[0];
          }
        } catch {
          errorMessage = response.error;
        }

        loginForm.setError("root", { type: "server", message: errorMessage });
        return;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      loginForm.setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          {!isForgetPass ? (
            <Form {...loginForm}>
              <form
                noValidate
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="p-6 md:p-8 z-30"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center z-20">
                    <h1 className="text-2xl font-bold">Welcome!</h1>
                    <p className="text-balance text-muted-foreground text-sm md:text-base">
                      Login to your Platebook account
                    </p>
                  </div>

                  {loginForm.formState.errors.root && (
                    <p className="text-destructive text-sm text-center">
                      {loginForm.formState.errors.root.message}
                    </p>
                  )}

                  <FormItem>
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <LabelInputContainer>
                          <Label htmlFor="email">Email</Label>
                          <FormControl>
                            <InputAnimated
                              id="email"
                              type="email"
                              placeholder="platebook@example.com"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </LabelInputContainer>
                      )}
                    />
                  </FormItem>

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <LabelInputContainer>
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <button
                              className="ml-auto text-[11px] underline-offset-2 hover:underline"
                              onClick={() => {
                                setIsForgetPass(true);
                              }}
                            >
                              Forgot your password?
                            </button>
                          </div>
                          <FormControl>
                            <InputAnimated
                              id="password"
                              type="password"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </LabelInputContainer>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 px-2 text-muted-foreground bg-background">
                      Or continue with
                    </span>
                  </div>
                  <OauthButtons />

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          ) : (
            <ForgetForm />
          )}
          <SideImage />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
