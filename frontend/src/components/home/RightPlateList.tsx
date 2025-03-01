import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import PlateDialog from "../PlateDialog";

const RightPlateList = () => {
  return (
    <div className="flex flex-col w-full space-y-5">
      <span className="text-primary lg:text-2xl font-bold">Plate List</span>
      <div className="flex flex-col space-y-3">
        {plateList.map((plate, index) => (
          <PlateDialog
            key={index}
            postName={plate.name}
            postDesc={plate.desc}
            postImg={plate.img}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPlateList;

const plateList = [
  {
    name: "Plate List 1",
    desc: "Plate Desc 1 Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1Plate Desc 1",
    img: "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg",
  },
  {
    name: "Plate List 2",
    desc: "Plate Desc 2",
    img: "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg",
  },
  {
    name: "Plate List 3",
    desc: "Plate Desc 3",
    img: "https://makeyourasia.com/templates/yootheme/cache/09/3-09a03ff0.jpeg",
  },
];
