import { create } from "zustand";

type PlatelistDrawer = {
  open: boolean;
  setPlateOpen: (open: boolean) => void;
};

export const usePlatelistDrawer = create<PlatelistDrawer>()((set) => ({
  open: false,
  setPlateOpen: (open) => set({ open }),
}));
