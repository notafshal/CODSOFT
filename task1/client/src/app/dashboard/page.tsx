"use client";

import AddProduct from "@/components/AddProduct";

import { FaEye } from "react-icons/fa";

const dashboard = () => {
  return (
    <>
      <div className="flex flex-row items-start justify-around w-screen h-screen my-2 lg:justify-end lg:gap-4 lg:-mx-5">
        <button className="flex flex-row px-3 py-2 text-white bg-black text-md rounded-md hover:bg-gray-800">
          <FaEye className="mt-1" />
          <p className="mx-1">View Products</p>
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
