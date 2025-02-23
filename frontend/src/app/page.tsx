import PostCard, { PostCardProps } from "@/components/cards/PostCard";
import HoverMe from "@/components/hero/HoverMe";
import SearchInput from "@/components/hero/SearchInput";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import Navbar from "@/components/navbar/Navbar";
import AnimatedHover, { buttonType } from "@/components/ui/animated-hover";
import { LinkPreview } from "@/components/ui/link-preview";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion } from "framer-motion";
import { ArrowDown01 } from "lucide-react";
import React from "react";

const samplePost: PostCardProps = {
  userImage: "https://avatars.githubusercontent.com/u/111859181?v=4",
  userName: "Potakaaa",
  title: "Adobong Kare Kare Pinoy Style",
  description:
    "A delicious Filipino dish that combines the flavors of adobo and kare kare.",
  image1:
    "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-09-kare-kare%2Fkare-kare-3458",
  image2:
    "https://www.rappler.com/tachyon/2022/04/Bagnet-Kare-kare.jpg?fit=1024%2C720",
};

const LandingPage = () => {
  return (
    <div className="w-full">
      <section className="absolute inset-0 w-full">
        <Navbar />
        <div className="flex-grow" />{" "}
        {/* This ensures content can fill the space above */}
      </section>
      <div className="flex flex-col items-center justify-center mx-7 lg:mx-16 xl:mx-28 2xl:mx-52 my-5">
        <section
          id="hero"
          className="flex flex-col my-10 lg:my-0 lg:flex-row  justify-around w-full "
        >
          <section
            id="left"
            className="flex flex-col w-full space-y-3 lg:space-y-6 pt-10 pb-5 lg:py-20 justify-center items-center lg:items-start lg:justify-normal"
          >
            <section className="font-bold text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left z-10">
              <h1>Eat. Cook</h1>
              <LinkPreview
                url="https://github.com/potakaaa"
                className="text-primary dark:text-primary"
              >
                Platebook.
              </LinkPreview>
              <h1>Repeat.</h1>
            </section>
            <p className="w-full max-w-sm flex justify-center break-words lg:max-w-md ml-0 lg:ml-1 text-center lg:text-left">
              Discover, share, and savor recipes from around the world—one plate
              at a time.
            </p>
            <div className="py-5 max-w-xs sm:max-w-sm lg:max-w-sm xl:max-w-md w-full">
              <SearchInput />
            </div>
          </section>

          <section
            id="right"
            className="w-full sm:max-w-none lg:max-w-none relative flex justify-center"
          >
            <div className="flex flex-col w-full h-fit items-center justify-center">
              <HoverMe />
              <PostCard postItems={samplePost} />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
