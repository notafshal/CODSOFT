"use client";
import CartCard from "@/components/CartCard";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
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
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const { updateCartItems, removeFromCart } = useCart();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (user && user.id) {
      const fetchCart = async () => {
        await axios
          .get(`http://localhost:5000/api/cart/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const cartData = response.data;
            setCartItem(cartData);

            const total = cartData.reduce((acc: number, item: CartItem) => {
              return acc + item.total;
            }, 0);
            updateCartItems(cartData);
            setFinalTotal(total);
          })
          .catch((err) => console.log("Error fetching cart data", err));
      };
      fetchCart();
    }
  }, [user, updateCartItems]);
  const handleDeleteCartItem = (id: string) => {
    removeFromCart(id);
    setCartItem((prevItems) => prevItems.filter((item) => item._id !== id));
    const newTotal = cartItem
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
        {cartItem.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItem.map((item) => (
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
