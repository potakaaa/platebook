"use client";

import React from "react";
import { FormControl, FormItem } from "../ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCountries } from "@/hooks/tanstack/countries/useCountries";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "../ui/command";

const CountryCombobox = ({
  value,
  setFormValue,
}: {
  value: string;
  setFormValue: (value: string) => void;
}) => {
  const { countries, loading, error } = useCountries();

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Failed to load countries.</p>;
  if (!countries || countries.length === 0)
    return <p>No countries available.</p>;

  return (
    <FormItem>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between text-xs px-2 sm:px-4 sm:text-sm",
                !value && "text-muted-foreground"
              )}
            >
              {value
                ? countries.find((country: string) => value === country)
                : "Select country of origin..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 mx-3 rounded-lg">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>Country not found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country: string, index: number) => (
                  <CommandItem
                    key={index}
                    value={country}
                    onSelect={() => {
                      setFormValue(country);
                    }}
                    className="text-xs sm:text-sm lg:text-base"
                  >
                    {country}
                    <Check
                      className={cn(
                        "ml-auto",
                        country === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
};

export default CountryCombobox;
