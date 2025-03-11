"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../../PlateDialog";
import { useUserStore } from "@/store/user/UserStore";
import { Disc, Loader2 } from "lucide-react";
import Link from "next/link";
import useQueryPlatelist from "@/hooks/tanstack/platelist/useQueryPlatelist";
import { ScrollArea } from "@/components/ui/scroll-area";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { user, platelist } = useUserStore();

  const { useQueryGetPlatelist } = useQueryPlatelist();
  const { isFetching: isFetchingPlateList, error } = useQueryGetPlatelist();

  if (!user) {
    return (
      <div className="flex flex-row w-full items-center justify-center ">
        <Link href={"/login"} className="hover:underline flex flex-row gap-2">
          <p className="text-sm">Log In to view Platelist</p>
          <Disc className="text-primary size-5" />
        </Link>
      </div>
    );
  }

  if (isFetchingPlateList && platelist?.length === 0) {
    return (
      <span className="w-full flex items-center justify-center my-5 gap-3">
        <Loader2 className="animate-spin text-primary size-5" />

        <p>Loading Plate List</p>
      </span>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-5">
      {!isMobile && (
        <span className="text-primary lg:text-2xl font-bold">Plate List</span>
      )}
      <div className="flex flex-col space-y-3">
        {platelist?.length === 0 && (
          <span className="w-full flex justify-center items-center text-xs sm:text-sm my-10 gap-2">
            <p>Add recipes to your Plate List!</p>
            <Disc className="text-primary size-5" />
          </span>
        )}
        <ScrollArea className="h-screen pb-10">
          <div className="flex flex-col w-full gap-2">
            {platelist?.map((plate, index) => (
              <PlateDialog
                key={index}
                postId={plate.recipe.id}
                postName={plate.recipe.title}
                postDesc={plate.recipe.description}
                postImg={
                  plate.recipe.images?.map((img) => img.image_url) || [
                    plate.recipe.images?.[0].image_url,
                  ]
                }
                isMobile={isMobile}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RightPlateList;
