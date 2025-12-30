"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Germany",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 10 ? 0 : 2.90; // Free shipping over 10€
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      setIsOrderPlaced(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100 mb-2">Thank you for your order!</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
          We have received your order and will send you a confirmation email at <span className="font-medium text-zinc-900 dark:text-zinc-200">{formData.email}</span> shortly.
        </p>
        <Link href="/" className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100 mb-4">Your cart is empty</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Checkout Form */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Postal code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  >
                    <option value="Germany">Germany</option>
                    <option value="Austria">Austria</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
               <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Payment</h2>
               <div className="space-y-4">
                 <div className="flex items-center p-4 border border-zinc-200 rounded-lg dark:border-zinc-700">
                   <input id="card" name="payment-type" type="radio" defaultChecked className="h-4 w-4 border-zinc-300 text-zinc-600 focus:ring-zinc-500" />
                   <label htmlFor="card" className="ml-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                     Credit Card
                   </label>
                   <div className="ml-auto flex gap-2">
                     <div className="h-5 w-8 bg-zinc-200 rounded"></div>
                     <div className="h-5 w-8 bg-zinc-200 rounded"></div>
                   </div>
                 </div>
                 <div className="flex items-center p-4 border border-zinc-200 rounded-lg dark:border-zinc-700">
                   <input id="paypal" name="payment-type" type="radio" className="h-4 w-4 border-zinc-300 text-zinc-600 focus:ring-zinc-500" />
                   <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                     PayPal
                   </label>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-24">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={96}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-zinc-100">
                            <h3 className="line-clamp-2 pr-4">{item.title}</h3>
                            <p className="ml-4">€{(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-zinc-500 dark:text-zinc-400">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 mt-6 pt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <p>Subtotal</p>
                  <p>€{subtotal.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <p>Shipping</p>
                  <p>{shippingCost === 0 ? "Free" : `€${shippingCost.toFixed(2).replace('.', ',')}`}</p>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center justify-between text-base font-medium text-zinc-900 dark:text-zinc-100">
                  <p>Total</p>
                  <p>€{total.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full border border-transparent bg-zinc-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Place Order
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
