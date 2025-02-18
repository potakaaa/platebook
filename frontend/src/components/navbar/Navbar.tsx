"use client";

import React, { JSX } from "react";
import HomeLogo from "./nav/HomeLogo";
import { Button } from "../ui/button";
import { AlignJustify, LogInIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { getNavButtons, navButtonStyles } from "./nav/NavButtons";
import Dropdown from "./nav/Dropdown";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-start w-full p-4 md:p-6 xl:p-7 transition-all duration-200">
      <HomeLogo />
      <section className="flex gap-2 sm:gap-4 items-center">
        <Button
          variant={"default"}
          className="h-8 sm:h-10 sm:w-24 shadow text-xs sm:text-sm"
          onClick={() => router.push("/login")}
        >
          <LogInIcon size={15} />
          <span>Log In</span>
        </Button>
        <div className="block lg:hidden">
          <Dropdown />
        </div>
      </section>
    </div>
  );
};

export default Navbar;
