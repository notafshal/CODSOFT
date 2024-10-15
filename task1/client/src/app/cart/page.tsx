"use client";
import CartCard from "@/components/CartCard";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
interface Product {
  author: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
}
interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  total: number;
}
const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [finalTotal, setFinalTotal] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (user && user.id) {
      const fetchCart = async () => {
        await axios
          .get(`http://localhost:5000/api/cart/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCartItems(response.data);
            const total = response.data.reduce(
              (acc: number, item: CartItem) => {
                return acc + item.total;
              },
              0
            );
            console.log(total);
            setFinalTotal(total);
          })
          .catch((err) => console.log("Error fetching cart data", err));
      };
      fetchCart();
    }
  }, [user]);
  const handleDeleteCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    const newTotal = cartItems
      .filter((item) => item._id !== id)
      .reduce((acc, item) => acc + item.total, 0);
    setFinalTotal(newTotal);
  };
  return (
    <>
      <p className="text-center my-4">
        Your <span className="bg-black p-1 text-white ">Cart</span>
      </p>
      <div className=" ">
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="mx-20 my-2">
              <CartCard data={item} onDelete={handleDeleteCartItem} />
            </div>
          ))
        )}
      </div>
      <div className="font-bold">Cart Total: Rs. {finalTotal}</div>
    </>
  );
};
export default Cart;
