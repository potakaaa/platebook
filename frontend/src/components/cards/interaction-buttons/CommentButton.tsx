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
import { MessageCircleMore, SendHorizonal } from "lucide-react";
import React from "react";
import Comments from "../Comments";

const CommentButton = ({
  forHero,
  postName,
  postUser,
}: {
  forHero: boolean;
  postName: string;
  postUser: string;
}) => {
  return (
    <div>
      {!forHero ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="">
              <MessageCircleMore className="size-8" />
              <span
                className={`hidden xl:block ${
                  !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
                }`}
              >
                Comment
              </span>
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
              <DialogDescription>
                <div className="flex flex-col line-clamp-2 w-full max-w-sm">
                  <p className="font-semibold text-sm">{postName}</p>
                  <p className="text-xs">by {postUser}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-full flex flex-col space-y-5">
              <section id="comments" className="flex flex-col space-y-3">
                <Comments
                  userName="Rald"
                  userImg=""
                  comment="lorem ipsumnida"
                />
              </section>
              <DialogFooter>
                <div className="flex flex-row w-full gap-2">
                  <Input
                    placeholder="Enter comment here..."
                    className="p-3 text-sm"
                  ></Input>
                  <Button variant="ghost" size="icon">
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
          <span
            className={`hidden xl:block ${
              !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
            }`}
          >
            Comment
          </span>
        </Button>
      )}
    </div>
  );
};

export default CommentButton;
