"use client";
import { Button } from "@/components/ui/button";
import { Disc } from "lucide-react";
import React, { useState } from "react";
import useMutationPlatelist from "@/hooks/tanstack/platelist/useMutationPlatelist";

interface PlatelistButtonProps {
  atPlateList?: boolean;
  forHero?: boolean;
  id: string;
}

const PlatelistButton: React.FC<PlatelistButtonProps> = ({
  atPlateList: initialPlated,
  forHero,
  id,
}) => {
  const { useMutationPostPlatelist, useMutationDeletePlatelistItem } =
    useMutationPlatelist();
  const [atPlateList, setAtPlateList] = useState<boolean | undefined>(
    initialPlated
  );
  const { mutate: addToPlate, isPending: addIsPending } =
    useMutationPostPlatelist();
  const { mutate: removeFromPlate, isPending: removeIsPending } =
    useMutationDeletePlatelistItem();
  const handleAddToPlate = () => {
    if (addIsPending || removeIsPending) return;

    if (forHero) {
      setAtPlateList((prev: boolean | undefined) => !prev);
      return;
    }

    if (atPlateList === false) {
      addToPlate(id, {
        onError: () => {
          setAtPlateList(initialPlated);
        },
      });
    } else {
      removeFromPlate(id, {
        onError: () => {
          setAtPlateList(initialPlated);
        },
      });
    }

    setAtPlateList((prev: boolean | undefined) => !prev);
  };

  return (
    <div>
      <Button variant={"ghost"} className="" onClick={handleAddToPlate}>
        <Disc
          className={`size-8 ${atPlateList ? "stroke-primary" : "fill-none"}`}
        />
        <span
          className={`hidden xl:block ${
            !forHero ? "sm:block lg:block" : "lg:hidden sm:block"
          } ${atPlateList ? "text-primary" : ""}`}
        >
          Add{atPlateList ? "ed" : ""} to Plate
        </span>
      </Button>
    </div>
  );
};

export default PlatelistButton;
