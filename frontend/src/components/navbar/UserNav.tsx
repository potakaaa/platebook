import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import HomeLogo from "./nav/HomeLogo";

const UserNav = () => {
  return (
    <section
      id="nav-for-user"
      className="fixed w-full flex flex-row justify-between inset-0"
    >
      <div className="absolute left-4 top-4">
        <HomeLogo />
      </div>
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
    </section>
  );
};

export default UserNav;
