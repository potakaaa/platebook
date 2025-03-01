import { axiosClient } from "../axiosClient"

export const likeRecipe = async (recipeId: number) => {
  try {
    const response = await axiosClient.post(`/recipes/${recipeId}/likes`)

    return response
  } catch (error: any){
    console.error("Like Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
}