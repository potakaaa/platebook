import { create } from "zustand";

interface SearchState {
  isSearching: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  isSearching: false,
  searchQuery: "",

  setSearchQuery: (query) =>
    set({ searchQuery: query, isSearching: query.length > 0 }),

  clearSearch: () => set({ searchQuery: "", isSearching: false }),
}));

export default useSearchStore;
