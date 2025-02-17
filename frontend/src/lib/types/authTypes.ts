import {User } from "next-auth";

export interface AuthUser extends User {
    accessToken?: string;
    refreshToken?: string;
}

export interface Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    accessToken: string;
}