/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import AddProduct from "@/components/AddProduct";

import { MdDelete } from "react-icons/md";
import { useAuth } from "@/app/context/AuthContext";

const dashboard = () => {
  const { user } = useAuth();
  if (!user) {
    return <>Only autheticated user allowed </>;
  }
  return (
    <>
      <div className="flex flex-row items-start justify-around w-screen h-screen my-2 lg:justify-end lg:gap-4 lg:-mx-5">
        <button className="flex flex-row px-3 py-2 text-white bg-black text-md rounded-md hover:bg-gray-800">
          <MdDelete className="mt-1" />
          <p className="mx-1">Delete Products</p>
        </button>
        {/* Popup */}
        <div>
          <AddProduct />
        </div>
      </div>
    </>
  );
};
export default dashboard;
