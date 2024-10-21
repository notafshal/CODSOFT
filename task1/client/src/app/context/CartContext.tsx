"use client";
import { createContext, ReactNode, useContext, useState } from "react";
interface ProductDetails {
  [x: string]: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
  quantity: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}
interface CartContextType {
  cartItems: ProductDetails[];
  addToCart: (product: ProductDetails) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartItemsCount: number;
  updateCartItems: (items: ProductDetails[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const addToCart = (item: ProductDetails) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
    return item;
  };
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const updateCartItems = (items: ProductDetails[]) => {
    setCartItems(items);
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItems,
        cartItemsCount,
      }}
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
