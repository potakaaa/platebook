import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HomeLogo from "./nav/HomeLogo";
import SearchBar from "../home/SearchBar";

const UserNav = () => {
  return (
    <section
      id="nav-for-user"
      className="absolute w-full flex flex-row justify-between inset-0 p-3 px-4 sm:px-7 sm:p-4 lg:p-6 lg:px-8 space-x-3"
    >
      <div className="relative">
        <HomeLogo />
      </div>
      <div id="search" className="relative h-full w-full">
        <SearchBar />
      </div>
      <div className="relative">
        <ModeToggle />
      </div>
    </section>
  );
};

export default UserNav;
