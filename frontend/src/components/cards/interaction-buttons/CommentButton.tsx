"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, MessageCircleMore, SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import Comments from "../Comments";
import useQueryInteraction from "@/hooks/tanstack/interaction/useQueryInteractions";
import useMutationInteraction from "@/hooks/tanstack/interaction/useMutationInteraction";

const CommentButton = ({
  id,
  forHero,
  postName,
  postUser,
  commentCount = 0,
}: {
  id: string;
  forHero: boolean;
  postName: string;
  postUser: string;
  commentCount?: number;
}) => {
  const { useQueryGetComments } = useQueryInteraction();
  const { useMutationPostComment } = useMutationInteraction();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { data, isLoading, isError, error, refetch } = useQueryGetComments(
    id,
    isDialogOpen
  );

  const { mutate: postComment, isPending: isPosting } =
    useMutationPostComment();

  const handlePostComment = () => {
    if (!commentInput.trim()) return;

    postComment(
      { id, data: commentInput },
      {
        onSuccess: () => {
          setCommentInput("");
          refetch();
        },
      }
    );
  };

  return (
    <div>
      {!forHero ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="p-1 sm:p-3">
              <MessageCircleMore className="size-8" />
              <span
                className={`hidden xl:block ${
                  !forHero ? "sm:hidden xl:block" : "lg:hidden sm:block"
                }`}
              >
                Comment
              </span>
              <p className="text-xs self-center">{`(${commentCount})`}</p>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="w-full max-w-xl rounded-xl min-h-[400px] max-h-[600px] flex flex-col justify-between overflow-y-auto pointer-events-auto"
            style={{ overscrollBehavior: "contain" }}
          >
            <DialogHeader
              className="text-left"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <DialogTitle className="text-lg ">Comments</DialogTitle>
              <div className="flex flex-col line-clamp-2 w-full max-w-sm">
                <span className="font-semibold text-sm">{postName}</span>
                <span className="text-xs">by {postUser}</span>
              </div>
            </DialogHeader>
            <div className="w-full h-full flex flex-col space-y-5">
              <section id="comments" className="flex flex-col space-y-3">
                {isLoading ? (
                  <span className="text-center text-sm text-muted-foreground flex flex-row w-full items-center justify-center gap-1">
                    <Loader2 className="size-5 animate-spin text-primary" />
                    Loading comments
                  </span>
                ) : isError ? (
                  <div>Error: {error.message}</div>
                ) : data?.length > 0 ? (
                  data.map((comment: any) => (
                    <Comments
                      key={comment.id}
                      userId={comment.user.userId}
                      userName={comment.user.username}
                      userImg={comment.user.pfp_url}
                      comment={comment.content}
                    />
                  ))
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    No comments yet.
                  </div>
                )}
              </section>
              <DialogFooter>
                <div className="flex flex-row w-full gap-2">
                  <Input
                    placeholder="Enter comment here..."
                    className="p-3 text-sm"
                    value={commentInput}
                    disabled={isLoading}
                    onChange={(e) => setCommentInput(e.target.value)}
                  ></Input>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePostComment}
                    disabled={isPosting || isLoading}
                  >
                    <SendHorizonal className="size-5" />
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button variant={"ghost"} className="">
          <MessageCircleMore className="size-8" />
          <div
            className={`hidden xl:block ${
              !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
            }`}
          >
            Comment
          </div>
        </Button>
      )}
    </div>
  );
};

export default CommentButton;
