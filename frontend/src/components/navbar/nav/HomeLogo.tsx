"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const HomeLogo = ({
  buttonCN = "",
  logoCN = "",
  textCN = "",
}: {
  buttonCN?: string;
  logoCN?: string;
  textCN?: string;
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full flex items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant={"ghost"}
        className={cn(
          "px-0 mx-0 hover:bg-opacity-0 flex items-center justify-center gap-1 sm:gap-2 md:gap-1 xl:gap-0 z-10 relative",
          buttonCN
        )}
        onClick={() => router.push("/")}
      >
        <motion.span
          className="size-full bg-gradient-to-r from-secondary shadow flex rounded-lg absolute z-0 p-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: 1,
            scaleX: isHovered ? 1 : 0,
            transformOrigin: "left",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        />
        {/* <Image
          src="/platebook-logo-png.png"
          alt={"Platebook"}
          width={100}
          height={100}
          className="object-fill aspect-auto size-6 flex items-center justify-center mb-2 shadow-sm z-10"
        /> */}

        <section
          className={cn(
            `relative flex font-black text-base sm:text-lg md:text-xl mx-1 md:mx-2 xl:mx-4 lg:text-2xl z-10`,
            textCN
          )}
        >
          <Image
            src="/platebook-logo-500.png"
            alt="platebook"
            width={100}
            height={100}
            className={cn("size-7 z-30 mr-3", logoCN)}
          />
          <h1 className="text-primary drop-shadow-sm hidden sm:block">Plate</h1>
          <h1 className="drop-shadow-sm text-foreground hidden sm:block">
            Book
          </h1>
        </section>
      </Button>
    </motion.div>
  );
};

export default HomeLogo;
