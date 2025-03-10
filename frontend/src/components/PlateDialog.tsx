"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import PlateImageCarousel from "./home/platelist/PlateImageCarousel";
import { ChevronDown, Trash2, View } from "lucide-react";
import ToolTipButton from "./home/buttons/ToolTipButton";
import { useRouter } from "next/navigation";

const PlateDialog = ({
  postId,
  postName,
  postDesc,
  postImg,
  isMobile = false,
}: {
  postId: number;
  postName: string;
  postDesc: string;
  postImg: string[];
  isMobile?: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row space-x-3 justify-start self-start items-start cursor-pointer hover:bg-muted/80 rounded-xl p-2 transition duration-200">
          <span className="size-14 rounded-lg overflow-hidden">
            <Image
              src={postImg[0]}
              alt={postName}
              className="size-20 object-cover aspect-square "
              width={200}
              height={200}
            />
          </span>
          <section
            className={`flex flex-col ${
              isMobile ? "w-full sm:w-60" : "w-24 lg:w-40 xl:w-44 2xl:w-64"
            } `}
          >
            <p className="font-semibold text-sm lg:text-base xl:text-lg truncate">
              {postName}
            </p>
            <p className="text-xs sm:text-sm lg:text-xs xl:text-sm truncate">
              {postDesc}
            </p>
          </section>
        </div>
      </DialogTrigger>
      <DialogContent
        className="pointer-events-auto w-[300px] sm:w-[500px] lg:w-[600px] rounded-lg  pb-0 sm:pb-2"
        style={{ overscrollBehavior: "contain" }}
        forceMount
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col pt-2 px-1 sm:pt-5 sm:px-3 rounded-xl w-full dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative  items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <DialogTitle className="w-full">
            <PlateImageCarousel
              images={postImg}
              title={postName}
              desc={postDesc}
            />
          </DialogTitle>
          <DialogFooter className="flex flex-row w-full my-3 z-30 justify-end gap-2 mt-5">
            <DialogClose asChild autoFocus={false}>
              <ToolTipButton
                btnType="button"
                btnVariant="secondary"
                btnClassName="text-xs lg:text-sm"
                btnChildren={
                  <>
                    <ChevronDown className="size-6" />
                    <p className="hidden sm:block">Close</p>
                  </>
                }
                tipChildren={<p className="text-xs lg:text-sm">Close Recipe</p>}
              />
            </DialogClose>

            <ToolTipButton
              btnType="button"
              btnVariant="destructive"
              btnClassName="text-xs lg:text-sm px-3"
              btnChildren={
                <>
                  <Trash2 className="size-6" />
                  <p className="hidden sm:block">Remove</p>
                </>
              }
              tipChildren={<p className="text-xs lg:text-sm">Delete Recipe</p>}
            />

            <ToolTipButton
              btnType="button"
              btnVariant="default"
              onClick={() => {
                router.push(`/home/post/${postId}`);
                setOpen(false);
              }}
              btnClassName="text-xs lg:text-sm px-3"
              btnChildren={
                <>
                  <View className="size-6" />
                  <p className="hidden sm:block">View Recipe</p>
                </>
              }
              tipChildren={<p className="text-xs lg:text-sm">View Recipe</p>}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlateDialog;
