import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const CustomAvatar = ({
  userImage,
  userName,
  className,
}: {
  userImage: string;
  userName: string;
  className?: string;
}) => {
  return (
    <Avatar
      className={cn("size-6 sm:size-7 lg:size-8 drop-shadow-md", className)}
    >
      <AvatarImage src={userImage} alt={userName} />
      <AvatarFallback className="text-foreground bg-primary size-full text-center flex items-center justify-center self-center">
        {userName[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
