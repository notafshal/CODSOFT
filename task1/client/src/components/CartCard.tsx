"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  product: Product;
  quantity: number;
}
const CartCard = ({ data }: { data: CartItem }) => {
  if (!data.product) {
    console.log("data.product is null");
  }
  const productTotal = data.product.price * data.quantity;

  return (
    <>
      <Card className="flex flex-row justify-between">
        <div className="flex flex-row w-1/3">
          <CardHeader>
            <Image
              src={data.product.image}
              width={50}
              height={50}
              alt={data.product.title}
              className="w-24 h-24 "
            />
          </CardHeader>
          <CardContent className="my-auto text-lg flex gap-2 flex-col">
            <CardTitle className="w-1/2">{data.product.title}</CardTitle>
            <CardDescription>{data.product.author}</CardDescription>
          </CardContent>
        </div>
        <div className="my-auto  text-lg">
          <p className="font-semibold">Rate:</p>
          <p className="text-red-500">Rs. {data.product.price}</p>
        </div>
        <div className="my-auto  text-lg">
          <p className="font-semibold">Quantity:</p>
          <p className="text-red-500">Rs. {data.quantity}</p>
        </div>{" "}
        <div className="my-auto  text-lg">
          <p className="font-semibold">Total:</p>
          <p className="text-red-500">Rs. {productTotal}</p>
        </div>
        <CardFooter>
          <MdDelete />
        </CardFooter>
      </Card>
    </>
  );
};
export default CartCard;
