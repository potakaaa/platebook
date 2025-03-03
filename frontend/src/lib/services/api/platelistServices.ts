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
