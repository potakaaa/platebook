import {
  IconDisc,
  IconHome,
  IconLogout,
  IconSearch,
  IconSquareRoundedPlus,
  IconUserCircle,
} from "@tabler/icons-react";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-primary" />,
    href: "#",
  },
  {
    title: "Post Recipe",
    icon: <IconSquareRoundedPlus className="h-full w-full text-primary" />,
    href: "#",
  },
  {
    title: "Search",
    icon: <IconSearch className="h-full w-full text-primary" />,
    href: "#",
  },

  {
    title: "Platebook",
    icon: (
      <div className="w-full h-full z-30">
        <Image
          src="/platebook-logo-500.png"
          width={500}
          height={500}
          className="drop-shadow-md object-cover size-4"
          alt="Platebook Logo"
        />
      </div>
    ),
    href: "/",
  },
  {
    title: "Plate List",
    icon: <IconDisc className="h-full w-full text-primary" />,
    href: "#",
  },

  {
    title: "User Profile",
    icon: <IconUserCircle className="h-full w-full text-primary" />,
    href: "#",
  },
  {
    title: "Log Out",
    icon: <IconLogout className="h-full w-full text-primary" />,
    href: "#",
  },
];

const FloatingNavbar = () => {
  return (
    <FloatingDock
      mobileClassName="translate-y-20 fixed right-5 bottom-10 mb-14 block"
      desktopClassName="fixed bottom-7 shadow-lg bg-gray-50 dark:bg-neutral-900 hidden" // only for demo, remove for production
      items={links}
    />
  );
};

export default FloatingNavbar;
