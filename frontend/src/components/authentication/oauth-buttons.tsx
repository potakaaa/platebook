"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
  IconBrandX,
} from "@tabler/icons-react";
import { BottomGradient } from "../ui/bottom-gradient";
import { signIn } from "next-auth/react";
import { sign } from "crypto";

const OauthButtons = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="w-full relative group/btn dark:bg-transparent"
        type="button"
      >
        <IconBrandAppleFilled size={24} />
        <span className="sr-only">Login with Apple</span>
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
