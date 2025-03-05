import {
  likeRecipe,
  postRecipeComment,
  shareRecipe,
  unlikeRecipe,
  unshareRecipe,
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

  const useMutationShare = () => {
    return useMutation({
      mutationFn: (id: string) => shareRecipe(id),
      onSuccess(data) {
        console.log("Share Success:", data);
      },
      onError(error) {
        console.error("Share Error:", error);
      },
    });
  };

  const useMutationUnshare = () => {
    return useMutation({
      mutationFn: (id: string) => unshareRecipe(id),
      onSuccess(data) {
        console.log("Unshare Success:", data);
      },
      onError(error) {
        console.error("Unshare Error:", error);
      },
    });
  };

  const useMutationPostComment = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: string }) =>
        postRecipeComment(id, data),
      onSuccess(data) {
        console.log("Post Comment Success:", data);
      },
      onError(error) {
        console.error("Post Comment Error:", error);
      },
    });
  };

  return {
    useMutationLike,
    useMutationUnlike,
    useMutationShare,
    useMutationUnshare,
    useMutationPostComment,
  };
};

export default useMutationInteraction;
