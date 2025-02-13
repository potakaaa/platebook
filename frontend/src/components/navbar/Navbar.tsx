import { ChevronDown, ChevronDownCircle, ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="w-full flex px-10 py-3 fixed top-0 bg-white z-10 border-b">
      <section className="flex font-black text-2xl">
        <h1 className="text-primary drop-shadow-sm">Plate</h1>
        <h1 className="drop-shadow-sm">Book</h1>
      </section>
      <div className="flex flex-row justify-between w-full">
        <ul className="flex flex-row space-x-3 px-8">
          <li className="flex flex-row items-center">
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 "
            >
              <p>Button</p>
              <ChevronDownIcon size={20} />
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 "
            >
              <p>Button</p>
              <ChevronDownIcon size={20} />
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 "
            >
              <p>Button</p>
              <ChevronDownIcon size={20} />
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 "
            >
              Button
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 "
            >
              Button
            </Button>
          </li>
        </ul>
        <ul id="right nav" className="flex flex-row space-x-3">
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 text-sm"
            >
              Another Button
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 text-sm"
            >
              About Us
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              className="font-normal py-1 rounded-full px-5 text-sm"
            >
              Log In
            </Button>
          </li>
          <li>
            <Button
              variant={"default"}
              className="font-normal py-1 rounded-full px-5 text-sm hover:bg-background hover:text-primary hover:shadow-none"
            >
              Sign Up
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
