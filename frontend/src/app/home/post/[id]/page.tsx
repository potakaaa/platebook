'use client';
import Spinner from "@/components/loader/Spinner";
import PostCarousel from "@/components/post/PostCarousel";
import useQueryRecipe from "@/hooks/tanstack/recipe/useQueryRecipe";
import useSearchStore from "@/store/search/SearchState";
import { CircleSmall, Edit } from "lucide-react";
import React, { useEffect } from "react";
import IngredientComponent from "./components/IngredientComponent";
import StepComp from "./components/StepComp";
import { Ingredient, Step } from "@/lib/types/recipeTypes";
import { useUserStore } from "@/store/user/UserStore";
import EditButton from "@/components/userPage/EditButton";
import DeleteButton from "@/components/userPage/DeleteButton";
import useMutationRecipe from "@/hooks/tanstack/recipe/useMutationRecipe";
import { useRouter } from "next/navigation";

const page = (props: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { useQueryFetchRecipe } = useQueryRecipe();
  const { useMutationDeleteRecipe } = useMutationRecipe();
  const { mutate: deleteRecipe, isPending: isDeleting } =
    useMutationDeleteRecipe();
  const { user } = useUserStore();

  const params = React.use(props.params);

  const { data: recipe, isPending, error } = useQueryFetchRecipe(params.id);

  if (isPending) {
    return (
      <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
        <Spinner />
      </div>
    );
  }

  console.log("Recipe:", recipe);

  const imageUrls = recipe?.images.map((image: any) => image.image_url) || [];

  const handleRecipeEdit = () => {
    console.log("Edit recipe");
  };

  const handleRecipeDelete = () => {
    deleteRecipe(recipe?.id, {
      onSuccess: () => {
        router.push("/home");
      },
      onError: (error) => {
        console.error("Error deleting recipe:", error);
      },
    });
  };

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
      {recipe?.chef.userId === user?.id && (
        <div
          id="edit-button"
          className="w-full flex justify-between items-center"
        >
          <EditButton onClick={handleRecipeEdit} />
          <DeleteButton onClick={handleRecipeDelete} disabled={isDeleting} />
        </div>
      )}
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
