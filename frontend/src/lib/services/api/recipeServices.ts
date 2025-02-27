import { SubmitRecipe } from "@/lib/types/recipeTypes";
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
