"use client";
import { IconHome, IconLogout, IconSearch } from "@tabler/icons-react";
import CustomAvatar from "../../user/CustomAvatar";
import NavButtonLeft from "./NavButtonsLeft";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "../buttons/ThemeToggle";
import HomeLogo from "../../navbar/nav/HomeLogo";
import PostRecipeDialog from "../../post/PostRecipeDialog";
import { PlateListSidebarToggle } from "../platelist/PlateListSidebar";
import { useUserStore } from "@/store/user/UserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFocusStore } from "@/store/focus/useFocusStore";
import useSearchStore from "@/store/search/useSearchStore";

const LeftNav = () => {
  const user = useUserStore((state) => state.user);
  const resetStore = useUserStore((state) => state.resetStore);

  const router = useRouter();

  const { clearSearch } = useSearchStore();
  const { data: session, status } = useSession();
  const { setFocus, setFocusComponentId } = useFocusStore();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const logoutPromise = new Promise<void>(() => {
      clearSearch();
      resetStore();
      signOut({ callbackUrl: "/" });
    });

    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "An error occurred while logging out",
    });
    setLoggingOut(false);

    return logoutPromise;
  };

  const handleUserPageClick = () => {
    router.push(`/home/user/${user?.id}`);
    clearSearch();
  };

  const handleHomeClick = () => {
    router.push("/home");
    clearSearch();
  };

  return (
    <div className="flex flex-col size-full">
      <div className="flex flex-col w-full space-y-3">
        <section id="logo" className="w-full mb-5">
          <HomeLogo textCN={"lg:text-xl xl:text-2xl"} />
        </section>
        <section
          id="user"
          className="w-full border border-muted rounded-xl p-2 px-3 hover:bg-muted/80 transition duration-300 overflow-hidden cursor-pointer"
          onClick={() => {
            if (status === "loading" || !session) {
              router.push("/login");
              clearSearch();
            } else {
              handleUserPageClick();
            }
          }}
        >
          <div className="flex flex-row space-x-3 xl:space-x-4 items-center">
            <CustomAvatar
              userName={user?.name || ""}
              userImage={user?.image || "/platebook-logo-500.png"}
              className="2xl:size-10"
            />
            <div className="flex flex-col space-y-0 truncate text-ellipsis">
              <span className="font-semibold lg:text-sm">
                {user?.name || "Login"}
              </span>
              <span className="md:text-[12px] lg:text-xs xl:text-sm font-light w-full max-w-lg">
                {user?.email || "to view profile"}
              </span>
            </div>
          </div>
        </section>
        <NavButtonLeft
          name="Home"
          icon={IconHome}
          onClick={() => handleHomeClick()}
        />
        <PostRecipeDialog />
        <NavButtonLeft
          name="Search Recipe"
          icon={IconSearch}
          onClick={() => {
            setFocus(true);
            setFocusComponentId("search-home");
          }}
        />
        <ThemeToggle />
        <PlateListSidebarToggle />
      </div>
      <NavButtonLeft
        name="Log Out"
        icon={IconLogout}
        parentCN={`mt-auto ${status === "loading" || (!session && "hidden")}`}
        divCN={`${status === "loading" || !session ? "opacity-50" : ""}`}
        onClick={handleLogout}
        disabled={status === "loading" || !session || loggingOut}
      />
    </div>
  );
};

/* <ul className="w-full flex flex-col justify-start z-40 space-y-3 my-0 transition-all">
      <li className="flex justify-start">
        <Link
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          href="#"
        >
          <CustomAvatar
            userName={session?.user?.name || "Username"}
            userImage={
              session?.user?.image || "https://via.placeholder.com/150"
            }
            className="md:size-6"
          />
          <p className="text-sm text-secondary-foreground text-right">
            {session?.user?.name || "Username"}
          </p>
        </Link>
        <BottomGradient />
      </li>
      <li className="flex justify-start">
        <Link
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          href="#"
        >
          <IconHome className="md:size-6 text-primary" />
          <p className="text-sm text-right text-secondary-foreground">Home</p>
        </Link>
      </li>
      <li className="flex justify-start">
        <Link
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          href="#"
        >
          <IconSquareRoundedPlus className="md:size-6 text-primary" />
          <p className="text-sm text-right text-secondary-foreground">
            Post Recipe
          </p>
        </Link>
      </li>
      <li className="flex justify-start">
        <button
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <IconLogout className="md:size-6 text-primary" />
          <p className="text-sm text-right text-secondary-foreground">
            Log Out
          </p>
        </button>
      </li>
    </ul> */

export default LeftNav;
