"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../PlateDialog";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { user, plateList, fetchPlateList, isFetchingPlateList } =
    useUserStore();

  useEffect(() => {
    console.log("plateList", plateList);

    if (plateList.length === 0 && user) {
      fetchPlateList();
    }
  }, [user, plateList]);

  if (!user) {
    return <p>You must be logged in to view your Plate List..</p>;
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
            postName={plate.recipe.title}
            postDesc={plate.recipe.description}
            postImg={[plate.recipe.images[0].image_url]}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPlateList;
