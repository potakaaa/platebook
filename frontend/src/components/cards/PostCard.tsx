"use client";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Repeat2, SquareArrowOutUpRight } from "lucide-react";
import CustomAvatar from "../user/CustomAvatar";
import LikeButton from "./interaction-buttons/LikeButton";
import ShareButton from "./interaction-buttons/ShareButton";
import PlatelistButton from "./interaction-buttons/PlatelistButton";
import CommentButton from "./interaction-buttons/CommentButton";
import { useRouter } from "next/navigation";
import { on } from "events";

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

const PostCard = (props: {
  postItems: PostCardProps;
  onAvatarClick?: () => void;
  onRecipeClick?: () => void;
}) => {
  const { postItems, onAvatarClick, onRecipeClick } = props;
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

  const handleAvatarClick = async () => {
    if (onAvatarClick) {
      await router.push(`/home/user/${userId}`);
      onAvatarClick();
    } else {
      router.push(`/home/user/${userId}`);
    }
  };

  const handleRecipeClick = async () => {
    if (onRecipeClick) {
      await router.push(`/home/post/${id}`);
      onRecipeClick();
    } else {
      router.push(`/home/post/${id}`);
    }
  };

  return (
    <CardContainer className="inter-var flex flex-col h-full w-full">
      {sharer && (
        <span className="flex flex-row w-full px-3 mb-3 self-start gap-2 max-w-md line-clamp-1">
          <Repeat2 className="size-4 text-primary sm:size-5" />
          <p className="text-left text-xs sm:text-sm">Shared by {sharer}</p>
        </span>
      )}
      <CardBody
        className={`flex flex-col h-full w-full border border-neutral-200/20 px-5 py-4 sm:px-6 sm:py-5 lg:py-6 lg:px-7 rounded-xl space-y-4 ${
          forHero
            ? "shadow-[0px_0px_64px_10px_rgba(247,141,95,0.2)] bg-background/60"
            : "shadow-lg bg-background"
        }`}
      >
        <CardItem
          id="profile"
          className="flex flex-row w-full items-center justify-between"
          translateZ={10}
        >
          <div className="w-full flex flex-row space-x-2 items-center">
            <CustomAvatar
              userName={userName}
              userImage={userImage}
              onClick={handleAvatarClick}
            />
            <p className="text-xs sm:text-sm lg:text-base font-semibold">
              {userName}
            </p>
          </div>
          <Button
            variant={"outline"}
            className="p-1 sm:px-3"
            size={"sm"}
            onClick={() => {
              if (!forHero) handleRecipeClick();
            }}
          >
            <SquareArrowOutUpRight className="size-4 items-center" />
            <p className="hidden sm:block text-xs sm:text-sm 2xl:text-base">
              View Recipe
            </p>
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
                    width={500}
                    height={500}
                    priority
                    sizes={""}
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
          <LikeButton
            isLiked={isLiked}
            forHero={forHero}
            id={id}
            likeCount={likeCount}
          />
          <CommentButton
            id={id}
            forHero={forHero}
            postName={title}
            postUser={userName}
            commentCount={commentCount}
          />
          <ShareButton
            isShared={isShared}
            forHero={forHero}
            id={id}
            shareCount={shareCount}
          />
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
