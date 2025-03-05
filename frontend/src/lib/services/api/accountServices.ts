import { ResetPasswordFormData, SignUpFormData } from "@/lib/types/authTypes";
import { axiosClient } from "../axiosClient";

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
    const response = await axiosClient.post("/auth/otp-request/", {
      email: email,
    });

    if (response.status !== 200) {
      throw new Error("Error sending OTP email");
    }

    return response.data;
  } catch (error: any) {
    console.error("Forgot Password Request Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const forgotPasswordVerify = async (otp: string) => {
  try {
    const response = await axiosClient.post(
      "/auth/verify-otp/",
      {
        otp: otp,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    console.error("Forgot Password Verify Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const verifiedPasswordReset = async (data: ResetPasswordFormData) => {
  try {
    const response = await axiosClient.post("/auth/reset-password/", data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("Password reset Error:", error.response?.data);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const getUserByID = async (id: string) => {
  try {
    const response = await axiosClient.get(`/users/${id}/`);

    console.log("Get User By ID:", response);

    return response.data;
  } catch (error: any) {
    console.error("Get User By ID Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await axiosClient.patch(`/users/${id}/update/`, data);

    return response.data;
  } catch (error: any) {
    console.error("Update User Error:", error.response?.data);
    if (error.response?.data) {
      throw error.response.data;
    }

    throw new Error("An unknown error occurred.");
  }
};