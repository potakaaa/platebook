import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

const StickyScrollFeatures = ({
  id,
  imageUrl,
  desc,
}: {
  id: number;
  imageUrl: string;
  desc: string;
}) => {
  return (
    <div
      id={`sticky-feature-container-${id}`}
      className="sticky top-0 w-full max-w-sm justify-center items-center flex flex-col space-y-5 p-3"
    >
      <div className="absolute inset-0 bg-card z-0 rounded-xl shadow-[0px_0px_34px_0px_rgba(255,140,46,0.1)]"></div>
      <AspectRatio ratio={16 / 9} className="w-full">
        <Image
          src={imageUrl}
          fill
          alt={`Feature ${id}`}
          className="object-cover w-full rounded-lg shadow-lg z-10"
        />
      </AspectRatio>
      <span className="text-sm text-center justify-center w-full z-10">
        {desc}
      </span>
    </div>
  );
};

export default StickyScrollFeatures;
