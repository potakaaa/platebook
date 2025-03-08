"use client";

import Spinner from "@/components/loader/Spinner";
import PostCarousel from "@/components/post/PostCarousel";
import useQueryRecipe from "@/hooks/tanstack/recipe/useQueryRecipe";
import React from "react";
import IngredientComponent from "@/components/post/IngredientComponent";
import StepComp from "@/components/post/StepComp";
import { Ingredient, Step } from "@/lib/types/recipeTypes";
import { useUserStore } from "@/store/user/UserStore";
import DeleteButton from "@/components/userPage/DeleteButton";
import EditRecipeDialog from "@/components/post/EditRecipeDialog";
import PostEditButton from "@/components/post/PostEditButton";
import { Frown } from "lucide-react";

const page = (props: { params: Promise<{ recipeId: string }> }) => {
  const params = React.use(props.params);

  const { useQueryFetchRecipe } = useQueryRecipe();
  const {
    data: recipe,
    isPending,
    error,
  } = useQueryFetchRecipe(params.recipeId);

  if (isPending) {
    return (
      <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
        <Spinner />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex flex-row gap-2 mt-10">
        <p>Error loading user</p>
        <Frown className="size-5 text-primary drop-shadow-sm" />
      </div>
    );

  const imageUrls = recipe?.images.map((image: any) => image.image_url) || [];

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <span
        id="post-name"
        className="text-lg sm:text-xl font-semibold text-center"
      >
        {recipe?.title}
      </span>
      <span
        id="post-chef"
        className="text-xs sm:text-sm text-muted-foreground font-semibold"
      >
        {recipe?.chef.username}
      </span>
      <PostEditButton id={params.recipeId} recipe={recipe} />
      <section id="carousel" className="w-full">
        <PostCarousel images={imageUrls} />
      </section>
      <section id="description" className="gap-0 sm:gap-1 flex flex-col">
        <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
          Description
        </p>
        <p className="text-sm sm:text-base font-normal text-left">
          {recipe?.description}
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
          {recipe?.ingredients.map((ingredient: Ingredient, index: number) => (
            <IngredientComponent key={index} {...ingredient} />
          ))}
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
          {recipe?.steps.map((step: Step, index: number) => (
            <StepComp key={step.step_num} {...step} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
