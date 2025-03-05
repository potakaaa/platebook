'use client';
import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordRequest,
  forgotPasswordVerify,
  getUserByID,
  signUp,
  verifiedPasswordReset,
} from "@/lib/services/api/accountServices";
import { ResetPasswordFormData, SignUpFormData } from "@/lib/types/authTypes";

const useMutationAuth = () => {
  const useMutationSignUp = () => {
    return useMutation({
      mutationFn: (data: SignUpFormData) => signUp(data),
      onSuccess(data) {
        console.log("Sign Up Success:", data);
      },
      onError(error) {
        console.error("Sign Up Error:", error);
      },
    });
  };

  const useMutationForgotPasswordRequest = () => {
    return useMutation({
      mutationFn: (email: string) => forgotPasswordRequest(email),
      onSuccess(data) {
        console.log("Forgot Password Request Success:", data);
      },
      onError(error) {
        console.error("Forgot Password Request Error:", error);
      },
    });
  };

  const useMutationForgotPasswordVerify = () => {
    return useMutation({
      mutationFn: (otp: string) => forgotPasswordVerify(otp),
      onSuccess(data) {
        console.log("Forgot Password Verify Success:", data);
      },
      onError(error) {
        console.error("Forgot Password Verify Error:", error);
      },
    });
  };

  const useMutationVerifiedPasswordReset = () => {
    return useMutation({
      mutationFn: (data: ResetPasswordFormData) => verifiedPasswordReset(data),
      onSuccess(data) {
        console.log("Verified Password Reset Success:", data);
      },
      onError(error) {
        console.error("Verified Password Reset Error:", error);
      },
    });
  };

  const useMutationGetUserById = () => {
    return useMutation({
      mutationFn: (id: string) => getUserByID(id),
      onSuccess(data) {
        console.log("Get User By Id Success:", data);
      },
      onError(error) {
        console.error("Get User By Id Error:", error);
      },
    });
  };
  return {
    useMutationSignUp,
    useMutationForgotPasswordRequest,
    useMutationForgotPasswordVerify,
    useMutationVerifiedPasswordReset,
    useMutationGetUserById,
  };
};

export default useMutationAuth;