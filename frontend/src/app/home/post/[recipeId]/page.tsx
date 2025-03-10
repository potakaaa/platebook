import PostCarousel from "@/components/post/PostCarousel";
import React from "react";
import IngredientComponent from "@/components/post/IngredientComponent";
import StepComp from "@/components/post/StepComp";
import { Ingredient, Step } from "@/lib/types/recipeTypes";
import PostEditButton from "@/components/post/PostEditButton";
import { Frown } from "lucide-react";
import { fetchPostByID } from "@/lib/services/api/recipeServices";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { recipeId: string };
}): Promise<Metadata> {
  try {
    const recipe = await fetchPostByID(params.recipeId);

    if (!recipe) {
      return {
        title: "Recipe Not Found - My Recipe App",
        description: "The recipe you're looking for does not exist.",
      };
    }

    const keywords = recipe.title
      .split(/\s+/)
      .map((word: string) => word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
      .filter((word: string) => word.length > 2)
      .join(", ");

    return {
      title: `${recipe.title} - Delicious Recipe`,
      description:
        recipe.description ||
        `Learn how to make ${recipe.title} with this step-by-step guide.`,
      keywords: keywords,
      openGraph: {
        title: recipe.title,
        description: recipe.description,
        images: recipe.images?.length
          ? [{ url: recipe.images[0].image_url, alt: recipe.title }]
          : [],
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Recipe - My Recipe App",
      description: "An error occurred while fetching the recipe.",
    };
  }
}

const page = async ({ params }: { params: { recipeId: string } }) => {
  // const { useQueryFetchRecipe } = useQueryRecipe();
  // const {
  //   data: recipe,
  //   isPending,
  //   error,
  // } = useQueryFetchRecipe(params.recipeId);

  // if (isPending) {
  //   return (
  //     <div className="w-full h-full items-center justify-center flex mt-10 overflow-hidden">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (error)
  //   return (
  //     <div className="flex flex-row gap-2 mt-10">
  //       <p>Error loading user</p>
  //       <Frown className="size-5 text-primary drop-shadow-sm" />
  //     </div>
  //   );

  let recipe;

  try {
    recipe = await fetchPostByID(params.recipeId);
  } catch (error: any) {
    console.error("Error loading recipe", error);
    return (
      <div className="flex flex-row gap-2 mt-10">
        <p>Error loading recipe</p>
        <Frown className="size-5 text-primary drop-shadow-sm" />
      </div>
    );
  }

  const imageUrls = recipe?.images?.map((image: any) => image.image_url) || [];

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <div className="flex flex-col gap-2">
        <span
          id="post-name"
          className="text-lg sm:text-xl font-semibold text-center w-full bg-primary text-white rounded-lg p-2 px-4 shadow-lg"
        >
          {recipe?.title}
        </span>
        <span
          id="post-chef"
          className="text-xs text-center sm:text-sm text-muted-foreground font-semibold border border-muted-foreground/40 rounded-full"
        >
          {recipe?.chef.username}
        </span>
      </div>
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
