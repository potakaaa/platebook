"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import { useState } from "react";

const HomeLogo = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full max-w-fit"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant={"ghost"}
        className="px-0 mx-0 hover:bg-opacity-0 flex items-center justify-center gap-0"
        onClick={() => router.push("/")}
      >
        <Image
          src="/platebook-logo-png.png"
          alt={"Platebook"}
          width={100}
          height={100}
          className="object-fill aspect-auto size-7 flex items-center justify-center mb-2 shadow-sm"
        />
        <section className="flex font-black text-base sm:text-lg md:text-xl md:mx-2 xl:mx-4 lg:text-2xl">
          <h1 className="text-primary drop-shadow-sm">Plate</h1>
          <h1 className="drop-shadow-sm">Book</h1>
        </section>
      </Button>
      <motion.span
        className="w-full border border-amber-500 flex rounded-full"
        initial={{ opacity: 1, scaleX: 0 }}
        animate={{
          opacity: 1,
          scaleX: isHovered ? 1 : 0,
          transformOrigin: "left",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      ></motion.span>
    </motion.div>
  );
};

export default HomeLogo;
