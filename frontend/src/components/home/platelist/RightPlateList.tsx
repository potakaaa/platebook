"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../../PlateDialog";
import { useUserStore } from "@/store/user/UserStore";
import { Disc, Loader2 } from "lucide-react";
import Link from "next/link";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { user, plateList, fetchPlateList, isFetchingPlateList } =
    useUserStore();

  useEffect(() => {
    if (plateList.length === 0 && user !== null) {
      fetchPlateList();
    }
  }, [user]);

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

  if (isFetchingPlateList) {
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
        {plateList?.map((plate, index) => (
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
    </div>
  );
};

export default RightPlateList;
