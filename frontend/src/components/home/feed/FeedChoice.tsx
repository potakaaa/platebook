"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import InfiniteScrollComp from "./InfiniteScroll";
import FollowingTab from "./FollowingTab";

const FeedChoice = () => {
  const [feed, setFeed] = useState<"for-you" | "following">("for-you");

  const toggleFeed = () => {
    setFeed((prevFeed) => (prevFeed === "for-you" ? "following" : "for-you"));
    console.log(feed);
  };

  return (
    <div className="flex flex-col items-center">
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

      {feed === "for-you" ? <InfiniteScrollComp /> : <FollowingTab />}
    </div>
  );
};

export default FeedChoice;
