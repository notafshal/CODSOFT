"use client";
import CartCard from "@/components/CartCard";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const handleProductTotal = (productTotal: number) => {
    setTotalPrice((prevTotal) => prevTotal + productTotal);
  };
  console.log(totalPrice);
  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [cartItems]);
  return (
    <>
      Cart
      {cartItems.map((item) => (
        <div key={item.id}>
          <CartCard data={item} onProductTotal={handleProductTotal} />
        </div>
      ))}
      <div className="font-bold">Cart Total: Rs. {totalPrice}</div>
    </>
  );
};
export default Cart;
