"use client";
import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PlateImageCarousel = ({
  images,
  title,
  desc,
}: {
  images: string[];
  title: string;
  desc: string;
}) => {
  return (
    <div className="size-full">
      <Carousel
        className="size-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {images.map((_, index) => (
            <CarouselItem key={index} className="">
              <Card className="w-full relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <CardContent className="p-0 w-full">
                  <Image
                    src={images[index]}
                    alt="Home Cover Photo"
                    priority
                    width={500}
                    height={500}
                    className="rounded-xl shadow-lg object-cover aspect-[16/9]  w-full"
                  />

                  <section
                    id="title+desc"
                    className="absolute bottom-5 right-3 flex flex-col"
                  >
                    <div className="flex justify-end  z-30 drop-shadow-md">
                      <p className="font-semibold text-white/90 dark:text-secondary-foreground/85 flex md:text-xl xl:text-3xl text-right">
                        {title}
                      </p>
                    </div>
                    <div className="w-52 md:w-72 xl:w-96 text-right z-20">
                      <p className="font-light text-xs text-white/90 dark:text-secondary-foreground/80 drop-shadow-md md:text-base md:leading-tight justify-start self-start line-clamp-2">
                        {desc}
                      </p>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PlateImageCarousel;
