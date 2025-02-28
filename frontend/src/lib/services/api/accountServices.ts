import { ResetPasswordFormData, SignUpFormData } from "@/lib/types/authTypes";
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

export const forgotPasswordRequest = async (email: string) => {
  try {
    const response = await axiosClient.post("/auth/otp-reset/", {
      email,
    });

    return response.data;
  } catch (error: any) {
    console.error("Forgot Password Request Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const forgotPasswordVerify = async (data: ResetPasswordFormData) => {
  try {
    const response = await axiosClient.post("/auth/verify-otp/", data);

    return response.data;
  } catch (error: any) {
    console.error("Forgot Password Verify Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};
