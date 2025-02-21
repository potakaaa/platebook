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
      className="w-full max-w-fit flex items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant={"ghost"}
        className="px-0 mx-0 hover:bg-opacity-0 flex items-center justify-center gap-1 sm:gap-2 md:gap-1 xl:gap-0 z-10"
        onClick={() => router.push("/")}
      >
        <Image
          src="/platebook-logo-png.png"
          alt={"Platebook"}
          width={100}
          height={100}
          className="object-fill aspect-auto size-6 flex items-center justify-center mb-2 shadow-sm z-10"
        />
        <section className="relative flex font-black text-base sm:text-lg md:text-xl md:mx-2 xl:mx-4 lg:text-2xl z-10 ">
          <h1 className="text-primary drop-shadow-sm">Plate</h1>
          <h1 className="drop-shadow-sm">Book</h1>
        </section>
      </Button>
      <motion.span
        className="w-32 h-10 inset-3 sm:w-36 md:w-[165px] md:inset-4 md:h-[45px] lg:w-[180px] xl:inset-4 xl:w-[188px] 2xl:w-48 2xl:h-12 bg-gradient-to-r from-secondary shadow flex rounded-lg absolute  z-0"
        initial={{ opacity: 0, scaleX: 0 }}
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
