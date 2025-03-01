import LeftNav from "@/components/home/LeftNav";
import RightPlateList from "@/components/home/RightPlateList";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`w-full px-5 2xl:px-32 flex md:grid md:grid-cols-4`}>
      <SpotlightNew />
      <section
        id="left-nav"
        className="sticky top-0 left-0 h-screen max-w-72 w-full z-30 px-5 py-10 mx-5 border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-sm bg-secondary/20"
      >
        <LeftNav />
      </section>
      <section className="flex md:col-span-2">{children}</section>
      <section
        id="right-platelist"
        className="sticky top-0 left-0 h-screen max-w-sm w-full z-30 px-5 py-10 mx-5 border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-sm bg-secondary/20"
      >
        <RightPlateList />
      </section>
    </div>
  );
};

export default layout;
