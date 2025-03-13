"use client";

import {
  IconDisc,
  IconHome,
  IconLogout,
  IconMessageChatbot,
  IconMoon,
  IconSearch,
  IconSquareRoundedPlus,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePostDialogStore } from "@/store/post/usePostDialogStore";
import { useUserStore } from "@/store/user/UserStore";
import { signOut, useSession } from "next-auth/react";
import { usePlatelistDrawer } from "@/store/platelist/usePlatelistStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useChatbot } from "@/store/chatbot/useChatbotStore";
import useSearchStore from "@/store/search/useSearchStore";

const FloatingNavbar = () => {
  const { theme, setTheme } = useTheme();
  const { setOpen } = usePostDialogStore();
  const { user, resetStore } = useUserStore();
  const { setPlateOpen } = usePlatelistDrawer();
  const { data: session, status } = useSession();
  const router = useRouter();

  const { setIsChatOpen } = useChatbot();
  const { clearSearch } = useSearchStore();

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-primary" />,
      href: "/home",
    },
    {
      title: "Post Recipe",
      icon: <IconSquareRoundedPlus className="h-full w-full text-primary" />,
      href: "",
      onClick: (e: any) => {
        setOpen(true);
      },
    },

    {
      title: "Plate List",
      icon: <IconDisc className="h-full w-full text-primary" />,
      onClick: (e: any) => {
        setPlateOpen(true);
      },
      href: "",
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
      title: "User Profile",
      icon: <IconUserCircle className="h-full w-full text-primary" />,
      href: "",
      onClick: () => {
        if (status === "loading" || !session) {
          toast.info("Login to view profile", {
            description: "You need to login to view your profile",
            action: {
              label: "Login",
              onClick: () => router.push("/login"),
            },
          });
        } else {
          router.push(`/home/user/${user?.id}`);
          clearSearch();
        }
      },
    },
    {
      title: "Ask Platebot",
      icon: <IconMessageChatbot className="h-full w-full text-primary" />,
      href: "",
      onClick: () => {
        setIsChatOpen(true);
      },
    },
    {
      title: "Toggle Theme",
      icon:
        theme === "dark" ? (
          <IconSun className="h-full w-full text-primary" />
        ) : (
          <IconMoon className="h-full w-full text-primary" />
        ),
      onClick: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
      href: "",
    },
    {
      title: "Log Out",
      icon: <IconLogout className="h-full w-full text-primary" />,
      onClick: () => {
        if (status === "loading" || !session) {
          toast.error("Not Logged In", {
            description: "You are currently not logged in.",
            action: {
              label: "Login",
              onClick: () => router.push("/login"),
            },
          });
        } else {
          resetStore();
          signOut({ callbackUrl: "/" });
        }
      },
      href: "",
    },
  ];
  return (
    <FloatingDock
      mobileClassName="translate-y-20 fixed right-5 bottom-10 mb-14 block"
      desktopClassName="fixed bottom-7 shadow-lg bg-gray-50 dark:bg-neutral-900 hidden" // only for demo, remove for production
      items={links}
    />
  );
};

export default FloatingNavbar;
