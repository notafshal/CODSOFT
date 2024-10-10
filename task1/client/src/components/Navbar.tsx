"use client";

import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";
const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out");
  };
  return (
    <>
      <nav className="w-screen sticky   p-4 flex flex-row justify-between">
        <Link href="/">
          <p className="font-semibold p-1">
            Trendy
            <span className="text-white bg-black p-1 font-semibold">Cart</span>
          </p>
        </Link>
        <div className="flex flex-row">
          <div className="flex flex-row ">
            <input
              type="text"
              placeholder="Search for ..."
              className="rounded-md w-36 lg:w-96 border-2 "
            />
            <CiSearch className="-mx-5 mt-1 " />
          </div>
        </div>

        <div className="flex flex-row lg:gap-10 hover:cursor-pointer">
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
