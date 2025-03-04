import { create } from "zustand";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { Session } from "next-auth";

type UserStore = {
  session: Session | null;
  plateList: PlatelistItem[];
  isFetchingPlateList: boolean;
  setSession: (session: Session | null) => void;
  fetchPlateList: () => Promise<void>;
  resetStore: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  plateList: [],
  isFetchingPlateList: false,

  setSession: (session) => set({ session }),

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
    set({ session: null, plateList: [], isFetchingPlateList: false }),
}));
