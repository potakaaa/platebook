"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../PlateDialog";
import { useUserStore } from "@/store/useUserStore";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { session, plateList, fetchPlateList } = useUserStore();

  useEffect(() => {
    console.log("Plate List:", plateList);

    if (plateList.length === 0 && session) {
      fetchPlateList();
    }
  }, []);

  if (!session) {
    return <p>You must be logged in to view your Plate List.</p>;
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
