import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-secondary" />,
    href: "#",
  },

  {
    title: "Products",
    icon: <IconTerminal2 className="h-full w-full text-secondary" />,
    href: "#",
  },
  {
    title: "Components",
    icon: <IconNewSection className="h-full w-full text-secondary" />,
    href: "#",
  },
  {
    title: "Aceternity UI",
    icon: (
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
      />
    ),
    href: "#",
  },
  {
    title: "Changelog",
    icon: <IconExchange className="h-full w-full text-secondary" />,
    href: "#",
  },

  {
    title: "Twitter",
    icon: <IconBrandX className="h-full w-full text-secondary" />,
    href: "#",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-secondary" />,
    href: "#",
  },
];

const FloatingNavbar = () => {
  return (
    <FloatingDock
      mobileClassName="translate-y-20 fixed right-10 bottom-10 mb-14"
      desktopClassName="fixed bottom-10 bg-primary" // only for demo, remove for production
      items={links}
    />
  );
};

export default FloatingNavbar;
