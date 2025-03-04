import {
  likeRecipe,
  unlikeRecipe,
} from "@/lib/services/api/interactionServices";
import { useMutation } from "@tanstack/react-query";
import React, { use } from "react";

const useMutationInteraction = () => {
  const useMutationLike = () => {
    return useMutation({
      mutationFn: (id: string) => likeRecipe(id),
      onSuccess(data) {
        console.log("Like Success:", data);
      },
      onError(error) {
        console.error("Like Error:", error);
      },
    });
  };

  const useMutationUnlike = () => {
    return useMutation({
      mutationFn: (id: string) => unlikeRecipe(id),
      onSuccess(data) {
        console.log("Unlike Success:", data);
      },
      onError(error) {
        console.error("Unlike Error:", error);
      },
    });
  };

  return {
    useMutationLike,
    useMutationUnlike,
  };
};

export default useMutationInteraction;
