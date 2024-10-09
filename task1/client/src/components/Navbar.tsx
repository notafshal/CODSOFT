import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-screen sticky  p-4 flex flex-row justify-between">
      <p>Somefin Fishy</p>
      <div className="flex flex-row">
        <div className="flex flex-row ">
          <input
            type="text"
            placeholder="Search for ..."
            className="rounded-md lg:w-96 border-2 "
          />
          <CiSearch className="-mx-5 mt-1" />
        </div>
      </div>

      <div className="flex flex-row gap-10 hover:cursor-pointer">
        <div className="mt-1 mx-5">
          <BsCart4 className="text-lg" />
        </div>
        <div className="hidden lg:block">
          <Link href="/login">
            <p>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
