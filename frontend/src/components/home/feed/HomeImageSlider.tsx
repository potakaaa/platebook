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
                    src={image.image}
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
    image: "https://i.ytimg.com/vi/sYsqi4uS2SE/maxresdefault.jpg",
  },
  {
    title: "Sinigang na Baboy",
    description: "Tangy pork soup with tamarind and vegetables.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqADB-XBjogZSkI6OeQ5EcjlBCMcyJ7HyM4xOKo-DjKff5jE2NGwReGIHZOnJDPJrqHcqXOIXXEBox2WN8rqBEzyvklXa-nJrNB5FVa_Tsnh-1xPBjZekdOaNYCcuGOKmYba4WsGzFpw/w1200-h630-p-k-no-nu/pork+sinigang+na+baboy.jpg",
  },
  {
    title: "Lechon Kawali",
    description: "Crispy pork belly with a savory dipping sauce.",
    image:
      "https://www.seriouseats.com/thmb/orl1xkPajYxzsOZwkooPtdYvM-M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210508-lechon-kawali-melissa-hom-2-inchChunks-seriouseats-1d53c12cee234305b921362e2106bf29.jpg",
  },
];
