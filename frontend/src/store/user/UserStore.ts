import { create } from "zustand";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";

type storedUser = {
  id: string | null;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

type UserStore = {
  user: storedUser | null;
  plateList: PlatelistItem[];
  isFetchingPlateList: boolean;
  setSession: (user: storedUser | null) => void;
  fetchPlateList: () => Promise<void>;
  resetStore: () => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  plateList: [],
  isFetchingPlateList: false,
  accessToken: null,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  setSession: (user) => {
    set({ user });
  },

  fetchPlateList: async () => {
    set({ isFetchingPlateList: true });
    try {
      const response = await getPlatelist();
      const cooklistItems = response[0]?.cooklist_items || [];
      set({ plateList: cooklistItems, isFetchingPlateList: false });
    } catch (error) {
      set({ isFetchingPlateList: false });
    }
  },

  resetStore: () => {
    set({
      user: null,
      plateList: [],
      isFetchingPlateList: false,
    });
  },
}));
