import { create } from "zustand";

type DrawerState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const useDrawer = create<DrawerState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));
