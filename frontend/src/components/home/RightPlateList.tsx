"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import PlateDialog from "../PlateDialog";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { set } from "zod";
import { useSession } from "next-auth/react";

const RightPlateList = () => {
  const [plateList, setPlateList] = useState<PlatelistItem[]>([]);
  const { data: session } = useSession();
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
    if (session && plateList.length === 0) {
      fetchPlatelist();
    }
  }, [session]);

  if (!session) {
    return <p>You must be logged in to view your Plate List.</p>;
  }

  return (
    <div className="flex flex-col w-full space-y-5">
      <span className="text-primary lg:text-2xl font-bold">Plate List</span>
      <div className="flex flex-col space-y-3">
        {plateList?.map((plate, index) => (
          <PlateDialog
            key={index}
            postName={plate.recipe.title}
            postDesc={plate.recipe.description}
            postImg={plate.recipe.images.map((image) => image.image_url)}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPlateList;