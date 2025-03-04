"use client";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import React from "react";

const CommentButton = ({ forHero }: { forHero: boolean }) => {
  return (
    <div>
      <Button variant={"ghost"} className="">
        <MessageCircleMore className="size-8" />
        <span
          className={`hidden xl:block ${
            !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
          }`}
        >
          Comment
        </span>
      </Button>
    </div>
  );
};

export default CommentButton;
