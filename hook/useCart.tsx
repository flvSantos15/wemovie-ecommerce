'use client'

import { CartContext, ICartContextType } from "@/context/cart-context";
import { useContext } from "react";

export const useCart = (): ICartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};