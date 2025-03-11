"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useProfileShare } from "@/store/profile/useProfileShare";
import ToolTipButton from "../home/buttons/ToolTipButton";
import { Copy, CopyCheck } from "lucide-react";

const ProfileShareDialog = ({
  user,
  isOwner = false,
}: {
  user: any;
  isOwner?: boolean;
}) => {
  const { isShareOpen, setOpenShare } = useProfileShare();
  const [copied, setCopied] = useState(false);

  const userUrl = `https://platebook.vercel.app/home/user/${user?.userId}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Dialog open={isShareOpen} onOpenChange={setOpenShare}>
      <DialogContent className="w-5/6 py-10 sm:py-7 overflow-x-hidden rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base">
            Share {user?.username}'s account!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-xs sm:text-sm font-light text-ellipsis whitespace-nowrap truncate w-[200px] sm:w-[400px]">
            {userUrl}
          </p>
          <ToolTipButton
            btnChildren={
              copied ? (
                <CopyCheck className="size-5" />
              ) : (
                <Copy className="size-5" />
              )
            }
            btnVariant="outline"
            btnSize={"icon"}
            onClick={() => handleCopy(userUrl)}
            tipChildren="Copy Link"
            btnClassName=""
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileShareDialog;
