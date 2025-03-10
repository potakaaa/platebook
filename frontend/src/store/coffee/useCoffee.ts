import { create } from "zustand";

type BuyCoffee = {
  isCoffeeOpen: boolean;
  setIsCoffeeOpen: (isOpen: boolean) => void;
};

export const useCoffee = create<BuyCoffee>((set) => ({
  isCoffeeOpen: false,
  setIsCoffeeOpen: (isCoffeeOpen) => set({ isCoffeeOpen }),
}));
