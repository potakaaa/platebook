"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../PlateDialog";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { useSession } from "next-auth/react";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [plateList, setPlateList] = useState<PlatelistItem[]>([]);
  const { data: session, status } = useSession();
  const fetchPlatelist = async () => {
    if (!session) return;
    try {
      const response = await getPlatelist();
      if (!response[0]?.cooklist_items) {
        setPlateList([]);
        return;
      }

      setPlateList(response[0].cooklist_items);
    } catch (error) {
      console.error("Error fetching plate list:", error);
    }
  };

  useEffect(() => {
    console.log("Plate List:", plateList);

    if (status === "authenticated" && plateList.length === 0) {
      fetchPlatelist();
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading Plate List...</p>;
  }

  if (status !== "authenticated") {
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
