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

export default function Sidebar() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  return (
    <>
      {user?.isAdmin === 1 ? (
        <div className="sticky top-0 z-10 w-1/5 h-screen  bg-neutral-100">
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
