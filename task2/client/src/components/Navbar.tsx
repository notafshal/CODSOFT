"use client";

import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Navbar() {
  return (
    <div>
      {" "}
      <div className="flex justify-between my-2 mx-2">
        <div className="w-2/3 flex gap-20">
          <span className="p-2 text-white bg-blue-600 rounded-full">
            TaskTrail
          </span>
          <div className="flex">
            <Input className="relative w-72" placeholder="Search...." />
            <CiSearch className="text-xl my-2 -mx-7" />
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
