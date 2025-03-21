import {
  deleteRecipe,
  editRecipe,
  postRecipe,
} from "@/lib/services/api/recipeServices";
import { EditRecipe, SubmitRecipe } from "@/lib/types/recipeTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const useMutationRecipe = () => {
  const queryClient = useQueryClient();

  const useMutationPostRecipe = () => {
    return useMutation({
      mutationFn: (data: SubmitRecipe) => postRecipe(data),
      onSuccess(data) {
        queryClient.invalidateQueries({
          queryKey: ["feed"],
        });
      },
      onError(error) {
        console.error("Post Recipe Error:", error);
      },
    });
  };

  const useMutationDeleteRecipe = () => {
    return useMutation({
      mutationFn: (id: string) => deleteRecipe(id),
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      },
      onError(error) {
        console.error("Delete Recipe Error:", error);
      },
    });
  };

  const useMutationEditRecipe = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: EditRecipe }) =>
        editRecipe(id, data),
      onSuccess(data, variables) {
        queryClient.invalidateQueries({ queryKey: ["recipe", variables.id] });
      },
      onError(error) {
        console.error("Edit Recipe Error:", error);
      },
    });
  };

  return {
    useMutationPostRecipe,
    useMutationDeleteRecipe,
    useMutationEditRecipe,
  };
};

export default useMutationRecipe;
