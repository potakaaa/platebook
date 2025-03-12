import {
  EditRecipe,
  Ingredient,
  Step,
  SubmitRecipe,
} from "@/lib/types/recipeTypes";
import { axiosClient } from "../axiosClient";
import exp from "constants";
import axios from "axios";

//FETCHES 15 POSTS AT A TIME, ADD INFINITE SCROLL EFFECT

export const fetchFeed = async (page = 1) => {
  try {
    const response = await axiosClient.get(`/feed/?page=${page}`);
    console.log("Feed Response", response.data);
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
    const response = await axiosClient.get(`/following/?page=${page}`);
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
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("origin_country", data.origin_country);

    formData.append("ingredients", JSON.stringify(data.ingredients));

    formData.append("steps", JSON.stringify(data.steps));

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
    }

    const response = await axiosClient.post("/recipe-upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Recipe Post Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }
    throw new Error("An unknown error occurred.");
  }
};



export const searchRecipe = async (search: string, page: number) => {
  try {
    const response = await axiosClient.get(
      `/search/?search=${search}&page=${page}`
    );

    console.log("Search Response", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while searching recipes:", err);

    return [];
  }
};

export const fetchRecipe = async (id: string) => {
  try {
    const response = await axiosClient.get(`/recipes/${id}/`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while fetching recipe:", err);

    return [];
  }
};

export const fetchUserRecipes = async (id: string, page: number) => {
  try {
    const response = await axiosClient.get(
      `/users/${id}/recipes/?page=${page}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while fetching user recipes:", err);

    return [];
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/recipes/${id}/`);

    if (response.status === 204) {
      return response.data;
    } else {
      console.error("Error: Unexpected response status", response.status);
    }
  } catch (err) {
    console.error("Error while deleting recipe:", err);

    return [];
  }
};

export const editRecipe = async (id: string, data: EditRecipe) => {
  try {
    const formData = new FormData();

    const existingIngredientIds = data.ingredients
      .filter((ingredient) => ingredient.id)
      .map((ingredient) => ingredient.id);

    formData.append(
      "existing_ingredients",
      JSON.stringify(existingIngredientIds)
    );
    let allIngredients = data.ingredients;
    formData.append("ingredients", JSON.stringify(allIngredients));

    const existingStepsIds = data.steps
      .filter((step) => step.id)
      .map((step) => step.id);
    formData.append("existing_steps", JSON.stringify(existingStepsIds));

    let allSteps = data.steps;
    allSteps = allSteps.map((step, index) => ({
      ...step,
      step_num: index + 1,
    }));

    formData.append("steps", JSON.stringify(allSteps));
    formData.append("existing_steps", JSON.stringify(existingStepsIds));

    const keptImageIds = data.images
      .filter((image) => image.id)
      .map((image) => image.id);
    formData.append("existing_images", JSON.stringify(keptImageIds));

    data.images.forEach((image) => {
      if (image.image && !image.id) {
        formData.append("images", image.image);
      }
    });

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("origin_country", data.origin_country);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axiosClient.put(`/recipes/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export async function fetchPostByID(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}recipes/${id}/`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

