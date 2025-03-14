import {
  likeRecipe,
  shareRecipe,
  unlikeRecipe,
  unshareRecipe,
} from "@/lib/services/api/interactionServices";
import {
  addRecipeToPlatelist,
  removeRecipeFromPlatelist,
} from "@/lib/services/api/platelistServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use } from "react";
import useQueryPlatelist from "./useQueryPlatelist";
import { useUserStore } from "@/store/user/UserStore";

const useMutationPlatelist = () => {
  const queryClient = useQueryClient();

  const useMutationPostPlatelist = () => {
    return useMutation({
      mutationFn: (recipe_id: string) => addRecipeToPlatelist(recipe_id),
      onSuccess(data) {
        console.log("Platelsit add Success:", data);
        queryClient.invalidateQueries({ queryKey: ["platelist"] });
      },
      onError(error) {
        console.error("Platelist add Error:", error);
      },
    });
  };

  const useMutationDeletePlatelistItem = () => {
    return useMutation({
      mutationFn: (recipe_id: string) => removeRecipeFromPlatelist(recipe_id),
      onSuccess(data) {
        console.log("Platelsit delete Success:", data);
        queryClient.invalidateQueries({ queryKey: ["platelist"] });
      },
      onError(error) {
        console.error("Platelist delete Error:", error);
      },
    });
  };

  return {
    useMutationPostPlatelist,
    useMutationDeletePlatelistItem,
  };
};

export default useMutationPlatelist;
