"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { ArrowRightCircleIcon, SearchIcon } from "lucide-react";
import useSearchStore from "@/store/search/useSearchStore";
import { useDebounce } from "@/hooks/useDebounce";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue === "" || debouncedValue === null) {
      setSearchQuery("");
    } else if (debouncedValue) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue, setSearchQuery]);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full flex items-center justify-center mt-1 sm:mt-0">
      <form className="w-full flex flex-row border border-primary rounded-full px-2 items-center justify-center">
        <Input
          type="search"
          onChange={handleChange}
          value={inputValue}
          placeholder="Search for recipes"
          className="h-8 sm:h-10 text-xs sm:text-sm w-full border-none text-ellipsis focus-visible:ring-none focus-visible:ring-0"
        />
        <button
          type="submit"
          className="h-6 w-10 lg:h-7 md:w-14 lg:w-48 text-sm rounded-full flex items-center justify-center space-x-2 bg-primary text-background font-normal cursor-pointer"
        >
          <span className="hidden lg:block dark:text-foreground">
            Search Now
          </span>
          <ArrowRightCircleIcon className="size-4 lg:size-5 text-background dark:text-foreground text-center" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
