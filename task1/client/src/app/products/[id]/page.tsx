"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
}

const Product = ({ params }: { params: { id: number } }) => {
  const [products, setProducts] = useState<Product | null>();
  useEffect(() => {
    console.log("-----------");
    console.log(params._id);
    axios.get(`http://localhost:5000/api/product/${params.id}`).then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, [params.id]);
  return (
    <>
      Product Page {}
      <Image
        src={products?.image as string}
        className="mx-auto h-36 w-36 md:h-52 md:w-52 lg:h-72 lg:w-72"
        width={200}
        height={200}
        alt="product image"
      />
      {products?.title}
      {products?.price}
    </>
  );
};
export default Product;
