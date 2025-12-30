"use client";

import React from "react";

export default function NewsletterSection() {
  return (
    <section className="bg-zinc-100 py-16 dark:bg-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column - Voucher Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl tracking-wider text-zinc-500 uppercase font-medium mb-1">
                NEWSLETTERS
              </h2>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                5 EURO VOUCHER
              </h3>
              <p className="text-base text-zinc-700 dark:text-zinc-300">
                Subscribe to our newsletter now and get a 5-euro voucher*
              </p>
            </div>
            
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              *You will receive your €5 voucher by email to the address you provided after completing the registration. Simply enter the voucher code in the "Redeem discount code" field in the shopping cart. Only one voucher is valid per customer and purchase. The voucher is valid for a minimum order value of €20.00.
            </p>
          </div>

          {/* Right Column - Form & Important Info */}
          <div className="space-y-6">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Subscribe
              </button>
            </form>

            <div className="flex gap-3">
              <div className="flex-shrink-0 pt-1 text-yellow-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 italic">
                <span className="font-semibold not-italic text-zinc-700 dark:text-zinc-300">Important:</span> After registering, you will receive an email with a confirmation link (please also check your spam folder). Only after clicking on this link is your registration complete. By registering, you agree to our privacy policy. The offer is only valid for new customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
