import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-xl flex items-center justify-center">
      <Input
        type="search"
        placeholder="Search for recipes"
        className="h-7 text-xs rounded-full text-ellipsis"
      />
    </div>
  );
};

export default SearchBar;
