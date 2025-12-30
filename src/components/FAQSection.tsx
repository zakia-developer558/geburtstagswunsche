"use client";

import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What makes Grusskartenladen.de so special for me?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <path d="M12 22v-4" />
        <path d="M12 2v2" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    answer: (
      <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
        <p>At Grusskartenladen.de, your joy is the focus. We offer you a unique combination of variety and service:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">Huge selection:</span> Over 6,000 unique card motifs are waiting to be discovered - for every occasion and every taste.
          </li>
          <li>
            <span className="font-semibold">Convenient and safe:</span> Benefit from purchase on account and free shipping within Germany from an order value of €10 (international from €40).
          </li>
          <li>
            <span className="font-semibold">Small extras, great joy:</span> We will include a free card with every order - a little surprise from us for you.
          </li>
          <li>
            <span className="font-semibold">Excellent service:</span> Over 10,000 positive reviews speak for themselves. If you have any questions, you can reach us personally at <span className="text-red-500 hover:underline cursor-pointer">+49 (0)251 29795061</span>.
          </li>
          <li>
            <span className="font-semibold">Always new inspiration:</span> We expand our range with new products every month, so that you can always find the latest trends and most beautiful motifs.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    question: "What greeting cards can I find in the Grusskartenladen.de?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    answer: "You can find cards for birthdays, weddings, anniversaries, holidays, and many more occasions.",
  },
  {
    id: 3,
    question: "How do I find the perfect card quickly?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    answer: "Use our search bar or filter by category, occasion, or style to find exactly what you're looking for.",
  },
  {
    id: 4,
    question: "Does Grusskartenladen.de have any special offers or discounts?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    answer: "Yes, sign up for our newsletter to receive updates on sales, special offers, and exclusive discounts.",
  },
  {
    id: 5,
    question: "Can I also order individual or personalized cards from you?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    answer: "Currently, we focus on our curated collection of high-quality designs. Please check individual product details for any customization options.",
  },
  {
    id: 6,
    question: "How quickly will I receive my order and how much does shipping cost?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    answer: "Orders are usually processed within 24 hours. Shipping within Germany is free for orders over €10.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#ede9fe] py-16 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-xl font-medium text-zinc-900 dark:text-zinc-100">
          Frequently asked questions and answers
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden border-b border-zinc-200 last:border-0 dark:border-zinc-700"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{faq.icon}</div>
                  <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                    {faq.question}
                  </span>
                </div>
                <span className="ml-4 flex-shrink-0 text-zinc-500">
                  {openId === faq.id ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                </span>
              </button>
              
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openId === faq.id ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                     {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
