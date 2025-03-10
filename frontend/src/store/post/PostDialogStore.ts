import { create } from "zustand";

type DialogOpen = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const usePostDialogStore = create<DialogOpen>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
