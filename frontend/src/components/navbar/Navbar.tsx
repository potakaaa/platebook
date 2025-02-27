"use client";

import React, { JSX, useState } from "react";
import HomeLogo from "./nav/HomeLogo";
import { Button } from "../ui/button";
import { AlignJustify, LogInIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { getNavButtons } from "./nav/NavButtons";
import Dropdown from "./nav/Dropdown";
import { ButtonBorder } from "../ui/moving-border";
import AnimatedHover, { buttonType } from "../ui/animated-hover";
import { ModeToggle } from "../ui/mode-toggle";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Listen for scrollY changes and update state
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

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
      buttonClassName:
        "hover:text-primary border-primary hover:bg-transparent dark:bg-transparent transition duration-200",
      variant: "outline",
    },
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 w-full flex justify-between items-start p-4 md:p-6 md:py-5 xl:p-7 xl:py-5 2xl:px-10 transition-all duration-200 z-50 bg-white dark:bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-30`}
    >
      <section className="mt-0 sm:mt-1">
        <HomeLogo />
      </section>
      <section className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
        <ModeToggle />
        <div className="hidden lg:block space-x-3">
          <AnimatedHover buttons={navButtons} className="" />
        </div>
        <ButtonBorder
          containerClassName="h-9 sm:h-10 w-24 sm:w-28"
          borderRadius="0.5rem"
          className="gap-2 text-xs sm:text-sm bg-primary border-none transition duration-300 hover:bg-amber-500"
          onClick={() => router.push("/login")}
        >
          <LogInIcon size={15} />
          <span>Log In</span>
        </ButtonBorder>
        <div className="block lg:hidden">
          <Dropdown />
        </div>
      </section>
    </motion.div>
  );
};

export default Navbar;
