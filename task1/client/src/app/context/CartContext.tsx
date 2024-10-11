"use client";
import { createContext, useContext, useState } from "react";
interface ProductDetails {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}
interface CartContextType {
  cartItems: ProductDetails[];
  addToCart: (product: ProductDetails) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const addToCart = (item: ProductDetails) => {
    setCartItems((prevItems) => [...prevItems, item]);
    return item;
  };
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
