"use client";

import React, { JSX } from "react";
import HomeLogo from "./nav/HomeLogo";
import { Button } from "../ui/button";
import {
  AlignJustify,
  HelpCircleIcon,
  InfoIcon,
  LogInIcon,
  PencilLine,
  SearchIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { IconMessageChatbot } from "@tabler/icons-react";

type navButton = {
  name: string;
  icon: JSX.Element;
  id: string;
  onClick: () => void;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const navButtonStyles = "text-xs sm:text-sm justify-between";
  const navButtonIconStyles = "text-primary size-10";

  const navButtons: navButton[] = [
    {
      name: "Sign Up",
      icon: <PencilLine className={navButtonIconStyles} />,
      id: "signup",
      onClick: () => router.push("/signup"),
    },
    {
      name: "Search Recipe",
      icon: <SearchIcon className={navButtonIconStyles} />,
      id: "search-recipe",
      onClick: () => router.push("/search-recipe"),
    },
    {
      name: "Ask `chatbot`",
      icon: <IconMessageChatbot className={navButtonIconStyles} />,
      id: "ask-chatbot",
      onClick: () => router.push("/ask-chatbot"),
    },
    {
      name: "About Us",
      icon: <InfoIcon className={navButtonIconStyles} />,
      id: "about-us",
      onClick: () => router.push("/about-us"),
    },
    {
      name: "Help",
      icon: <HelpCircleIcon className={navButtonIconStyles} />,
      id: "help",
      onClick: () => router.push("/help"),
    },
  ];

  return (
    <div className="flex justify-between items-start w-full p-4 md:p-6 xl:p-7 transition-all duration-200">
      <HomeLogo />
      <section className="flex gap-2 sm:gap-4 items-center">
        <Button
          variant={"default"}
          className="h-8 sm:h-10 sm:w-24 shadow text-xs sm:text-sm"
          onClick={() => router.push("/login")}
        >
          <LogInIcon size={15} />
          <span>Log In</span>
        </Button>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild className="mx-2">
            <div onClick={() => setIsOpen(!isOpen)}>
              <AlignJustify className="text-primary drop-shadow-md size-6 sm:size-7" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 sm:w-44 my-2 sm:my-3">
            <DropdownMenuLabel className="text-xs sm:text-sm text-center">
              Navigation
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {navButtons.map((button, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    key={index}
                    id={button.id}
                    className={navButtonStyles}
                    onClick={button.onClick}
                  >
                    <span>{button.name}</span>
                    {button.icon}
                  </DropdownMenuItem>
                  {index === 2 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
};

export default Navbar;
