import {
  likeRecipe,
  shareRecipe,
  unlikeRecipe,
  unshareRecipe,
} from "@/lib/services/api/interactionServices";
import { addRecipeToPlatelist, removeRecipeFromPlatelist } from "@/lib/services/api/platelistServices";
import { useMutation } from "@tanstack/react-query";
import React, { use } from "react";

const useMutationPlatelist = () => {
  const useMutationPostPlatelist = () => {
    return useMutation({
      mutationFn: (recipe_id: string) => addRecipeToPlatelist(recipe_id),
      onSuccess(data) {
        console.log("Platelsit add Success:", data);
      },
      onError(error) {
        console.error("Platelist add Error:", error);
      },
    });
  }

  const useMutationDeletePlatelistItem = () => {
    return useMutation({
      mutationFn: (recipe_id: string) => removeRecipeFromPlatelist(recipe_id),
      onSuccess(data) {
        console.log("Platelsit delete Success:", data);
      },
      onError(error) {
        console.error("Platelist delete Error:", error);
      },
    });}

    return {
        useMutationPostPlatelist,
        useMutationDeletePlatelistItem
    }
};

export default useMutationPlatelist;
