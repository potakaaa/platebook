'use client';
import SearchResults from "@/components/home/SearchResults";
import useSearchStore from "@/store/useSearchState";
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
