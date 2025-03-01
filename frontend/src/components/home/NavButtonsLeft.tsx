import { cn } from "@/lib/utils";
import React from "react";

const NavButtonLeft = ({
  name,
  icon: Icon,
  parentCN = "",
  divCN = "",
  onClick = () => {},
}: {
  name: string;
  icon: React.ComponentType<any>;
  parentCN?: string;
  divCN?: string;
  onClick?: () => void;
}) => {
  return (
    <section
      id={name}
      className={cn(
        `flex justify-start p-2 px-3 rounded-lg hover:bg-muted/80 transition duration-200 cursor-pointer`,
        parentCN
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "space-x-4 flex flex-row justify-center items-center",
          divCN
        )}
      >
        <Icon className="2xl:size-8 text-primary" />
        <span>{name}</span>
      </div>
    </section>
  );
};

export default NavButtonLeft;
