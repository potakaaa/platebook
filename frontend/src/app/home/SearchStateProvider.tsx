"use client";
import SearchResults from "@/components/home/search/SearchResults";
import useSearchStore from "@/store/search/useSearchStore";
import React from "react";

interface SearchStateProviderProps {
  children: React.ReactNode;
}

const SearchStateProvider: React.FC<SearchStateProviderProps> = ({
  children,
}) => {
  const { isSearching } = useSearchStore();

  return <>{isSearching ? <SearchResults /> : children}</>;
};

export default SearchStateProvider;
