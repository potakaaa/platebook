import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export type PostCardProps = {
  userImage: string;
  userName: string;
  title: string;
  description: string;
  image: string;
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
    image,
    likeCount,
    commentCount,
    shareCount,
    atPlateList,
  } = postItems;
  return (
    <CardContainer className="inter-var">
      <CardBody className="flex flex-col bg-card border border-neutral-200 py-5 px-6 rounded-xl">
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </div>
        <CardItem>{title}</CardItem>
        <CardItem>{description}</CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PostCard;
