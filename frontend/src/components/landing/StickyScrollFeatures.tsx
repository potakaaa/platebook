import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { SpotlightNew } from "../ui/spotlight-new";
import { cn } from "@/lib/utils";

const StickyScrollFeatures = ({
  id,
  imageUrl,
  desc,
  containerClassName,
}: {
  id: number;
  imageUrl: string;
  desc: string;
  containerClassName?: string;
}) => {
  return (
    <div
      id={`sticky-feature-container-${id}`}
      className={cn(
        "sticky top-0 w-full max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-3xl sm:space-x-5 justify-center items-center flex flex-col space-y-5 sm:space-y-0 p-3 py-5 sm:h-52 md:h-",
        containerClassName
      )}
    >
      <div className="absolute inset-0 bg-background backdrop-filter z-0 rounded-xl shadow-[0px_0px_34px_0px_rgba(255,140,46,0.2)] overflow-hidden">
        <SpotlightNew />
      </div>

      <div className="w-full h-full relative">
        {/* 16:9 Aspect Ratio for small screens */}
        <div className="w-full relative pt-[56.25%] sm:hidden">
          <Image
            src={imageUrl}
            fill
            alt={`Feature ${id}`}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg z-10"
          />
        </div>

        {/* Fixed height for sm and larger */}
        <div className="hidden sm:flex w-full h-full relative">
          <Image
            src={imageUrl}
            fill
            alt={`Feature ${id}`}
            className="size-full object-cover rounded-lg shadow-lg z-10"
          />
        </div>
      </div>

      <span className="text-sm text-center justify-center w-full z-10">
        {desc}
      </span>
    </div>
  );
};

export default StickyScrollFeatures;
