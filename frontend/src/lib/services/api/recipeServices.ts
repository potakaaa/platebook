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

  /*
  EXAMPLE RESPONSE:

    {
    "count": 1, 
    "next": null,      // Indicates if there are more pages to load
    "previous": null,   
    "results": [
        {
            "id": 1,
            "title": "Hans Del Mundo's Palabok Espesyal",
            "description": "The greatest palabok that will ever touch your tongue, get ready to be amazed",
            "chef": {
                "username": "testuser",
                "pfp_url": null
            },
            "origin_country": "Philippines",
            "created_at": "2025-02-24T14:10:28.106415Z",
            "images": [
                {
                    "id": 12,
                    "image_url": "http://res.cloudinary.com/dnxsmo7x0/image/upload/v1740411152/recipe_images/axdtrzis61hs1m7gjent.jpg"
                },
                {
                    "id": 13,
                    "image_url": "http://res.cloudinary.com/dnxsmo7x0/image/upload/v1740411210/recipe_images/cvcmzhoj9pzhmuseqfd7.webp"
                },
                {
                    "id": 14,
                    "image_url": "http://res.cloudinary.com/dnxsmo7x0/image/upload/v1740411220/recipe_images/ubkmytbpfvhztxhhorby.jpg"
                }
            ],
            "likes": 1,
            "shares": 0
        }
    ]
}

  */
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
    images.forEach((image) => {
      formData.append("images", image);
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
    steps.forEach(async (step) => {
      const response = await axiosClient.post(`/recipes/${id}/steps/`, step);
      return response;
    });
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
    ingredients.forEach(async (ingredient) => {
      const response = await axiosClient.post(
        `/recipes/${id}/ingredients/`,
        ingredient
      );

      return response;
    });
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
