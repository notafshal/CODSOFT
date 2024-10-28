"use client";

import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Navbar() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    toast("Logged Out Successfully");
  };
  return (
    <div>
      <div className="flex justify-between my-2 mx-2 sticky">
        <div className="w-2/3 flex gap-20">
          <span className="p-2 text-white bg-blue-600 rounded-full">
            Task-Trail
          </span>
          <div className="flex">
            <Input
              className="relative w-72 rounded-full"
              placeholder="Search...."
            />
            <CiSearch className="text-xl my-2 -mx-7" />
          </div>
        </div>
        <div className="hover:cursor-pointer">
          {user ? (
            <Avatar onClick={handleLogout}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          ) : (
            <Link href="/login">
              <p>LogIn</p>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
