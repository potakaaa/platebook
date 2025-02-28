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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SignUpFormData } from "@/lib/types/authTypes";
import { signUp } from "@/lib/services/api/accountServices";

const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, "Email is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password1: z.string().min(8, "Password must be at least 8 characters"),
    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password1: "",
      password2: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Submitting data:", data);

    try {
      const response = await signUp(data);

      form.reset();

      router.push("/login");
    } catch (error: any) {
      Object.entries(error).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          form.setError(key as keyof SignUpFormData, {
            type: "server",
            message: value.join(" • "),
          });
        }
      });

      if (error.non_field_errors) {
        form.setError("root", {
          type: "server",
          message: error.non_field_errors.join(" • "),
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 z-30"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center z-20">
                  <h1 className="text-2xl font-bold">Welcome!</h1>
                  <p className="text-balance text-muted-foreground text-sm md:text-base">
                    Login to your Platebook account
                  </p>
                </div>

                {form.formState.errors.root && (
                  <p className="text-destructive-500 text-sm text-center">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="email">Email</Label>
                        <FormControl>
                          <InputAnimated
                            id="email"
                            type="email"
                            placeholder="platebook@example.com"
                            {...field}
                          />
                        </FormControl>
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="username">Username</Label>
                        <FormControl>
                          <InputAnimated
                            id="username"
                            type="text"
                            placeholder="platebook123"
                            {...field}
                          />
                        </FormControl>
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password1"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="password">Password</Label>
                        <FormControl>
                          <InputAnimated
                            id="password"
                            type="password"
                            required
                            {...field}
                          />
                        </FormControl>
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <FormControl>
                          <InputAnimated
                            id="confirm-password"
                            type="password"
                            required
                            {...field}
                          />
                        </FormControl>
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full relative group/btn">
                  Sign Up
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
                <OauthButtons />
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
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
