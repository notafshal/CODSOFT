"use client";

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
  console.log(filteredItems);
  useEffect(() => {
    const query = new URLSearchParams();
    if (author) query.append("author", author);
    if (category) query.append("category", category);
    console.log(query);
    axios
      .get(`http://localhost:5000/api/product/filter?${query.toString()}`)
      .then((response) => {
        console.log(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => console.log("Error fetching filtered data", error));
  }, [author, category]);

  return (
    <>
      <h1 className="text-center">Filtered Results</h1>
      <div>
        {filteredItems ? (
          filteredItems.map((item) => (
            <div key={item._id} className="border p-2 my-2">
              <h2>{item.title}</h2>
              <p>Author: {item.author}</p>
              <p>Category: {item.category}</p>
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
