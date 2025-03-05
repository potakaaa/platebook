import { axiosClient } from "../axiosClient"

export const likeRecipe = async (id: string) => {
  try {
    const response = await axiosClient.post(`/recipes/${id}/likes/`);

    return response;
  } catch (error: any) {
    console.error("Like Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const unlikeRecipe = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/recipes/${id}/likes/69/`); // ARBITRARY END URL, its just to bypass djangos checks, delete method was overriden in the backend

    return response;
  } catch (error: any) {
    console.error("Unlike Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};


export const shareRecipe = async (id: string) => {
  try {
    const response = await axiosClient.post(`/recipes/${id}/shares/`);

    return response;
  } catch (error: any) {
    console.error("Share Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const unshareRecipe = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/recipes/${id}/shares/69/`); // ARBITRARY END URL, its just to bypass djangos checks, delete method was overriden in the backend

    return response;
  } catch (error: any) {
    console.error("Unshare Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};


export const getRecipeComments = async (id: string) => {
  try {
    console.log("ID", id);
    const response = await axiosClient.get(`/recipes/${id}/comments/`);

    console.log("Comments", response);
    return response.data;
  } catch (error: any) {
    console.error("Recipe Comments Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const postRecipeComment = async (id: string, comment: string) => {
  try {
    const response = await axiosClient.post(`/recipes/${id}/comments/`, {
      recipe: id,
      content: comment,
    });

    return response.data;
  } catch (error: any) {
    console.error("Recipe Comment Post Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};