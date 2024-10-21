"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";

import { MdDelete } from "react-icons/md";

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  author: string;
  image: string;
  title: string;
  price: number;
}
interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}
const CartCard = ({
  data,
  onDelete,
}: {
  data: CartItem;
  onDelete: (id: string) => void;
}) => {
  if (!data.product) {
    console.log("data.product is null");
  }

  const productTotal = data.product.price * data.quantity;
  const deleteCart = () => {
    axios
      .delete(`http://localhost:5000/api/cart/${data._id}`)
      .then((result) => {
        alert(`${result} is deleted`);
        onDelete(data._id);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Card className="md:flex md:flex-row lg:justify-between">
        <div className="md:flex md:flex-row md:w-1/3">
          <CardHeader>
            <Image
              src={data.product.image}
              width={50}
              height={50}
              alt={data.product.title}
              className="md:w-24 md:h-24 mx-auto"
            />
          </CardHeader>
          <CardContent className="my-auto md:text-lg flex gap-2 flex-col">
            <CardTitle className="lg:w-1/2">{data.product.title}</CardTitle>
            <CardDescription>{data.product.author}</CardDescription>
          </CardContent>
        </div>
        <div className="my-auto  md:text-lg flex gap-2 md:flex-col mx-6">
          <p className="md:font-semibold ">Rate:</p>
          <p className="text-red-500">Rs. {data.product.price}</p>
        </div>
        <div className="my-auto  md:text-lg mx-6">
          <p className="md:font-semibold">Quantity:</p>
          <p className="text-red-500">Rs. {data.quantity}</p>
        </div>{" "}
        <div className="md:my-auto  md:text-lg mx-6">
          <p className="font-semibold">Total:</p>
          <p className="text-red-500">Rs. {productTotal}</p>
        </div>
        <CardFooter>
          <MdDelete className="hover:cursor-pointer" onClick={deleteCart} />
        </CardFooter>
      </Card>
    </>
  );
};
export default CartCard;
