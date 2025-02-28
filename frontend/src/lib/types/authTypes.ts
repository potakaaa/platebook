import {User } from "next-auth";

export interface AuthUser extends User {
    accessToken?: string;
    refreshToken?: string;
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken: string;
  }
}


export type SignUpFormData = {
  email: string;
  username: string;
  password1: string;
  password2: string;
};


export type BasicUser = {
  userId: string;
  username: string;
  pfp_url: string;
};


export type ResetPasswordFormData = {
  otp: string;
  password1: string;
  password2: string;
};
