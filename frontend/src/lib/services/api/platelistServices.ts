import { axiosClient } from "../axiosClient";

export const getPlatelist = async () => {
  try {
    const response = await axiosClient.get("/cooklists/");

    return response?.data || { cooklist_items: [] };
  } catch (err) {
    console.error("Error while fetching platelist:", err);

    return { cooklist_items: [] };
  }
};


export const addRecipeToPlatelist = async (recipe_id: string) => {
  try {
    console.log("Adding recipe to platelist:", recipe_id);

    const response = await axiosClient.post("/cooklist-items/", {
      recipe_id: recipe_id,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error adding recipe to platelist:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const removeRecipeFromPlatelist = async (recipeId: string) => {
  try {
    console.log("Removing recipe from platelist:", recipeId);
    const response = await axiosClient.delete(`/cooklist-items/${recipeId}/`);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error removing recipe from platelist:",
      error.response?.data
    );
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};