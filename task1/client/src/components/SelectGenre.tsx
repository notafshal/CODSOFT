"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectGenre = () => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="romantic">Romantic</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="fictional">Fictional</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
export default SelectGenre;
