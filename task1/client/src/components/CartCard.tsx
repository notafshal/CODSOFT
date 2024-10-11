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
  author: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
}

const CartCard = ({
  data,
  onProductTotal,
}: {
  data: Product;
  onProductTotal: (total: number) => void;
}) => {
  const productTotal = data.price * data.quantity;
  onProductTotal(productTotal);
  return (
    <>
      <Card className="flex flex-row">
        <CardHeader>
          <Image
            src={data.image}
            width={150}
            height={150}
            alt="product image"
          />
        </CardHeader>
        <CardContent className="text-sm flex gap-2 flex-col">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.author}</CardDescription>
          <p>Rs. {data.price}</p>
          <p>{data.quantity}</p>
        </CardContent>
        <div className="text-sm">Total:{productTotal}</div>
      </Card>
    </>
  );
};
export default CartCard;
