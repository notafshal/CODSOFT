"use client";

import React from "react";

import { PiSquaresFour } from "react-icons/pi";
import { FaTasks, FaTrash } from "react-icons/fa";
import { RiTeamFill, RiProgress6Line } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { GiRoad } from "react-icons/gi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useToast } from "@/hooks/use-toast";

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      variant: "destructive",
      title: "Logged Out Successfully",
      description: "Thank You For your time",
    });
  };
  if (!user) {
    router.push("/login");
  }

  return (
    <>
      {user?.isAdmin === 1 ? (
        <div className="sticky top-0 z-10 w-1/5 h-screen  bg-neutral-100">
          <div className="w-2/3 flex  gap-20 mx-auto my-2">
            <p className="p-3 w-28 text-center font-semibold bg-yellow-300 rounded-full flex justify-center items-center gap-1">
              Task-Trail
              <span>
                <GiRoad />
              </span>
            </p>
          </div>
          <div className="hover:cursor-pointer mx-6 my-2">
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
          <div className="flex flex-col gap-2  text-lg mx-4">
            <Link
              href="/dashboard"
              className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3"
            >
              <PiSquaresFour className="my-1.5 " /> Dashboard
            </Link>
            <Link
              href="/tasks"
              className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3"
            >
              <FaTasks className="my-1.5" />
              Tasks
            </Link>
            <Link
              href="/team"
              className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3"
            >
              <RiTeamFill className="my-1.5" /> Team
            </Link>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <FaTrash className="my-1.5" /> Trash
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <LuListTodo className="my-1.5" /> Todo
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <RiProgress6Line className="my-1.5" /> Inprogress
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <IoCheckmarkDoneCircle className="my-1.5" /> Completed
            </li>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-10 w-1/5 h-screen  bg-neutral-100">
          <div className="w-2/3 flex  gap-20 mx-auto my-2">
            <p className="p-3 w-28 text-center font-semibold bg-yellow-300 rounded-full flex justify-center items-center gap-1">
              Task-Trail
              <span>
                <GiRoad />
              </span>
            </p>
          </div>
          <div className="hover:cursor-pointer mx-6 my-2">
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
          <div className="flex flex-col gap-2  text-lg mx-4">
            <Link
              href="/tasks"
              className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3"
            >
              <FaTasks className="my-1.5" />
              Tasks
            </Link>

            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <FaTrash className="my-1.5" /> Trash
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <LuListTodo className="my-1.5" /> Todo
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <RiProgress6Line className="my-1.5" /> Inprogress
            </li>
            <li className="hover:cursor-pointer focus:bg-blue-400 focus:text-white hover:bg-neutral-200 p-2 rounded-2xl flex gap-3">
              <IoCheckmarkDoneCircle className="my-1.5" /> Completed
            </li>
          </div>
        </div>
      )}
    </>
  );
}
