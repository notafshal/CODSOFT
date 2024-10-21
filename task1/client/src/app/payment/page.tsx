"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Payment() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const total = cartItems.reduce((acc, item) => {
    return acc + Number(item.total);
  }, 0);
  const totalAfterShipping = total + 100;
  console.log(total);
  return (
    <>
      <div className=" mx-6">
        <h2 className="my-2">Your Cart Items</h2>
        <div className="lg:flex w-screen justify-between">
          <div className="flex-row bg-neutral-100 p-4 w-full rounded-lg">
            <p className="text-end">
              Product Total : <span>{total}</span>
              <h3>Shipping : Rs.100</h3>
              <h3>Total: {totalAfterShipping}</h3>
            </p>

            <div className="grid grid-cols-5 ">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{item.product.title}</CardTitle>
                      <CardDescription>{item.product.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={item.product.image}
                        alt="product image"
                        height={50}
                        width={50}
                      />
                    </CardContent>
                    <CardFooter>
                      Rs.<p>{item.product.price}</p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="my-2 lg:w-1/3 lg:mx-10">
            <Card className="">
              <CardHeader>
                <CardTitle> {user?.email}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <label>Your Location</label>
                <Input placeholder="Your Location" />
                <label>Payment Method</label>
                <RadioGroup defaultValue="cashonDelivery">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cashonDelivery"
                      id="cashonDelivery"
                    />
                    <Label htmlFor="cashonDelivery">Cash On delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="online-payment"
                      id="online-payment"
                    />
                    <Label htmlFor="online-payment">Online Payment</Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Link href="/">
                  <Button
                    onClick={() => {
                      alert("Your Items will be delivered soon");
                      clearCart();
                    }}
                  >
                    Deliver Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
