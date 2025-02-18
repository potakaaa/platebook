"use client";

import React, { JSX } from "react";
import HomeLogo from "./nav/HomeLogo";
import { Button } from "../ui/button";
import { AlignJustify, LogInIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { getNavButtons } from "./nav/NavButtons";
import Dropdown from "./nav/Dropdown";
import { ButtonBorder } from "../ui/moving-border";

const Navbar = () => {
  const router = useRouter();
  const navButtons = getNavButtons(router);

  return (
    <div className="flex justify-between items-start w-full p-4 md:p-6 xl:p-7 transition-all duration-200">
      <HomeLogo />
      <section className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
        <div className="hidden lg:block space-x-3">
          <Button variant={"ghost"}>Search Recipe</Button>
          <Button variant={"ghost"}>About Us</Button>
          <Button variant={"ghost"}>Help</Button>
          <Button
            variant={"outline"}
            className="border-primary text-primary"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
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
