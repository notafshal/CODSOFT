"use client";

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
      <div className="my-2 mx-6">
        <p>
          All <span className="text-white bg-black p-1">Products</span>
        </p>
      </div>
      {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className="lg:grid lg:grid-cols-3 gap-4 mx-6">
        {product.map((data: any) => (
          <div>
            <Link key={data._id} href={`/products/${data._id}`}>
              <ProductCard data={data} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
