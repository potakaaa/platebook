"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DialogContent } from "../ui/dialog";
import useQueryInteraction from "@/hooks/tanstack/interaction/useQueryInteractions";
import CustomAvatar from "../user/CustomAvatar";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import useMutationInteraction from "@/hooks/tanstack/interaction/useMutationInteraction";

interface FollowListsProps {
  userId: string;
  count: number;
  type: "Followers" | "Following";
}

type simpleUser = {
  pfp_url: string;
  userId: string;
  username: string;
  isFollowing: boolean;
};
const FollowLists: React.FC<FollowListsProps> = ({
  userId,
  type,
  count = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<simpleUser[]>([]);

  const { useQueryGetFollowers, useQueryGetFollowing } = useQueryInteraction();
  const { useMutationFollowUser, useMutationUnfollowUser } =
    useMutationInteraction();

  const { mutate: follow, isPending: FollowPending } = useMutationFollowUser();
  const { mutate: unfollow, isPending: UnfollowPending } =
    useMutationUnfollowUser();

  const { data: followersData, isLoading: followersLoading } =
    useQueryGetFollowers(userId);
  const { data: followingData, isLoading: followingLoading } =
    useQueryGetFollowing(userId);

  const router = useRouter();

  useEffect(() => {
    if (type === "Following" && followingData) {
      setList(followingData.map((user: any) => user.followed_user) || []);
    } else if (type === "Followers" && followersData) {
      setList(followersData.map((user: any) => user.user) || []);
    }
  }, [followingData, followersData, type]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <p className="text-center font-bold sm:text-lg">{count}</p>
          <h1 className="font-medium text-xs sm:text-sm">{type}</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="w-5/6 min-h-[100px] gap-2 rounded-xl overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center">
        <DialogTitle className="text-center font-bold">{type}</DialogTitle>
        <span className="w-full border-b border-muted" />
        <ScrollArea className="h-[300px] w-full">
          <div className="flex flex-col space-y-3 w-full">
            {list !== undefined &&
              list.map((item: simpleUser) => (
                <>
                  <div
                    className="w-full flex flex-row space-x-2 items-center justify-between pr-5"
                    key={item.userId}
                  >
                    <section className="w-full flex flex-row space-x-2 items-center">
                      <CustomAvatar
                        userName={item.username}
                        userImage={item.pfp_url}
                        onClick={() => router.push(`/home/user/${item.userId}`)}
                      />
                      <p className="text-xs sm:text-sm lg:text-base font-semibold">
                        {item.username}
                      </p>
                    </section>
                    <Button
                      variant={"outline"}
                      className="text-xs sm:text-sm p-2 py-1 sm:p-3"
                      onClick={() => {}}
                    >
                      Follow
                    </Button>
                  </div>
                  <span className="w-full border-b border-muted" />
                </>
              ))}
          </div>
        </ScrollArea>
        <span className="border-b border-muted mb-2" />
      </DialogContent>
    </Dialog>
  );
};

export default FollowLists;
