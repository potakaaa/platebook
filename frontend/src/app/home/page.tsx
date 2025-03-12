import FeedChoice from "@/components/home/feed/FeedChoice";
import HomeImageSlider from "@/components/home/feed/HomeImageSlider";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - PlateBook",
  description:
    "Discover and share mouthwatering recipes on PlateBook's vibrant feed. Engage with a community of food lovers, save your favorite dishes, and get inspired by home cooks worldwide.",
  keywords: [
    "PlateBook",
    "recipe feed",
    "food community",
    "cooking inspiration",
    "home cooking",
    "food lovers",
    "recipe sharing",
    "culinary creations",
    "AI chatbot assistant",
    "meal ideas",
    "food photography",
  ],
  icons: "/favicon.ico",
};

const page = () => {
  return (
    <div className="flex flex-row w-full justify-center items-center bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="flex flex-row w-full justify-center items-start min-h-screen overflow-y-auto">
        <section
          id="feed"
          className="flex flex-col w-full z-30 py-4 sm:py-7 md:py-10 overflow-y-auto gap-2"
        >
          <section
            id="header"
            className="flex w-full flex-col justify-center items-center self-center space-y-4 z-10 "
          >
            <div className="flex w-full justify-start flex-col space-y-1 ">
              <h1 className="text-primary text-xl sm:text-2xl lg:text-3xl font-bold text-left">
                Want to Cook Something?
              </h1>
              <p className="text-foreground text-xs sm:text-sm lg:text-base text-left">
                Discover delicious recipes here!
              </p>
              <HomeImageSlider />
            </div>
          </section>
          <section
            id="posts"
            className="flex flex-col justify-center self-center w-full"
          >
            <FeedChoice />
          </section>
        </section>
      </div>

      <FloatingNavbar />
    </div>
  );
};

export default page;
