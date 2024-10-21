/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  const [Inputsearch, setInputSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
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
          <CiSearch className="-mx-6 mt-1 text-lg" />
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
          <div className="absoulte z-10 bg-white w-36 lg:w-96 mt-1 p-2 text-sm">
            No products found.
          </div>
        )}
      </div>
    </>
  );
};
export default Search;
