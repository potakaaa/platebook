import React from "react";
import CustomAvatar from "../user/CustomAvatar";
import { useRouter } from "next/navigation";

const Comments = ({
  userId,
  userName,
  userImg,
  comment,
}: {
  userId: string;
  userName: string;
  userImg: string;
  comment: string;
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-row gap-3">
      <CustomAvatar
        userImage={userImg}
        userName={userName}
        onClick={() => router.push(`/home/user/${userId}`)}
      />
      <p className="text-sm text-secondary-foreground leading-snug bg-card p-2 rounded-lg shadow">
        {comment}
      </p>
    </div>
  );
};

export default Comments;
