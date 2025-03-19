"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import InfiniteScrollComp from "./InfiniteScroll";
import FollowingTab from "./FollowingTab";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const FeedChoice = () => {
  const [feed, setFeed] = useState<"for-you" | "following">("for-you");
  const { data: session, status } = useSession();

  const toggleFeed = () => {
    if (!session) {
      toast.error("You need to be logged in to switch feed!");
      return;
    }
    setFeed((prevFeed) => (prevFeed === "for-you" ? "following" : "for-you"));
  };

  return (
    <div className="flex flex-col items-center ">
      <section
        id="feed-choice"
        className="flex flex-row w-full justify-evenly items-center space-x-4 text-sm mb-5 md:mb-10 border-muted border-b relative"
      >
        <Button
          variant="ghost"
          className={`text-sm text-foreground lg:text-base relative hover:bg-transparent transition duration-100 ${
            feed === "following"
              ? "font-semibold text-primary"
              : "text-foreground font-normal"
          }`}
          onClick={toggleFeed}
          disabled={status === "loading" || !session}
        >
          Following
        </Button>
        <span className="w-[1px] h-8 self-end bg-muted absolute" />
        <Button
          variant="ghost"
          className={`text-sm text-foreground lg:text-base relative bg-transparent hover:bg-transparent transition duration-100 ${
            feed === "for-you"
              ? "font-semibold text-primary"
              : "text-foreground font-normal"
          }`}
          onClick={toggleFeed}
        >
          For You
        </Button>
      </section>

      <div className="w-full">
        {feed === "for-you" ? <InfiniteScrollComp /> : <FollowingTab />}
      </div>
    </div>
  );
};

export default FeedChoice;
