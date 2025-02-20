"use client";

import React, { JSX } from "react";
import HomeLogo from "./nav/HomeLogo";
import { Button } from "../ui/button";
import { AlignJustify, LogInIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { getNavButtons } from "./nav/NavButtons";
import Dropdown from "./nav/Dropdown";
import { ButtonBorder } from "../ui/moving-border";
import AnimatedHover, { buttonType } from "../ui/animated-hover";

const Navbar = () => {
  const router = useRouter();

  const navButtons: buttonType[] = [
    {
      name: "Search Recipe",
      onClick: () => router.push("/search-recipe"),
      buttonClassName: "bg-transparent",
      variant: "ghost",
    },
    {
      name: "About Us",
      onClick: () => router.push("/about"),
      buttonClassName: "bg-transparent",
      variant: "ghost",
    },
    {
      name: "Help",
      onClick: () => router.push("/help"),
      buttonClassName: "bg-transparent",
      variant: "ghost",
    },
    {
      name: "Sign Up",
      onClick: () => router.push("/signup"),
      buttonClassName: "hover:text-primary border-primary hover:bg-transparent",
      variant: "outline",
    },
  ];

  return (
    <div className="flex justify-between items-start w-full p-4 md:p-6 xl:p-7 transition-all duration-200">
      <HomeLogo />
      <section className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
        <div className="hidden lg:block space-x-3">
          <AnimatedHover buttons={navButtons} className="" />
        </div>
        <ButtonBorder
          containerClassName="h-8 sm:h-9 w-24 sm:w-28"
          borderRadius="0.5rem"
          className="gap-2 text-xs sm:text-sm bg-primary border-none"
          onClick={() => router.push("/login")}
        >
          <LogInIcon size={15} />
          <span>Log In</span>
        </ButtonBorder>
        <div className="block lg:hidden">
          <Dropdown />
        </div>
      </section>
    </div>
  );
};

export default Navbar;
