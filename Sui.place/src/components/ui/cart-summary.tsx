"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCartIcon, X } from "lucide-react";
import { useCart } from "../contexts/cart-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSummary() {
  const { cart, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("Cart in CartSummary:", cart);
  }, [cart]);

  if (!isClient) {
    return null;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-lg shadow-lg overflow-hidden"
      initial={{ width: "auto", height: "auto" }}
      animate={{
        width: isExpanded ? 300 : "auto",
        height: isExpanded ? "auto" : 60,
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="w-6 h-6" />
            <span>{totalItems} items</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-primary-foreground hover:text-primary-foreground/80"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollArea className="h-[200px] mt-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-primary-foreground/20"
                  >
                    <span className="text-sm">{item.title}</span>
                    <span className="text-sm">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </span>
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                ))}
              </ScrollArea>
              <Link href="/checkout" className="block mt-4">
                <Button className="w-full">Checkout</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
