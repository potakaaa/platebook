import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HomeLogo from "./nav/HomeLogo";

const UserNav = () => {
  return (
    <section
      id="nav-for-user"
      className="absolute w-full flex flex-row justify-between inset-0 p-3 px-4 sm:px-7 sm:p-4 lg:p-6 lg:px-8"
    >
      <div className="relative">
        <HomeLogo />
      </div>
      <div className="relative">
        <ModeToggle />
      </div>
    </section>
  );
};

export default UserNav;
