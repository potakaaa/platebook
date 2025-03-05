'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import InfiniteScrollComp from "./InfiniteScroll";
import FollowingTab from "./FollowingTab";

const FeedChoice = () => {
  const [feed, setFeed] = useState<"home" | "following">("home"); 

  const toggleFeed = () => {
    setFeed((prevFeed) => (prevFeed === "home" ? "following" : "home"));
  };

  return (
    <div className="flex flex-col items-center">
      <Button onClick={toggleFeed} className="mb-4">
        {feed === "home" ? "Switch to Following Feed" : "Switch to Home Feed"}
      </Button>

      {feed === "home" ? <InfiniteScrollComp /> : <FollowingTab />}
    </div>
  );
};

export default FeedChoice;
