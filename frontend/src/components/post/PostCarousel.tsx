"use client";

import React from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const PostCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel
      className="w-full rounded-lg shadow-md"
      transition={{ duration: 1 }}
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="sm"
          className="!absolute top-2/4 left-2 -translate-y-2/4"
          onClick={handlePrev}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <CircleArrowLeft className="size-7 drop-shadow-sm" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="sm"
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
          onClick={handleNext}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <CircleArrowRight className="size-7 drop-shadow-sm" />
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images.map((image, index) => (
        <Image
          src={image}
          alt={`image-${index}`}
          key={index}
          width={500}
          height={500}
        />
      ))}
    </Carousel>
  );
};

export default PostCarousel;
