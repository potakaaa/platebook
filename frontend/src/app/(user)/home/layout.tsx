import LeftNav from "@/components/home/LeftNav";
import RightPlateList from "@/components/home/RightPlateList";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SpotlightNew />
      <div
        className={`w-full px-2 sm:px-10 md:px-2 xl:px-5 2xl:px-12 flex items-center justify-between 2xl:space-x-20`}
      >
        <section
          id="left-nav"
          className="sticky top-0 left-0 h-screen md:max-w-60 lg:max-w-52 xl:max-w-72 w-full z-30 px-5 py-10 border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-sm bg-secondary/20 flex-[1] hidden md:block"
        >
          <LeftNav />
        </section>
        <section
          id="feed"
          className="flex w-full max-w-screen-md lg:max-w-xl px-5 2xl:max-w-2xl justify-center items-center self-center flex-[2] "
        >
          {children}
        </section>
        <section
          id="right-platelist"
          className="sticky top-0 left-0 h-screen lg:max-w-72 xl:max-w-sm w-full z-30 px-5 py-10  border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-sm bg-secondary/20 flex-none lg:flex-[1] hidden lg:block"
        >
          <RightPlateList />
        </section>
        <FloatingNavbar />
      </div>
    </>
  );
};

export default layout;
