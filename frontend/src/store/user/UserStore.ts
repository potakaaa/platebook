import { create } from "zustand";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";

export type storedUser = {
  id: string | null;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

type UserStore = {
  user: storedUser | null;
  platelist: PlatelistItem[];
  setPlateList: (platelist: PlatelistItem[]) => void;
  setSession: (user: storedUser | null) => void;
  resetStore: () => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  platelist: [],
  isFetchingPlateList: false,
  accessToken: null,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  setSession: (user) => {
    set({ user });
  },

  setPlateList: (platelist) => {
    set({ platelist });
  },

  resetStore: () => {
    set({
      user: null,
      platelist: [],
    });
  },
}));
