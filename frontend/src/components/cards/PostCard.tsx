"use client";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Disc, Heart, MessageCircleMore, Share } from "lucide-react";
import CustomAvatar from "../user/CustomAvatar";
import LikeButton from "./interaction-buttons/LikeButton";
import ShareButton from "./interaction-buttons/ShareButton";
import PlatelistButton from "./interaction-buttons/PlatelistButton";
import CommentButton from "./interaction-buttons/CommentButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type PostCardProps = {
  id: string;
  userId: string;
  userImage: string;
  userName: string;
  title: string;
  description: string;
  images: string[];
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  atPlateList?: boolean;
  isLiked?: boolean;
  isShared?: boolean;
  forHero?: boolean;
  sharer?: string;
};

const PostCard = ({ postItems }: { postItems: PostCardProps }) => {
  const {
    id,
    userId,
    userImage,
    userName,
    title,
    description,
    images,
    likeCount,
    commentCount,
    shareCount,
    atPlateList,
    isLiked,
    isShared,
    forHero = false,
    sharer,
  } = postItems;
  const router = useRouter();
  return (
    <CardContainer className="inter-var h-full w-full">
      <CardBody
        className={`flex flex-col h-full w-full border border-neutral-200/20 px-5 py-4 sm:px-6 sm:py-5 lg:py-6 lg:px-7 rounded-xl space-y-4 ${
          forHero
            ? "shadow-[0px_0px_64px_10px_rgba(247,141,95,0.2)] bg-background/60"
            : "shadow-lg bg-background"
        }`}
      >
        {sharer && <p>Shared by {sharer}</p>}
        <CardItem
          id="profile"
          className="flex flex-row w-full items-center justify-between"
          translateZ={10}
        >
          <div className="w-full flex flex-row space-x-2 items-center">
            <CustomAvatar
              userName={userName}
              userImage={userImage}
              onClick={() => router.push(`/home/user/${userId}`)}
            />
            <p className="text-xs sm:text-sm lg:text-base font-semibold">
              {userName}
            </p>
          </div>
          <Button variant={"outline"} className="">
            View Recipe
          </Button>
        </CardItem>
        <div id="post" className="flex flex-col space-y-1">
          <CardItem
            className="font-bold text-[15px] sm:text-base"
            translateZ={20}
          >
            {title}
          </CardItem>
          <CardItem className="text-[13px] sm:text-sm" translateZ={30}>
            {description}
          </CardItem>
          <div className="w-full py-2 grid grid-cols-2 gap-2">
            {images.slice(0, 2).map((image, index) => (
              <CardItem
                key={index}
                className="w-full"
                translateX={index % 2 === 0 ? -5 : 5}
                translateZ={40}
              >
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="size-full rounded-lg object-cover shadow-md"
                  />
                </AspectRatio>
              </CardItem>
            ))}
          </div>
        </div>
        <CardItem
          id="buttons"
          className="flex flex-row w-full justify-between"
          translateZ={20}
        >
          <LikeButton isLiked={isLiked} forHero={forHero} id={id} />
          <CommentButton
            id={id}
            forHero={forHero}
            postName={title}
            postUser={userName}
          />
          <ShareButton isShared={isShared} forHero={forHero} id={id} />
          <PlatelistButton
            atPlateList={atPlateList}
            forHero={forHero}
            id={id}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PostCard;
