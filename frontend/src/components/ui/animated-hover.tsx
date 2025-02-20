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
      {buttons.map((button, index) => (
        <Link
          className={cn("relative group block", button.buttonClassName)}
          href="#"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-amber-500 bg-opacity-60 block  rounded-lg p-2"
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
          <div className="p-4">
            <Button className="relative z-50">{button.name}</Button>
          </div>
        </Link>
      ))}
    </motion.div>
  );
};

export default AnimatedHover;
