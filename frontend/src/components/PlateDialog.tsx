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
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { IconTrash } from "@tabler/icons-react";
import PlateImageCarousel from "./home/platelist/PlateImageCarousel";

const PlateDialog = ({
  postName,
  postDesc,
  postImg,
}: {
  postName: string;
  postDesc: string;
  postImg: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row space-x-3 items-start cursor-pointer hover:bg-muted/80 rounded-xl p-2 transition duration-200">
          <span className="size-14 rounded-lg overflow-hidden">
            <Image
              src={postImg[0]}
              alt={postName}
              className="size-20 object-cover aspect-square "
              width={200}
              height={200}
            />
          </span>
          <section className="flex flex-col w-24 xl:w-32 2xl:w-44">
            <p className="font-semibold lg:text-base xl:text-lg truncate">
              {postName}
            </p>
            <p className="lg:text-xs xl:text-sm truncate">{postDesc}</p>
          </section>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <div className="flex flex-col pt-5 px-3 rounded-xl w-full bg-background  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative  items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <DialogTitle className="py-5">
            <PlateImageCarousel
              images={postImg}
              title={postName}
              desc={postDesc}
            />
          </DialogTitle>
          <DialogFooter className="flex flex-row w-full my-3 z-30">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant={"destructive"}>
              Remove
            </Button>
            <Button type="button">View Recipe</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlateDialog;
