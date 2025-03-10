"use client";

import React, { useEffect, useRef } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input-hero";
import { useFocusStore } from "@/store/focus/useFocusStore";

const placeholders = [
  "Adobong Kare Kare Pinoy Style",
  "Sinigang na Lechon",
  "Lechon Paksiw sa Mang Tomas",
  "Pork Sisig with Mayo Sauce",
  "Shrimp Adobo with Pineapple",
];

const SearchInput = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { focusComponentId, setFocusComponentId } = useFocusStore();

  useEffect(() => {
    if (focusComponentId === "search-recipe" && ref.current) {
      // Scroll smoothly first
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });

      // Delay the focus slightly to avoid abrupt jumps
      setTimeout(() => {
        ref.current?.focus();
      }, 300); // Adjust delay as needed

      // Reset focus state after a short delay
      setTimeout(() => setFocusComponentId(null), 500);
    }
  }, [focusComponentId, setFocusComponentId]);

  return (
    <div className="" ref={ref} tabIndex={-1}>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default SearchInput;
