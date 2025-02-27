import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="w-full max-w-xl flex items-center justify-center self-center ">
      <Input
        type="search"
        placeholder="Search for recipes"
        className="h-full text-xs rounded-full text-ellipsis px-3 whitespace-nowrap"
      />
    </div>
  );
};

export default SearchBar;
