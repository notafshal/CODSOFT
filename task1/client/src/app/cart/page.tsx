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
}
const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (user && user.id) {
      const fetchCart = async () => {
        await axios
          .get(`http://localhost:5000/api/cart/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Cart API Response:", response);
            setCartItems(response.data);
          })
          .catch((err) => console.log("Error fetching cart data", err));
      };
      fetchCart();
    }
  }, [user]);

  return (
    <>
      Cart
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <CartCard data={item} />
          </div>
        ))
      )}
      <div className="font-bold">Cart Total: Rs. </div>
    </>
  );
};
export default Cart;
