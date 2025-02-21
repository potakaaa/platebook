import PostCard from "@/components/cards/PostCard";
import SearchInput from "@/components/hero/SearchInput";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import Navbar from "@/components/navbar/Navbar";
import AnimatedHover, { buttonType } from "@/components/ui/animated-hover";
import { LinkPreview } from "@/components/ui/link-preview";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React from "react";

const LandingPage = () => {
  return (
    <div className="w-full">
      <section className="absolute top-0 left-0 w-full">
        <Navbar />
        <div className="flex-grow" />{" "}
        {/* This ensures content can fill the space above */}
      </section>
      <div className="flex flex-col items-center justify-center mx-28 my-5">
        <section id="hero" className="flex flex-row justify-around w-full ">
          <section id="left" className="flex flex-col space-y-3 py-10">
            <section className="font-bold break-words text-7xl">
              <h1>Eat. Cook</h1>
              <LinkPreview
                url="https://github.com/potakaaa"
                className="text-primary"
              >
                Platebook.
              </LinkPreview>
              <h1>Repeat.</h1>
            </section>
            <p className="w-full max-w-md ml-1">
              Discover, share, and savor recipes from around the world—one plate
              at a time.
            </p>
            <div className="py-5">
              <SearchInput />
            </div>
          </section>

          <section
            id="right"
            className="w-full max-w-lg relative flex justify-center"
          >
            <div className="w-full h-fit">
              <PostCard />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
