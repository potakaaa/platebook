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


const OauthButtons = () => {


  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full relative group/btn dark:bg-transparent"
        type="button"
        onClick={() => signIn("discord", { callbackUrl: "/home" })}
      >
        <IconBrandDiscordFilled size={24} />
        <span className="sr-only">Login with Discord</span>
        <BottomGradient />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full relative group/btn dark:bg-transparent"
        onClick={() => signIn("google", { callbackUrl: "/home" })}
      >
        <IconBrandGoogleFilled size={24} />
        <span className="sr-only">Login with Google</span>
        <BottomGradient />
      </Button>
    </div>
  );
};

export default OauthButtons;
