"use client";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";

const HomeImageSlider = () => {
  return (
    <div className="size-full py-3">
      <AspectRatio ratio={10 / 3} className="justify-start">
        <Carousel
          className="size-full max-w-lg"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="">
            {images.map((image, index) => (
              <CarouselItem key={index} className="">
                <Card className="w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <CardContent className="p-0 ">
                    <AspectRatio ratio={10 / 4}>
                      <Image
                        src={
                          "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg"
                        }
                        alt="Home Cover Photo"
                        fill
                        className="rounded-xl shadow-lg object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute bottom-12 right-3 z-30 drop-shadow-md">
                      <p className="font-semibold text-white/90 dark:text-secondary-foreground/80 flex">
                        {image.title}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-3  w-52 text-right z-20">
                      <p className="font-light text-xs text-white/90 dark:text-secondary-foreground/80 drop-shadow-md ">
                        {image.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </AspectRatio>
    </div>
  );
};

export default HomeImageSlider;

const images = [
  {
    title: "Adobo",
    description: "Tender pork or chicken in a savory marinade.",
    image: "image_1_url",
  },
  {
    title: "Sinigang na Baboy",
    description: "Tangy pork soup with tamarind and vegetables.",
    image: "image_2_url",
  },
  {
    title: "Lechon Kawali",
    description: "Crispy pork belly with a savory dipping sauce.",
    image: "image_3_url",
  },
];
