"use client";

import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input-hero";

const placeholders = [
  "Adobong Kare Kare Pinoy Style",
  "Sinigang na Lechon",
  "Lechon Paksiw sa Mang Tomas",
  "Pork Sisig with Mayo Sauce",
  "Shrimp Adobo with Pineapple",
];

const SearchInput = () => {
  return (
    <div className="">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default SearchInput;
