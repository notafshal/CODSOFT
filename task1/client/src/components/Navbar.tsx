"use client";

import { CiSearch } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";

import { useCart } from "@/app/context/CartContext";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [Inputsearch, setInputSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { cartItemsCount, clearCart } = useCart();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
    clearCart();
    alert("Logged out");
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((result) => {
        setAllProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (value: string) => {
    setInputSearch(value);
    if (value.trim() !== "") {
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
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
          <div className="flex flex-col gap-1 relative">
            <div className="flex flex-row ">
              <input
                type="text"
                value={Inputsearch}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                placeholder="Search for ..."
                className="rounded-md w-36 lg:w-96 border-2 "
              />
              <CiSearch className="-mx-6 mt-2 text-lg" />
            </div>
            {Inputsearch && searchResults.length > 0 && (
              <div className="absoulte z-10 bg-white w-36 lg:w-96 border mt-1 rounded-md">
                <ul>
                  {searchResults.map((item) => (
                    <li key={item.id} className="p-2 border-b last:border-none">
                      <Link href={`/products/${item._id}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Inputsearch && searchResults.length === 0 && (
              <p className="absoulte z-10 bg-white w-36 lg:w-96 mt-1 p-2 text-sm">
                No products found.
              </p>
            )}
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
