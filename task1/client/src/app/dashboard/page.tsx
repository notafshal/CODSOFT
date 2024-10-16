/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import AddProduct from "@/components/AddProduct";

import { useAuth } from "@/app/context/AuthContext";

import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
const dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <>Only autheticated user allowed </>;
  }
  console.log(user);
  if (user.isRole !== 1) {
    return <>Access Denied. Admins only.</>;
  }
  return (
    <>
      <div className="flex flex-row items-start justify-around w-screen h-screen my-2 lg:justify-end lg:gap-4 lg:-mx-5">
        <Link href="/">
          <button className="flex flex-row px-3 py-2 text-white bg-black text-md rounded-md hover:bg-gray-800">
            <IoEyeSharp className="mt-1" />
            <p className="mx-1">View Products</p>
          </button>
        </Link>
        {/* Popup */}
        <div>
          <AddProduct />
        </div>
      </div>
    </>
  );
};
export default dashboard;
