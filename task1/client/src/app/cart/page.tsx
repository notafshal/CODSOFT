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
}
const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleProductTotal = (productTotal: number) => {
    setTotalPrice((prevTotal) => prevTotal + productTotal);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && user.id) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/cart/${user.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response);
          setCartItems(response.data);
        } catch (err) {
          console.log("Error fetching cart data", err);
        }
      };
      fetchCart();
    }
  }, [user]);
  return (
    <>
      Cart
      {cartItems.map((item) => (
        <div key={item._id}>
          <CartCard data={item.product} onProductTotal={handleProductTotal} />
        </div>
      ))}
      <div className="font-bold">Cart Total: Rs. {totalPrice}</div>
    </>
  );
};
export default Cart;
