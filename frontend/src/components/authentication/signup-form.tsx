"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SideImage from "./side-image";
import Link from "next/link";
import { LabelInputContainer } from "../ui/label-input-container";
import { Apple, AppleIcon } from "lucide-react";
import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
  IconBrandX,
} from "@tabler/icons-react";
import { BottomGradient } from "../ui/bottom-gradient";
import { BottomGradientPrimary } from "../ui/bottom-gradient-primary";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-balance text-muted-foreground text-sm md:text-base">
                  Login to your Platebook account
                </p>
              </div>
              <LabelInputContainer>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="platebook@example.com"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="platebook123"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </LabelInputContainer>
              <Button type="submit" className="w-full relative group/btn">
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full relative group/btn">
                  <IconBrandAppleFilled size={24} />
                  <span className="sr-only">Login with Apple</span>
                  <BottomGradient />
                </Button>
                <Button variant="outline" className="w-full relative group/btn">
                  <IconBrandGoogleFilled size={24} />
                  <span className="sr-only">Login with Google</span>
                  <BottomGradient />
                </Button>
                <Button variant="outline" className="w-full relative group/btn">
                  <IconBrandX size={24} />
                  <span className="sr-only">Login with X</span>
                  <BottomGradient />
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Log In
                </Link>
              </div>
            </div>
          </form>
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
