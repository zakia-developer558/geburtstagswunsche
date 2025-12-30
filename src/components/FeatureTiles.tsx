import React from "react";

export default function FeatureTiles() {
  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Purchase on account */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-black dark:border-zinc-800">
        <svg width="32" height="32" viewBox="0 0 24 24" className="text-accent" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="5" y="9" width="8" height="2" rx="1" fill="currentColor" />
        </svg>
        <div>
          <p className="text-xs text-zinc-500">PURCHASE ON ACCOUNT</p>
        </div>
      </div>
      {/* Trustami reviews */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-black dark:border-zinc-800">
        <svg width="32" height="32" viewBox="0 0 24 24" className="text-accent" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 16l-3.5 2 1-4-3-2.8 4.1-.4L12 7l1.4 3.8 4.1.4-3 2.8 1 4z" fill="currentColor" />
        </svg>
        <div>
          <p className="text-xs text-zinc-500">OVER 12 300 POSITIVE REVIEWS</p>
        </div>
      </div>
      {/* Free shipping */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-black dark:border-zinc-800">
        <svg width="32" height="32" viewBox="0 0 24 24" className="text-accent" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="13" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 10h4l2 3v3h-2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="7" cy="18" r="1.5" fill="currentColor" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        </svg>
        <div>
          <p className="text-xs text-zinc-500">FREE SHIPPING FROM 10 EUROS</p>
        </div>
      </div>
      {/* Free card */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-black dark:border-zinc-800">
        <svg width="32" height="32" viewBox="0 0 24 24" className="text-accent" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 8v-2m0 0l-2 2m2-2l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <div>
          <p className="text-xs text-zinc-500">FREE CARD WITH EVERY ORDER</p>
        </div>
      </div>
    </section>
  );
}
