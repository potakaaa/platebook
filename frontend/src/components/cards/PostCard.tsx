import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Disc, Heart, MessageCircleMore, Share } from "lucide-react";

export type PostCardProps = {
  userImage: string;
  userName: string;
  title: string;
  description: string;
  images: string[];
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  atPlateList?: boolean;
  forHero?: boolean;
};

const PostCard = ({ postItems }: { postItems: PostCardProps }) => {
  const {
    userImage,
    userName,
    title,
    description,
    images,
    likeCount,
    commentCount,
    shareCount,
    atPlateList,
    forHero = false,
  } = postItems;
  return (
    <CardContainer className="inter-var h-full w-full">
      <CardBody
        className={`flex flex-col h-full w-full border border-neutral-200/20 px-5 py-4 sm:px-6 sm:py-5 lg:py-6 lg:px-7 rounded-xl space-y-4 ${
          forHero
            ? "shadow-[0px_0px_64px_10px_rgba(247,141,95,0.2)] bg-background/75"
            : "shadow-lg bg-background"
        }`}
      >
        <CardItem
          id="profile"
          className="flex flex-row items-center space-x-2"
          translateZ={10}
        >
          <Avatar className="size-6 sm:size-7 lg:size-8 drop-shadow-md">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="text-foreground bg-primary size-full text-center flex items-center justify-center self-center">
              {userName[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs sm:text-sm lg:text-base font-semibold">
            {userName}
          </p>
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
            <CardItem className="w-full" translateX={-5} translateZ={50}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={images[0]}
                  alt={title}
                  fill
                  className="size-full rounded-lg object-cover shadow-xl"
                />
              </AspectRatio>
            </CardItem>
            <CardItem className="w-full" translateX={5} translateZ={50}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={images[1]}
                  alt={title}
                  fill
                  className="size-full rounded-lg object-cover shadow-xl"
                />
              </AspectRatio>
            </CardItem>
          </div>
        </div>
        <CardItem
          id="buttons"
          className="flex flex-row w-full justify-between"
          translateZ={20}
        >
          <Button variant={"ghost"} className="">
            <Heart className="size-8" />
            <span className="hidden sm:block lg:hidden xl:block">Like</span>
          </Button>
          <Button variant={"ghost"} className="">
            <MessageCircleMore className="size-8" />
            <span className="hidden sm:block lg:hidden xl:block">Comment</span>
          </Button>
          <Button variant={"ghost"} className="">
            <Share className="size-8" />
            <span className="hidden sm:block lg:hidden xl:block">Share</span>
          </Button>
          <Button variant={"ghost"} className="">
            <Disc className="size-8 text-primary" />
            <span className="hidden sm:block lg:hidden xl:block">
              Add to Plate
            </span>
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PostCard;
