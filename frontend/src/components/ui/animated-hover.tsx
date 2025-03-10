"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type buttonType = {
  name: string;
  onClick?: () => void;
  buttonClassName: string;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost";
};

const AnimatedHover = ({
  buttons,
  className,
}: {
  buttons: buttonType[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <motion.div className="flex gap-3">
      {buttons.map((button, index) => {
        const { variant = "default" } = button;

        return (
          <Link
            key={index}
            className={cn("relative group block")}
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default page refresh
              if (button.onClick) button.onClick(); // Execute the button's function
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-r from-secondary bg-opacity-60 block  rounded-lg p-2 shadow"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="p-1">
              <Button
                className={cn(
                  "relative z-50 hover:bg-transparent hover:text-primary transition duration-300",
                  button.buttonClassName
                )}
                variant={variant}
                onClick={button.onClick}
              >
                {button.name}
              </Button>
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default AnimatedHover;
