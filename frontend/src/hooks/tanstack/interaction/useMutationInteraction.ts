import { likeRecipe } from '@/lib/services/api/interactionServices';
import { useMutation } from '@tanstack/react-query';
import React from 'react'

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
  }


  return {
    useMutationLike
  }
}

export default useMutationInteraction