"use client";
import {
  IconHome,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSquare,
  IconSquareRoundedPlus,
  IconSun,
} from "@tabler/icons-react";
import CustomAvatar from "../user/CustomAvatar";
import NavButtonLeft from "./NavButtonsLeft";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

const LeftNav = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col size-full">
      <div className="flex flex-col w-full space-y-3">
        <section
          id="user"
          className="w-full border border-muted rounded-xl p-2 px-3 hover:bg-muted/80 transition duration-300"
        >
          <div className="flex flex-row space-x-4 items-center">
            <CustomAvatar
              userName={session?.user?.name || "Username"}
              userImage={
                session?.user?.image || "https://via.placeholder.com/150"
              }
              className="2xl:size-10"
            />
            <div className="flex flex-col space-y-0">
              <span className="font-semibold">
                {session?.user?.name || "Username"}
              </span>
              <span className="text-sm font-light">
                {session?.user?.email || "email@email.com"}
              </span>
            </div>
          </div>
        </section>
        <NavButtonLeft name="Home" icon={IconHome} />
        <NavButtonLeft name="Post Recipe" icon={IconSquareRoundedPlus} />
        <NavButtonLeft name="Search Recipe" icon={IconSearch} />
        <NavButtonLeft
          name="Toggle Theme"
          icon={theme === "dark" ? IconSun : IconMoon}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
      </div>
      <NavButtonLeft name="Log Out" icon={IconLogout} parentCN="mt-auto" />
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
