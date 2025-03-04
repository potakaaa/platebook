import axios from 'axios';
import { getSession, signIn, signOut } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh/")
    ) {
      originalRequest._retry = true;
      try {
        const session = await getSession();

        if (!session?.refreshToken) {
          console.error("No refresh token available, redirecting to login.");
          return Promise.reject(error);
        }

        const refreshResponse = await axiosClient.post("/auth/refresh/", {
          refresh: session.refreshToken,
        });

        if (refreshResponse.data?.access) {
          await signIn("credentials", {
            accessToken: refreshResponse.data.access,
            refreshToken: session.refreshToken,
            id: session.user?.id,
            name: session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
            redirect: false,
          });
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(refreshError);
      }
    }
    console.error("Error response:", error.response.data);

    return Promise.reject(error);
  }
);