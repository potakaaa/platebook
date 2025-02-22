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
  image1: string;
  image2: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  atPlateList?: boolean;
};

const PostCard = ({ postItems }: { postItems: PostCardProps }) => {
  const {
    userImage,
    userName,
    title,
    description,
    image1,
    image2,
    likeCount,
    commentCount,
    shareCount,
    atPlateList,
  } = postItems;
  return (
    <CardContainer className="inter-var h-full w-full">
      <CardBody className="flex flex-col h-full w-full border border-neutral-200 py-6 px-7 rounded-xl space-y-4 shadow-[0px_0px_64px_10px_rgba(247,141,95,0.2)]">
        <CardItem
          id="profile"
          className="flex flex-row items-center space-x-2"
          translateZ={10}
        >
          <Avatar className="size-8 drop-shadow-md">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{userName}</p>
        </CardItem>
        <div id="post" className="flex flex-col space-y-1">
          <CardItem className="font-bold" translateZ={20}>
            {title}
          </CardItem>
          <CardItem className="text-sm font-" translateZ={30}>
            {description}
          </CardItem>
          <div className="w-full py-2 grid grid-cols-2 gap-2">
            <CardItem className="w-full" translateX={-5} translateZ={50}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={image1}
                  alt={title}
                  fill
                  className="size-full rounded-lg object-cover shadow-xl"
                />
              </AspectRatio>
            </CardItem>
            <CardItem className="w-full" translateX={5} translateZ={50}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={image2}
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
          <Button variant={"ghost"}>
            <Heart className="size-8" />
            Like
          </Button>
          <Button variant={"ghost"}>
            <MessageCircleMore className="size-8" />
            Comment
          </Button>
          <Button variant={"ghost"}>
            <Share className="size-8" />
            Share
          </Button>
          <Button variant={"ghost"}>
            <Disc className="size-8 text-primary" />
            Add to Plate
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PostCard;
