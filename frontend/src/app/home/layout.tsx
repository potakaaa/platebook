import LeftNav from "@/components/home/nav/LeftNav";
import RightPlateList from "@/components/home/platelist/RightPlateList";
import FloatingNavbar from "@/components/navbar/FloatingNav";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import React, { ReactNode } from "react";
import SearchStateProvider from "./SearchStateProvider";
import SearchBar from "@/components/home/search/SearchBar";
import ChatbotCard from "@/components/chatbot/ChatbotCard";
import { PlateListSidebarToggle } from "@/components/home/platelist/PlateListSidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SpotlightNew />
      <div
        className={`w-full px-2 sm:px-10 md:px-2 xl:px-5 2xl:px-12 flex items-center justify-center self-start lg:gap-x-12 xl:gap-x-2 2xl:gap-x-20 scroll-smooth  [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 `}
      >
        <ChatbotCard />
        <section
          id="left-nav"
          className="sticky top-0 left-0 h-screen md:max-w-60 lg:max-w-52 xl:max-w-72 w-full z-30 px-5 py-10 border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-lg bg-secondary/30 flex-[1] hidden md:block"
        >
          <LeftNav />
        </section>
        <section
          id="feed"
          className="flex w-full flex-col max-w-screen-md lg:max-w-2xl px-5 2xl:max-w-2xl justify-start items-center self-start flex-[2] py-5 sm:py-8 lg:py-10"
        >
          <section id="search" className="mb-5 w-full">
            <SearchBar />
          </section>
          <SearchStateProvider>
            <PlateListSidebarToggle />
            {children}
          </SearchStateProvider>
        </section>
        <section
          id="right-platelist"
          className="sticky top-0 left-0 h-screen lg:max-w-72 xl:max-w-xs 2xl:max-w-sm w-full z-30 px-5 py-10  border-x-2 border-secondary justify-start items-start self-start backdrop-filter backdrop-blur-lg bg-secondary/30 flex-none lg:flex-[1] hidden lg:block"
        >
          <RightPlateList />
        </section>
        <FloatingNavbar />
      </div>
    </>
  );
};

export default layout;
