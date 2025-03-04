import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
import { set } from "zod";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { session } = useUserStore.getState();

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
    const { session, resetStore } = useUserStore.getState();
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh/")
    ) {
      originalRequest._retry = true;
      try {
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

          const refreshedSession = await getSession();

          setSession(refreshedSession);
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        resetStore();
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(refreshError);
      }
    }
    console.error("Error response:", error.response.data);

    return Promise.reject(error);
  }
);
