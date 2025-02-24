import React from "react";

type FeatureProps = {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
};

const Features = ({ id, title, desc, icon: Icon }: FeatureProps) => {
  return (
    <div
      id={`feature-container-${id}`}
      className="flex flex-col space-y-3 justify-start items-center  text-center w-full"
    >
      <div
        id={`feature-head-${id}`}
        className="flex flex-row items-center space-x-2"
      >
        <Icon className="size-8 sm:size-9 lg:size-8 xl:size-9 text-primary drop-shadow-md" />
        <span className="font-semibold text-sm sm:text-base lg:text-sm xl:text-base">
          {title}
        </span>
      </div>
      <p className="w-full max-w-md text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:max-w-sm">
        {desc}
      </p>
    </div>
  );
};

export default Features;
