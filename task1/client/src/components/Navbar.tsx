"use client";

import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";

import { useCart } from "@/app/context/CartContext";

import Search from "./Search";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const { cartItemsCount, clearCart } = useCart();

  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
    clearCart();
    alert("Logged out");
  };

  return (
    <>
      <nav className="w-screen p-4 flex flex-row justify-between relative">
        <Link href="/">
          <p className="font-semibold p-1">
            Book
            <span className="text-white bg-black p-1 font-semibold">Wagon</span>
          </p>
        </Link>
        <div className="flex flex-row">
          <Search />
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
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue
                    placeholder={<FcBusinessman className="text-2xl" />}
                  />
                </SelectTrigger>
                <SelectContent>
                  <Link href="/profile">
                    <p>Profile</p>
                  </Link>
                  <p onClick={handleSignout}>logout</p>
                </SelectContent>
              </Select>
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
