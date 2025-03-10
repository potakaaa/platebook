"use client";

import HomeLogo from "@/components/navbar/nav/HomeLogo";
import { Button } from "@/components/ui/button";
import { IconError404 } from "@tabler/icons-react";
import React from "react";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-16">
      <HomeLogo />
      <div className="flex flex-col items-center justify-center">
        <IconError404 className="size-20 text-primary drop-shadow-md" />
        <h1 className="text-2xl font-semibold text-secondary-foreground">
          Page Not Found
        </h1>
        <p className="text-sm font-normal">Click the Home Logo to go back</p>
      </div>
    </div>
  );
};

export default GlobalError;
