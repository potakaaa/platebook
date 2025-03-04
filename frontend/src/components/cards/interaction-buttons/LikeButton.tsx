"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import useMutationInteraction from "@/hooks/tanstack/interaction/useMutationInteraction";

interface LikeButtonProps {
  isLiked?: boolean;
  forHero?: boolean;
  id: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked: initialLiked,
  forHero,
  id,
}) => {
  const { useMutationLike, useMutationUnlike } = useMutationInteraction();
  const { mutate: unlikePost, isPending: unlikeIsPending } =
    useMutationUnlike();
  const { mutate: likePost, isPending: likeIsPending } = useMutationLike();
  const [liked, setLiked] = useState<boolean | undefined>(initialLiked);
  const handleLike = () => {
    if (likeIsPending) return;
    if (unlikeIsPending) return;

    if (liked === false) {
      likePost(id, {
        onError: () => {
          setLiked(initialLiked);
        },
      });
    } else {
      unlikePost(id, {
        onError: () => {
          setLiked(initialLiked);
        },
      });
    }

    setLiked((prev: boolean | undefined) => !prev);
  };
  return (
    <Button variant={"ghost"} className="" onClick={handleLike}>
      <Heart
        className={`size-8 ${
          liked ? "fill-primary stroke-primary" : "fill-none"
        }`}
      />
      <span
        className={`hidden xl:block ${
          !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
        } ${liked ? "text-primary" : ""}`}
      >
        Like{liked ? "d" : ""}
      </span>
    </Button>
  );
};

export default LikeButton;
