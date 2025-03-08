import useQueryRecipe from "@/hooks/tanstack/recipe/useQueryRecipe";
import { useUserStore } from "@/store/user/UserStore";
import React from "react";
import EditRecipeDialog from "./EditRecipeDialog";
import DeleteButton from "../userPage/DeleteButton";
import { FullRecipe } from "@/lib/types/recipeTypes";

const PostEditButton = ({ id, recipe }: { id: string, recipe: FullRecipe }) => {
  const { user } = useUserStore();

  
  return (
    <>
      {recipe?.chef.userId === user?.id && (
        <div
          id="edit-button"
          className="w-full flex justify-between items-center"
        >
          <EditRecipeDialog recipe={recipe} id={id} />
          <DeleteButton id={id} />
        </div>
      )}
    </>
  );
};

export default PostEditButton;
