import React from "react";

export default function ServiceFeatures() {
  return (
    <section className="w-full mt-16 bg-zinc-50 py-12 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Item 1: Shipping */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="mb-4 text-zinc-800 dark:text-zinc-200">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v7a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 13h5l2-5h-7v5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h4 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-100">
            Free shipping from 10 euros (DE)
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            From an order value of 10 euros we deliver free of charge within Germany!
          </p>
        </div>

        {/* Item 2: Free Card */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="mb-4 text-zinc-800 dark:text-zinc-200">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12v9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 3v9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-100">
            Free card with every order
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Look forward to a little surprise - with every order you get a free card!
          </p>
        </div>

        {/* Item 3: Purchase on account */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="mb-4 text-zinc-800 dark:text-zinc-200">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 10h20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-100">
            Purchase on account
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Order now and pay conveniently after receiving your goods - safely and easily.
          </p>
        </div>

        {/* Item 4: Reviews */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="mb-4 text-zinc-800 dark:text-zinc-200">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="mb-2 text-base font-medium text-zinc-900 dark:text-zinc-100">
            Over 10,000 positive reviews
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Satisfied customers speak for themselves — our quality and service are convincing!
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
