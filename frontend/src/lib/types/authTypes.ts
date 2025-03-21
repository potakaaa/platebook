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
    refreshToken: string;
  }
}

export type EditUserFormData = {
  username?: string;
  pfp?: File;
};

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
  password1: string;
  password2: string;
};


export type ResetPasswordInputData = {
  email: string;
  otp: string;
  password1: string;
  password2: string;
}

export type UpdateUserInputData = {
  username: string;
  email: string;
  pfp: File;
};
