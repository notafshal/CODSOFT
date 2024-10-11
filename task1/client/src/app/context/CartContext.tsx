import { createContext, useContext, useState } from "react";
interface ProductDetails {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;

  image: any;
}
interface CartContextType {
  cartItems: ProductDetails[];
  addToCart: (product: ProductDetails) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const addToCart = (item: ProductDetails) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
