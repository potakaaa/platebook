import {
  IconHome,
  IconLogout,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import CustomAvatar from "../user/CustomAvatar";
import Link from "next/link";
import { BottomGradient } from "../ui/bottom-gradient";

const LeftNav = () => {
  return (
    <ul className="w-full flex flex-col justify-start z-30 space-y-5 my-5 pl-0 lg:pl-5 xl:pl-10 2xl:pl-44 transition-all">
      <li className="flex justify-start">
        <Link
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          href="#"
        >
          <CustomAvatar
            userName="sample"
            userImage="https://via.placeholder.com/150"
            className="md:size-6"
          />
          <p className="text-sm text-secondary-foreground text-right">
            Username
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
        <Link
          className="flex flex-row justify-start self-start items-center space-x-2 bg-transparent hover:bg-gradient-to-l hover:from-primary/40 hover:to-transparent transition-colors duration-300 p-2 rounded-xl"
          href="#"
        >
          <IconLogout className="md:size-6 text-primary" />
          <p className="text-sm text-right text-secondary-foreground">
            Log Out
          </p>
        </Link>
      </li>
    </ul>
  );
};

export default LeftNav;
