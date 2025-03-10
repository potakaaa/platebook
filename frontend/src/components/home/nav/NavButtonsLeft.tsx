import { cn } from "@/lib/utils";
import React from "react";

const NavButtonLeft = ({
  name,
  icon: Icon,
  parentCN = "",
  divCN = "",
  onClick = () => {},
  disabled = false,
}: {
  name: string;
  icon: React.ComponentType<any>;
  parentCN?: string;
  divCN?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <section
      id={name}
      className={cn(
        `flex justify-start p-2 px-3 rounded-lg hover:bg-muted/80 transition duration-200 cursor-pointer`,
        parentCN
      )}
      onClick={onClick}
      aria-disabled={disabled}
    >
      <div
        className={cn(
          "md:space-x-2 lg:space-x-3 xl:space-x-4 flex flex-row justify-center items-center",
          divCN
        )}
      >
        <Icon className="lg:size-6 2xl:size-7 text-primary" />
        <span className="md:text-sm xl:text-base">{name}</span>
      </div>
    </section>
  );
};

export default NavButtonLeft;
