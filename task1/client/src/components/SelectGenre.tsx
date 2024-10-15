"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const genres = [
  {
    value: "romantic",
    label: "Romantic",
  },
  {
    value: "biography",
    label: "Biography",
  },
  {
    value: "scienceFiction.",
    label: "Science Fiction.",
  },
  {
    value: "mystery",
    label: "Mystery",
  },
  {
    value: "fantasy",
    label: "Fantasy",
  },
];
const SelectGenre = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  console.log(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? genres.find((genre) => genre.value === value)?.label
            : "Select genre..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            {genres.map((genre) => (
              <CommandGroup key={genre.value}>
                <CommandItem
                  value={genre.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {genre.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === genre.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SelectGenre;
