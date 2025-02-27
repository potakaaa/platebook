import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HomeLogo from "./nav/HomeLogo";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input-hero";
import SearchInput from "../hero/SearchInput";
import SearchBar from "../home/SearchBar";

const UserNav = () => {
  return (
    <section
      id="nav-for-user"
      className="absolute w-full flex flex-row justify-between inset-0 p-3 px-4 sm:px-7 sm:p-4 lg:p-6 lg:px-8 space-x-3"
    >
      <div className="relative h-full">
        <HomeLogo />
      </div>
      <div id="search" className="relative h-full">
        <SearchBar />
      </div>
      <div className="relative h-full">
        <ModeToggle />
      </div>
    </section>
  );
};

export default UserNav;
