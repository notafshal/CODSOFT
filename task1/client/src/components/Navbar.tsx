"use client";

import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token: any = localStorage.getItem("token");
    setUser(token);
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out");
    window.location.reload();
  };
  return (
    <>
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
          <div>
            {user ? (
              <FcBusinessman className="text-2xl" onClick={handleSignout} />
            ) : (
              <Link href="/login">
                <p>Login</p>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
