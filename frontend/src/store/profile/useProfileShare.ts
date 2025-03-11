import { create } from "zustand";

type ProfileShare = {
  isShareOpen: boolean;
  setOpenShare: (value: boolean) => void;
};

export const useProfileShare = create<ProfileShare>((set) => ({
  isShareOpen: false,
  setOpenShare: (value) => set({ isShareOpen: value }),
}));
