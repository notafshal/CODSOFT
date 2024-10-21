"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  author: string;
  category: string;
}
function FilterPage({ params }: { params: { id: number } }) {
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);
  useEffect(() => {
    // Fetch the filtered data based on the provided ID (author or category)
    axios
      .get(`http://localhost:5000/api/filter/${params.id}`)
      .then((response) => {
        setFilteredItems(response.data);
      })
      .catch((error) => console.log("Error fetching filtered data", error));
  }, [params.id]);

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
