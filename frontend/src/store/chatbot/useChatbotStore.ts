import { create } from "zustand";

export const useChatbot = create<{
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
}>((set) => ({
  isChatOpen: false,
  setIsChatOpen: (isChatOpen: boolean) => set({ isChatOpen }),
}));
