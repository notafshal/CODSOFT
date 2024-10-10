"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product")
      .then((result) => {
        setProduct(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* <Carasoul /> */}
      <div className="my-2 mx-6">
        <p>
          All <span className="text-white bg-black p-1">Products</span>
        </p>
      </div>
      {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {product.map((data: any) => (
        <>
          <ProductCard key={data.id} data={data} />
        </>
      ))}
    </>
  );
}
