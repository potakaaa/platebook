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
