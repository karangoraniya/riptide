import CheckoutPage from "@/components/blocks/checkout-page";
import { CartProvider } from "@/components/contexts/cart-context";
import React from "react";

const page = () => {
  return (
    <CartProvider>
      <CheckoutPage />
    </CartProvider>
  );
};

export default page;
