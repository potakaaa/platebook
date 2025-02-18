import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getNavButtons, navButtonDropStyles } from "./NavButtons";
import { AlignJustify } from "lucide-react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const navButtons = getNavButtons(router);

  return (
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
                className={navButtonDropStyles}
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
  );
};

export default Dropdown;
