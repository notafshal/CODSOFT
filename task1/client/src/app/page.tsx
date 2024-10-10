"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {product.map((data: any) => (
        <div key={data.id}>
          <Card>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={data.image}
                width={100}
                height={100}
                alt="product image"
              />
            </CardContent>
            <CardFooter>
              <p>Rs. {data.price}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
