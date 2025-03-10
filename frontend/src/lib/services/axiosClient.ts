import { useUserStore } from "@/store/user/UserStore";
import axios from "axios";
import { get } from "http";
import { getSession, signIn, signOut } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { accessToken } = useUserStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const { resetStore } = useUserStore.getState();
    const session = await getSession();
    console.log("Session:", session);

    if (!session) {
      console.warn("No session found, logging out");
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh/")
    ) {
      originalRequest._retry = true;
      try {
        if (!session?.refreshToken) {
          console.warn("No refresh token found, logging out");
          resetStore();
          await signOut();
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
          useUserStore.getState().setAccessToken(refreshResponse.data.access);
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;

          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        resetStore();
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
