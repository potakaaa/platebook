// store/focusStore.ts
import { create } from "zustand";

type FocusStore = {
  focusComponentId: string | null;
  setFocusComponentId: (id: string | null) => void;
  isFocused: boolean;
  setFocus: (isFocused: boolean) => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  focusComponentId: null,
  setFocusComponentId: (id) => set({ focusComponentId: id }),
  isFocused: false,
  setFocus: (isFocused) => set({ isFocused }),
}));
