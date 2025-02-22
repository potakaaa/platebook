"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowDown01,
  ArrowDownFromLine,
  ArrowDownIcon,
} from "lucide-react";

const HoverMe = () => {
  return (
    <motion.div
      className="flex flex-col-reverse items-center space-y-1 mb-4"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            staggerChildren: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
      >
        <ArrowDownIcon className="size-4 drop-shadow-md" />
      </motion.span>
      <motion.span
        className="text-sm font-normal"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          },
        }}
      >
        Hover me!
      </motion.span>
    </motion.div>
  );
};

export default HoverMe;
