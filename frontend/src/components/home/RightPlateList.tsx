"use client";
import React, { useEffect, useState } from "react";
import PlateDialog from "../PlateDialog";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { useSession } from "next-auth/react";

const RightPlateList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [plateList, setPlateList] = useState<PlatelistItem[]>([]);
  const { data: session } = useSession();
  const fetchPlatelist = async () => {
    if (!session) return;
    try {
      const response = await getPlatelist();

      console.log("Plate List Response:", response);

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
    if (session && plateList.length === 0) {
      fetchPlatelist();
    }
  }, [session]);

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
          />
        ))}
      </div>
    </div>
  );
};

export default RightPlateList;
