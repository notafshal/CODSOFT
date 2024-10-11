"use client";
import { Button } from "@/components/ui/button";
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
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${params.id}`).then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, [params.id]);

  const AddQuantity = () => {
    if (products && products.stock !== undefined) {
      if (quantity <= products?.stock - 1) {
        setQuantity(quantity + 1);
      }
    }
  };
  const RemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <div className="mx-5 lg:mx-32 my-5 lg:flex lg:flex-row lg:justify-around lg:bg-gray-100 lg:p-5 lg:rounded-lg">
        <Image
          src={products?.image as string}
          className="mx-auto h-48 w-36 md:h-52 md:w-52 lg:mx-5 lg:h-96 lg:w-72"
          width={500}
          height={500}
          alt="product image"
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl lg:text-6xl">
            {products?.title}
          </p>
          <p className="font-semibold lg:text-lg">{products?.author}</p>
          <p className="text-gray-500 ">{products?.category}</p>
          <p>Rating:{products?.rating}</p>

          <p className="text-lg lg:text-2xl text-red-600">
            Rs. {products?.price}
          </p>
          <p className="lg:text-xl">In Stock : {products?.stock}</p>
          <Button onClick={AddQuantity}>+</Button>
          <p>
            Quantity <span className="bg-white p-1 w-2">{quantity}</span>
          </p>
          <Button onClick={RemoveQuantity}>-</Button>
          <div className="flex gap-3 my-2">
            <Button>Buy Now</Button>
            <Button>Add to cart</Button>
          </div>
        </div>
      </div>
      <div className="mx-5 lg:mx-32 my-5 lg:flex lg:flex-col lg:justify-around lg:bg-gray-100 lg:p-5 lg:rounded-lg gap-2">
        <p className="text-2xl ">Description</p>
        <p>{products?.description}</p>
      </div>
    </>
  );
};
export default Product;
