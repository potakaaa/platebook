"use client";
import InfiniteScrollComp from "@/components/home/InfiniteScroll";
import Spinner from "@/components/loader/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/user/CustomAvatar";
import useMutationAuth from "@/hooks/tanstack/auth/useMutationAuth";
import useQueryAuth from "@/hooks/tanstack/auth/useQueryAuth";
import { Frown, UserPen, UserPlus } from "lucide-react";
import React from "react";
import EditButton from "./Buttons/EditButton";
import { useUserStore } from "@/store/useUserStore";
import FollowButton from "./Buttons/FollowButton";

const page = (props: { params: Promise<{ id: string }> }) => {
  const params = React.use(props.params);
  const { useQueryGetUserbyID } = useQueryAuth();
  const { data: user, isPending, error } = useQueryGetUserbyID(params.id);
  const { user: client } = useUserStore();

  const isOwner = client?.id === user?.id;

  if (isPending)
    return (
      <div>
        <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
          <Spinner />
        </div>
      </div>
    );

  if (1 === 1)
    return (
      <div className="flex flex-row gap-2 mt-10">
        <p>Error loading user</p>
        <Frown className="size-5 text-primary drop-shadow-sm" />
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center py-10 gap-0 sm:gap-3 md:gap-5">
      <section
        id="user-info"
        className="flex flex-col w-full py-3 gap-5 sm:max-w-sm bg-background  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative "
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div
          id="user-image"
          className="w-full flex justify-center items-center"
        >
          <Avatar className="size-24 drop-shadow-sm">
            <AvatarImage src={user.pfp_url} alt={user.username} />
            <AvatarFallback className="text-foreground bg-primary text-3xl font-bold size-full text-center flex items-center justify-center self-center">
              {user.username[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div
          id="user-name"
          className="flex flex-col justify-center items-center w-full text-ellipsis truncate overflow-x-scroll line-clamp-1"
        >
          <span className="text-xl text-left font-bold">{user.username}</span>
          <span className="text-sm font-normal">{user.email}</span>
        </div>
        <div
          id="user-follow"
          className="w-full flex flex-row justify-around sm:justify-evenly items-center text-center z-30"
        >
          <section id="following" className="flex flex-col">
            <p className="text-center font-bold sm:text-lg">
              {user.following_count}
            </p>
            <h1 className="font-medium text-xs sm:text-sm">Following</h1>
          </section>
          <section id="followers" className="flex flex-col">
            <p className="text-center font-bold sm:text-lg">
              {user.followers_count}
            </p>
            <h1 className="font-medium text-xs sm:text-sm">Followers</h1>
          </section>
          <section id="posts" className="flex flex-col">
            <p className="text-center font-bold sm:text-lg">
              {user.recipes_count}
            </p>
            <h1 className="font-medium text-xs sm:text-sm">Posts</h1>
          </section>
        </div>
        <div
          id="action-buttons"
          className="w-full flex items-center justify-center gap-2 my-2 z-30"
        >
          <Button variant={"default"}>
            Share Profile
            <UserPlus className="size-6" />
          </Button>

          {isOwner ? (
            <EditButton />
          ) : (
            <FollowButton id={params.id} isFollowing={user.isFollowing} />
          )}
        </div>
      </section>
      <span className="w-full border-b border-muted" />
      <div id="my-posts" className="w-full flex flex-col gap-5">
        <InfiniteScrollComp userId={params.id} />
      </div>
    </div>
  );
};

export default page;
