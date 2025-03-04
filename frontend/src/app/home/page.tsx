import PostCard, { PostCardProps } from "@/components/cards/PostCard";
import HomeImageSlider from "@/components/home/HomeImageSlider";
import InfiniteScrollComp from "@/components/home/InfiniteScroll";
import SearchBar from "@/components/home/SearchBar";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import UserNav from "@/components/navbar/UserNav";
import { SpotlightNew } from "@/components/ui/spotlight-new";

const page = () => {
  return (
    <div className="flex flex-row w-full justify-center items-center bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* <UserNav /> */}

      <div className="flex flex-row w-full justify-center items-start min-h-screen overflow-y-auto">
        <section
          id="feed"
          className="flex flex-col w-full z-30 py-4 sm:py-7 md:py-10 overflow-y-auto gap-5"
        >
          <section id="search" className="mb-5 w-full">
            <SearchBar />
          </section>

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
            <InfiniteScrollComp />
          </section>
        </section>
      </div>

      <FloatingNavbar />
    </div>
  );
};

export default page;