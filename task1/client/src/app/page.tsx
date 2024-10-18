/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* <Carasoul /> */}
      <div className="my-2 mx-6 flex justify-between">
        <p>
          All <span className="text-white bg-black p-1">Products</span>
        </p>
        <div>
          {" "}
          <Filter />
        </div>
      </div>
      {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="lg:grid lg:grid-cols-4 gap-4 mx-6">
        {/* // eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {product.map((data: any) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <Link href={`/products/${data._id}`}>
              <ProductCard key={data._id} data={data} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
