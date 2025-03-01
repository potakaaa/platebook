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

const PlateDialog = ({
  postName,
  postDesc,
  postImg,
}: {
  postName: string;
  postDesc: string;
  postImg: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-3 items-start cursor-pointer hover:bg-muted/80 rounded-xl p-2 transition duration-200">
            <span className="size-14 rounded-lg overflow-hidden">
              <Image
                src={postImg}
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
          {/* should make this button not a trigger */}
          <span className="flex items-center cursor-pointer hover:bg-muted/80 rounded-full p-2 transition duration-200">
            <IconTrash className="size-5 text-destructive" />
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-7 rounded-xl py-12 space-y-2">
        <DialogTitle className="overflow-hidden">
          <AspectRatio ratio={16 / 9} className="w-full rounded-lg">
            <Image src={postImg} alt={postName} fill className="rounded-lg" />
          </AspectRatio>
        </DialogTitle>
        <DialogDescription>
          <div className="flex flex-col">
            <p className="text-2xl font-bold">{postName}</p>
            <p className="text-base">{postDesc}</p>
          </div>
        </DialogDescription>
        <DialogFooter className="flex flex-row w-full my-3">
          <DialogClose asChild>
            <Button type="button" variant={"destructive"}>
              Close
            </Button>
          </DialogClose>
          <Button type="button">View Recipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlateDialog;
