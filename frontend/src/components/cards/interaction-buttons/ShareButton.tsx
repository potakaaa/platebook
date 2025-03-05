"use client";

import { Button } from "@/components/ui/button";
import useMutationInteraction from "@/hooks/tanstack/interaction/useMutationInteraction";
import { Share } from "lucide-react";
import React, { useState } from "react";
import { set } from "zod";

interface ShareButtonProps {
  isShared?: boolean;
  forHero?: boolean;
  id: string;
  shareCount?: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  isShared: initialShared,
  forHero,
  id,
  shareCount = 0,
}) => {
  const { useMutationShare, useMutationUnshare } = useMutationInteraction();
  const { mutate: sharePost, isPending: shareIsPending } = useMutationShare();
  const { mutate: unsharePost, isPending: unshareIsPending } =
    useMutationUnshare();
  const [shared, setShared] = useState<boolean | undefined>(initialShared);
  const [heroShare, setHeroShare] = useState(250);

  const handleShare = () => {
    if (shareIsPending || unshareIsPending) return;

    if (forHero) {
      setShared((prev: boolean | undefined) => !prev);
      setHeroShare((prev: number) => (prev === 250 ? 251 : 250));
      return;
    }

    if (!shared) {
      sharePost(id, {
        onError: () => setShared(initialShared),
      });
    } else {
      unsharePost(id, {
        onError: () => setShared(initialShared),
      });
    }

    setShared((prev: boolean | undefined) => !prev);
  };

  return (
    <div>
      <Button variant={"ghost"} className="p-1 sm:p-3" onClick={handleShare}>
        <Share
          className={`size-8 ${shared ? "stroke-primary" : "fill-none"}`}
        />
        <span
          className={`hidden xl:block ${
            !forHero ? "sm:hidden xl:block" : "lg:hidden sm:block"
          } ${shared ? "text-primary" : ""}`}
        >
          Share{shared ? "d" : ""}
        </span>
        <p className="text-xs self-center">{`(${
          !forHero ? shareCount : heroShare
        })`}</p>
      </Button>
    </div>
  );
};

export default ShareButton;
