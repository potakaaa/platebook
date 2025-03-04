import { Ingredient, Step, SubmitRecipe } from "@/lib/types/recipeTypes";
import { axiosClient } from "../axiosClient";
import exp from "constants";

//FETCHES 15 POSTS AT A TIME, ADD INFINITE SCROLL EFFECT

export const fetchFeed = async (page = 1) => {
  try {
    const response = await axiosClient.get(`/feed/?page=${page}`);

    return response.data;
  } catch (error: any) {
    console.error("Fetch Feed Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const fetchFollowingFeed = async (page = 1) => {
  try {

    const response = await axiosClient.get(
      `/feed/?filter=following&page=${page}`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Fetch Following Feed Error:",
      error.response?.data || error.message
    );

    if (error.response?.data) {
      throw new Error(JSON.stringify(error.response.data));
    }

    throw new Error(
      "An unknown error occurred while fetching the following feed."
    );
  }
};


export const postRecipe = async (data: SubmitRecipe) => {
  try {
    const response = await axiosClient.post("/recipes/", {
      title: data.title,
      description: data.description,
      origin_country: data.origin_country,
    });

    const id = response.data.id;

    if (data.images) {
      await postRecipeImages(id, data.images);
    }

    if (data.steps) {
      await postRecipeSteps(id, data.steps);
    }

    if (data.ingredients) {
      await postRecipeIngredients(id, data.ingredients);
    }

    return response.data;
  } catch (error: any) {
    console.error("Recipe Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

const postRecipeImages = async (id: number, images: File[]) => {
  try {
    const formData = new FormData();

    // Append each image to the FormData
    images.forEach((image) => {
      formData.append("image", image);
    });

    const response = await axiosClient.post(
      `/recipes/${id}/images/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error("Recipe Image Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

const postRecipeSteps = async (id: number, steps: Step[]) => {
  try {
    const response = await axiosClient.post(
      `/recipes/${id}/steps/`,
      steps, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error("Recipe Steps Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

const postRecipeIngredients = async (id: number, ingredients: Ingredient[]) => {
  try {
    const response = await axiosClient.post(
      `/recipes/${id}/ingredients/`,
      ingredients,  
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error("Recipe Ingredients Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};



export const searchRecipe = async (search: string) => {
  try {
    const response = await axiosClient.get(`/search/?search=${search}`);

    if (response.status === 200) {
      return response;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while searching recipes:", err);

    return [];
  }
};

export const fetchRecipe = async (id: number) => {
  try {
    const response = await axiosClient.get(`/recipes/${id}/`);

    if (response.status === 200) {
      return response;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while fetching recipe:", err);

    return [];
  }
};
