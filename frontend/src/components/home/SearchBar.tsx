import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-xl flex items-center justify-center mt-1">
      <Input
        type="search"
        placeholder="Search for recipes"
        className="h-8 text-xs w-full rounded-full text-ellipsis"
      />
    </div>
  );
};

export default SearchBar;
