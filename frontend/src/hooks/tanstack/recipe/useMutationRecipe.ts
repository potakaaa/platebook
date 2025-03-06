import { deleteRecipe, postRecipe } from '@/lib/services/api/recipeServices';
import { SubmitRecipe } from '@/lib/types/recipeTypes';
import { useMutation } from '@tanstack/react-query';
import React from 'react'

const useMutationRecipe = () => {
    const useMutationPostRecipe = () => {
        return useMutation({
            mutationFn: (data: SubmitRecipe) => postRecipe(data),
            onSuccess(data) {
                console.log("Post Recipe Success:", data);
            },
            onError(error) {
                console.error("Post Recipe Error:", error);
            },
        });
    }

    const useMutationDeleteRecipe = () => {
        return useMutation({
            mutationFn: (id: string) => deleteRecipe(id),
            onSuccess(data) {
                console.log("Delete Recipe Success:", data);
            },
            onError(error) {
                console.error("Delete Recipe Error:", error);
            },
        });
    }
    
    return {
        useMutationPostRecipe,
        useMutationDeleteRecipe
    }
}

export default useMutationRecipe