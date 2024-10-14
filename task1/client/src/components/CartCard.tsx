"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
  console.log(data);
  if (!data.product) {
    console.log("data.product is null");
  }
  const productTotal = data.product.price * data.quantity;

  return (
    <>
      <Card className="flex flex-row">
        <CardHeader>
          <Image
            src={data.product.image}
            width={150}
            height={150}
            alt={data.product.title}
          />
        </CardHeader>
        <CardContent className="text-sm flex gap-2 flex-col">
          <CardTitle>{data.product.title}</CardTitle>
          <CardDescription>{data.product.author}</CardDescription>
          <p>Rs. {data.product.price}</p>
          <p>{data.quantity}</p>
        </CardContent>
        <div className="text-sm">Total:{productTotal}</div>
      </Card>
    </>
  );
};
export default CartCard;
