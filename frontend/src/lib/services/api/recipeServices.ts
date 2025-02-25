import { axiosClient } from "../axiosClient";

export const getRecipes = async () => {
    try {
        const response = await axiosClient.get("recipes/");
        return response.data;
    } catch (error) {
        console.error("Error getting recipes", error);
        return null;
    }
};