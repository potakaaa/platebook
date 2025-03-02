import axios from 'axios';
import { getSession, signIn } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    console.log("Session:", session);

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

    console.error("Error response:", error.response);

    if (
      error.response?.status === 401 ||
      (error.response?.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      try {
        const session = await getSession();

        if (!session?.refreshToken) {
          console.error("No refresh token available, redirecting to login.");
          return Promise.reject(error);
        }

        console.log("Refreshing access token...");

        const refreshResponse = await axiosClient.post("/auth/refresh/", {
          refresh: session.refreshToken,
        });

        if (refreshResponse.data?.access) {
          console.log("🔄 Access token refreshed!");

          await signIn("credentials", {
            accessToken: refreshResponse.data.access,
            refreshToken: session.refreshToken,
            redirect: false,
          });

          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);