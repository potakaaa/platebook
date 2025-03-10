"use client";
import React from "react";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../../ui/card";

const HomeImageSlider = () => {
  return (
    <div className="size-full py-3 lg:py-6 xl:py-8">
      <Carousel
        className="size-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="">
              <Card className="w-full relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <CardContent className="p-0 w-full">
                  <Image
                    src={
                      "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg"
                    }
                    alt="Home Cover Photo"
                    priority
                    width={500}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-[10/3] lg:aspect-[10/4] w-full"
                  />

                  <div className="absolute bottom-12 md:bottom-14 right-3 z-30 drop-shadow-md">
                    <p className="font-semibold text-white/90 dark:text-secondary-foreground/85 flex md:text-xl xl:text-3xl">
                      {image.title}
                    </p>
                  </div>
                  <div className="absolute bottom-4 xl:bottom-8 right-3  w-52 md:w-72 xl:w-96 text-right z-20">
                    <p className="font-light text-xs text-white/90 dark:text-secondary-foreground/80 drop-shadow-md md:text-base md:leading-tight">
                      {image.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeImageSlider;

const images = [
  {
    title: "Adobong Manok",
    description: "Tender chicken in a savory marinade.",
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
