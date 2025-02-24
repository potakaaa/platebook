import { SignUpFormData } from "@/lib/types/authTypes";
import { axiosClient } from "../axiosClient";
import axios from "axios";


export const signUp = async (data: SignUpFormData) => {
  try {
    const response = await axiosClient.post("/auth/registration/", data);
    return response.data;
  } catch (error: any) {
    console.error("Signup Error:", error.response?.data); 
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};
