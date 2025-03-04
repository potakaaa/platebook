import { create } from "zustand";
import { getPlatelist } from "@/lib/services/api/platelistServices";
import { PlatelistItem } from "@/lib/types/platelistTypes";
import { Session } from "next-auth";

type UserStore = {
  session: Session | null;
  plateList: PlatelistItem[];
  setSession: (session: Session | null) => void;
  fetchPlateList: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  plateList: [],

  setSession: (session) => set({ session }),

  fetchPlateList: async () => {
    try {
      const response = await getPlatelist();
      if (!response[0]?.cooklist_items) {
        set({ plateList: [] });
        return;
      }
      set({ plateList: response[0].cooklist_items });
    } catch (error) {
      console.error("Error fetching plate list:", error);
    }
  },
}));
