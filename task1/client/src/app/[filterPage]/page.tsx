"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  author: string;
  category: string;
}
function FilterPage() {
  const searchParams = useSearchParams();
  const author = searchParams.get("author");
  const category = searchParams.get("category");
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);

  console.log(author);
  console.log(category);
  useEffect(() => {
    const query = new URLSearchParams();
    if (author) query.append("author", author);
    if (category) query.append("category", category);

    axios
      .get(`http://localhost:5000/api/product/filter?${query.toString()}`)
      .then((response) => {
        setFilteredItems(response.data);
      })
      .catch((error) => console.log("Error fetching filtered data", error));
  }, [author, category]);

  return (
    <>
      <div className="mx-6">
        <h1>
          {" "}
          Search Results for :{" "}
          <span className="p-1 bg-black text-white">
            {author ? author : category}
          </span>
        </h1>
        {filteredItems ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredItems.map((data: any) => (
            <div key={data._id}>
              <ProductCard data={data} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default FilterPage;
