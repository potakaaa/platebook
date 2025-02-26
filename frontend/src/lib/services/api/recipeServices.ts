import { axiosClient } from "../axiosClient";

//FETCHES 15 POSTS AT A TIME, ADD INFINITE SCROLL EFFECT 

const fetchFeed = async () => {
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