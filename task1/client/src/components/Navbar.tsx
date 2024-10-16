"use client";

import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [search, setSearch] = useState<string>("");
  const { cartItemsCount, clearCart } = useCart();
  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
    clearCart();
    alert("Logged out");
  };
  const searching = (e: any) => {
    e.preventDefault;
    setSearch(e.target.value);
    console.log(search);
  };
  return (
    <>
      <nav className="w-screen sticky   p-4 flex flex-row justify-between">
        <Link href="/">
          <p className="font-semibold p-1">
            Book
            <span className="text-white bg-black p-1 font-semibold">Wagon</span>
          </p>
        </Link>
        <div className="flex flex-row">
          <div className="flex flex-row ">
            <input
              type="text"
              value={search}
              onChange={searching}
              placeholder="Search for ..."
              className="rounded-md w-36 lg:w-96 border-2 "
            />
            <CiSearch className="-mx-6 mt-2 text-lg" />
          </div>
        </div>

        <div className="flex flex-row lg:gap-10 hover:cursor-pointer">
          <div className="mt-1 mx-5">
            <Link href="/cart">
              <BsCart4 className="text-lg" />
              {cartItemsCount > 0 && (
                <span className="  -right-2 bg-red-600 text-white rounded-full text-xs px-2">
                  {cartItemsCount}
                </span>
              )}
            </Link>
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
