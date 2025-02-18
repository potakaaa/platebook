import { IconMessageChatbot } from "@tabler/icons-react";
import { HelpCircleIcon, InfoIcon, PencilLine, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

type navButton = {
  name: string;
  icon: JSX.Element;
  id: string;
  onClick: () => void;
};

export const navButtonStyles = "text-xs sm:text-sm justify-between";
export const navButtonIconStyles = "text-primary size-10";

export const getNavButtons = (
  router: ReturnType<typeof useRouter>
): navButton[] => [
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
