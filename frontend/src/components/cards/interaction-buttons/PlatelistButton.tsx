import { Button } from '@/components/ui/button';
import { Disc } from 'lucide-react';
import React from 'react'

interface PlatelistButtonProps {
    atPlateList?: boolean;
    forHero?: boolean;
    }

const PlatelistButton:React.FC<PlatelistButtonProps> = ({atPlateList, forHero}) => {
  return (
    <div>
      <Button variant={"ghost"} className="">
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
}

export default PlatelistButton