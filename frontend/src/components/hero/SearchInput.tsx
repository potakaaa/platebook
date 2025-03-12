"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input-hero";
import { useFocusStore } from "@/store/focus/useFocusStore";
import useSearchStore from "@/store/search/useSearchStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const placeholders = [
  "Adobong Kare Kare Pinoy Style",
  "Sinigang na Lechon",
  "Lechon Paksiw sa Mang Tomas",
  "Pork Sisig with Mayo Sauce",
  "Shrimp Adobo with Pineapple",
];

const SearchInput = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setSearchQuery } = useSearchStore();
  const { focusComponentId, setFocusComponentId } = useFocusStore();

  const [localSearchQuery, setLocalSearchQuery] = useState<string>("");

  const handleSearch = async (query: string) => {
    const searchPromise = new Promise<void>(() => {
      router.push("/home");
      setSearchQuery(query);
    });

    toast.promise(searchPromise, {
      loading: "Searching...",
      success: "Search results for " + query,
      error: "An error occurred while searching",
    });

    return searchPromise;
  };

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
        onChange={(e) => {
          const query = e.target.value;
          setLocalSearchQuery(query);
        }}
        onSubmit={() => {
          handleSearch(localSearchQuery);
        }}
      />
    </div>
  );
};

export default SearchInput;
