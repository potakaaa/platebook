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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const CommentButton = ({
  id,
  forHero,
  postName,
  postUser,
  commentCount: initialCommentCount,
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
  const [commentCount, setCommentCount] = useState(initialCommentCount ?? 0);
  const [commentInput, setCommentInput] = useState("");
  const { data, isLoading, isError, error, refetch } = useQueryGetComments(
    id,
    isDialogOpen
  );
  const { data: session, status } = useSession();

  const { mutate: postComment, isPending: isPosting } =
    useMutationPostComment();

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    setCommentCount((prev = 0) => prev + 1);
    postComment(
      { id, data: commentInput },
      {
        onSuccess: () => {
          setCommentInput("");

          refetch();
        },
        onError: () => {
          setCommentCount(initialCommentCount ?? 0);
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
            className="w-full max-w-sm sm:max-w-xl rounded-xl min-h-[400px] max-h-[600px] flex flex-col justify-center self-center overflow-y-auto pointer-events-auto"
            style={{ overscrollBehavior: "contain" }}
          >
            <DialogHeader
              className="text-left"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <DialogTitle className="text-lg ">Comments</DialogTitle>
              <span className="border-b border-muted border-dashed" />
              <div className="flex flex-col line-clamp-2 w-full max-w-sm">
                <span className="font-semibold text-sm">{postName}</span>
                <span className="text-xs">by {postUser}</span>
              </div>
            </DialogHeader>
            <div className="w-full h-full flex flex-col space-y-5">
              <ScrollArea className="h-[400px] flex flex-col">
                <section
                  id="comments"
                  className="flex flex-col justify-end space-y-3 h-[400px]"
                >
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
                    <div className="text-center items-end justify-end h-full text-sm text-muted-foreground">
                      No comments yet.
                    </div>
                  )}
                </section>
              </ScrollArea>
              <DialogFooter>
                <form
                  className="flex flex-row w-full gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePostComment();
                  }}
                >
                  <Input
                    placeholder="Enter comment here..."
                    className="p-3 text-sm"
                    value={commentInput}
                    disabled={isLoading || !session}
                    onChange={(e) => setCommentInput(e.target.value)}
                  ></Input>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={isPosting || isLoading}
                    onClick={() => {
                      if (!session) {
                        toast.error("Login to comment post!");
                        return;
                      }
                    }}
                  >
                    {isPosting || isLoading ? (
                      <Loader2 className="animate-spin size-5 text-primary" />
                    ) : (
                      <SendHorizonal className="size-5 text-primary drop-shadow-md" />
                    )}
                  </Button>
                </form>
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
