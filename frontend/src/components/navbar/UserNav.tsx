import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HomeLogo from "./nav/HomeLogo";
import SearchBar from "../home/SearchBar";

const UserNav = () => {
  return (
    <section
      id="nav-for-user"
      className="fixed w-full flex flex-row justify-between top-0 left-0 p-3 px-4 sm:px-7 lg:px-8 space-x-3 md:space-x-5 lg:space-x-7 backdrop-blur-lg backdrop-filter bg-opacity-30 z-50"
    >
      <div className="relative flex flex-row items-center justify-start space-x-3 w-full">
        <div className="relative">
          <HomeLogo />
        </div>
        <div
          id="search"
          className="relative w-full flex items-center justify-start"
        >
          <SearchBar />
        </div>
      </div>
      <div className="relative">
        <ModeToggle />
      </div>
    </section>
  );
};

export default UserNav;
