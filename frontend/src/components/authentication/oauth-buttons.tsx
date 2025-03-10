"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  IconBrandAppleFilled,
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
  IconBrandX,
} from "@tabler/icons-react";
import { BottomGradient } from "../ui/bottom-gradient";
import { signIn } from "next-auth/react";
import { sign } from "crypto";
import { useRouter } from "next/router";

const OauthButtons = () => {

  const router = useRouter();

  const handleSignIn = async (provider: string) => {
    try {
      const response = await signIn(provider, {
        callbackUrl: "/home",
        redirect: false, 
      });

      if (response?.ok) {
        router.push("/home"); 
      } else {
        console.error("Login failed:", response?.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full relative group/btn dark:bg-transparent"
        type="button"
        onClick={() => handleSignIn("discord")}
      >
        <IconBrandDiscordFilled size={24} />
        <span className="sr-only">Login with Discord</span>
        <BottomGradient />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full relative group/btn dark:bg-transparent"
        onClick={() => handleSignIn("google")}
      >
        <IconBrandGoogleFilled size={24} />
        <span className="sr-only">Login with Google</span>
        <BottomGradient />
      </Button>
    </div>
  );
};

export default OauthButtons;
