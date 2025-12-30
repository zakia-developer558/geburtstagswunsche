"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, toggleCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, toggleCart]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={drawerRef}
        className="h-full w-full max-w-md bg-white shadow-xl dark:bg-zinc-900 flex flex-col transition-transform duration-300 transform translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Your Cart ({cartItems.length})</h2>
          <button
            onClick={toggleCart}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center dark:bg-zinc-800">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400">
                  <path d="M6 6h15l-1.5 9h-12L6 6z" />
                  <circle cx="9" cy="20" r="1.3" />
                  <circle cx="18" cy="20" r="1.3" />
                </svg>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="px-6 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-24 flex-shrink-0 bg-zinc-100 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2">{item.title}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-200 rounded-md dark:border-zinc-700">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 text-sm text-zinc-900 dark:text-zinc-100 min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between text-base font-medium text-zinc-900 dark:text-zinc-100">
              <p>Subtotal</p>
              <p>€{subtotal.toFixed(2).replace('.', ',')}</p>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="flex items-center justify-center w-full rounded-full border border-transparent bg-zinc-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Checkout
              </Link>
              <button
                onClick={toggleCart}
                className="flex items-center justify-center w-full rounded-full border border-zinc-200 bg-white px-6 py-3 text-base font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
