import PostCarousel from "@/components/post/PostCarousel";
import { CircleSmall } from "lucide-react";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <span
        id="post-name"
        className="text-lg sm:text-xl font-semibold text-center"
      >
        Post Name
      </span>
      <section id="carousel" className="w-full">
        <PostCarousel images={[]} />
      </section>
      <section id="description" className="gap-0 sm:gap-1 flex flex-col">
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
          Description
        </p>
        <p className="text-sm sm:text-base font-normal text-left">
          This is the desciription This is the desciription This is the
          desciription This is the desciription This is the desciription This is
          the desciription
        </p>
      </section>
      <span id="divider" className="w-full border-b border-muted" />
      <section
        id="ingredients"
        className="flex flex-col justify-start self-start gap-3"
      >
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
          Ingredients
        </p>
        <div id="ingredient-list" className="flex flex-col gap-2">
          <span className="flex flex-row gap-2 items-center ml-2">
            <CircleSmall className="size-3 sm:size-4 text-primary" />
            <p className="text-sm sm:text-base">Ingredient 1</p>
          </span>
          <span className="flex flex-row gap-2 items-center ml-2">
            <CircleSmall className="size-3 sm:size-4 text-primary" />
            <p className="text-sm sm:text-base">Ingredient 1</p>
          </span>
          <span className="flex flex-row gap-2 items-center ml-2">
            <CircleSmall className="size-3 sm:size-4 text-primary" />
            <p className="text-sm sm:text-base">Ingredient 1</p>
          </span>
        </div>
      </section>
      <span id="divider" className="w-full border-b border-muted" />
      <section
        id="steps"
        className="flex flex-col justify-start self-start gap-3"
      >
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
          Steps
        </p>
        <div id="steps-list" className="flex flex-col gap-2 ml-2">
          <span className="text-sm sm:text-base">
            <p className="font-semibold">Step 1:</p> Do this
          </span>
          <span className="text-sm sm:text-base">
            <p className="font-semibold">Step 2:</p> Do this Do this Do this
          </span>
          <span className="text-sm sm:text-base">
            <p className="font-semibold">Step 3:</p> Do this Do this Do this Do
            this Do this
          </span>
        </div>
      </section>
    </div>
  );
};

export default page;
