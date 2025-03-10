import { useChatbot } from "@/store/chatbot/useChatbotStore";
import { IconMessageChatbot } from "@tabler/icons-react";
import {
  BookUser,
  HelpCircleIcon,
  InfoIcon,
  PencilLine,
  SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

type navButton = {
  name: string;
  icon: JSX.Element;
  id: string;
  onClick: () => void;
};

export const navButtonDropStyles = "text-xs sm:text-sm justify-between";
export const navButtonIconStyles = "text-primary size-10";

export const getNavButtons = (
  router: ReturnType<typeof useRouter>,
  setIsChatOpen: (isOpen: boolean) => void,
  setFocusComponent: (id: string | null) => void,
  setFocus: (isFocused: boolean) => void
): navButton[] => {
  console.log("getNavButtons");
  return [
    {
      name: "Sign Up",
      icon: <PencilLine className={navButtonIconStyles} />,
      id: "signup",
      onClick: () => router.push("/signup"),
    },
    {
      name: "Visit Recipes",
      icon: <BookUser className={navButtonIconStyles} />,
      id: "visit-recipes",
      onClick: () => router.push("/home"),
    },
    {
      name: "Search Recipe",
      icon: <SearchIcon className={navButtonIconStyles} />,
      id: "search-recipe",
      onClick: () => {
        setFocusComponent("search-recipe");
        setFocus(true);
      },
    },
    {
      name: "Ask Platebot",
      icon: <IconMessageChatbot className={navButtonIconStyles} />,
      id: "ask-chatbot",
      onClick: () => setIsChatOpen(true),
    },
    {
      name: "About Us",
      icon: <InfoIcon className={navButtonIconStyles} />,
      id: "about-us",
      onClick: () => router.push("/about-us"),
    },
  ];
};
