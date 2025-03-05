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
  accessToken: string | null;
  plateList: PlatelistItem[];
  isFetchingPlateList: boolean;
  setSession: (user: storedUser | null) => void;
  fetchPlateList: () => Promise<void>;
  resetStore: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  plateList: [],
  isFetchingPlateList: false,

  setSession: (user) =>
    set({
      user,
    }),

  fetchPlateList: async () => {
    set({ isFetchingPlateList: true });
    try {
      const response = await getPlatelist();
      const cooklistItems = response[0]?.cooklist_items || [];
      set({ plateList: cooklistItems, isFetchingPlateList: false });
    } catch (error) {
      console.error("Error fetching plate list:", error);
      set({ isFetchingPlateList: false });
    }
  },

  resetStore: () =>
    set({
      user: null,
      accessToken: null,
      plateList: [],
      isFetchingPlateList: false,
    }),
}));
