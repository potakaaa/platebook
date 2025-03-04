import React from "react";
import CustomAvatar from "../user/CustomAvatar";

const Comments = ({
  userName,
  userImg,
  comment,
}: {
  userName: string;
  userImg: string;
  comment: string;
}) => {
  return (
    <div className="w-full flex flex-row gap-3">
      <CustomAvatar userImage={userImg} userName={userName} />
      <p className="text-sm text-secondary-foreground leading-snug bg-card p-2 rounded-lg shadow">
        {comment}
      </p>
    </div>
  );
};

export default Comments;
