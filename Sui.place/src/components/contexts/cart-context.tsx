"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  developer_wallet_address: string;
}

interface CartContextType {
  cart: CartItem[];
  isInitialized: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (
          Array.isArray(parsedCart) &&
          parsedCart.every(
            (item) =>
              typeof item === "object" &&
              "id" in item &&
              "title" in item &&
              "price" in item &&
              "quantity" in item
          )
        ) {
          setCart(parsedCart);
        } else {
          console.error("Invalid cart data in localStorage");
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, isInitialized, addToCart, removeFromCart, clearCart }}
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
