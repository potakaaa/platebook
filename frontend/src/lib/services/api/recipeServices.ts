import { SubmitRecipe } from "@/lib/types/recipeTypes";
import { axiosClient } from "../axiosClient";
import exp from "constants";

//FETCHES 15 POSTS AT A TIME, ADD INFINITE SCROLL EFFECT 

export const fetchFeed = async () => {
  try {
    const response = await axiosClient.get("/feed/");
    return response.data;
  } catch (error: any) {
    console.error("Fetch Feed Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const postRecipe = async (data: SubmitRecipe) => {
  try{
    const response = await axiosClient.post("/recipes/", {
      title: data.title, 
      description: data.description, 
      origin_country: data.origin_country
    })
    
    const id = response.data.id

    data.ingredients.forEach(async (ingredient) => {
      const response = await axiosClient.post(`/recipes/${id}/ingredients`, ingredient)

      return response
    })

  

  } catch (error: any){
    console.error("Recipe Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
}