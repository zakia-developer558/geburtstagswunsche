"use client";

import React, { useRef, useState, useEffect } from "react";

interface ReviewItem {
  id: number;
  name: string;
  source: string;
  text: string;
  rating: number;
}

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Andrea M.",
    source: "Google Review",
    text: "For my hobby Postcrossing I need a lot of postcards on different topics - and here the selection is large, the prices moderate and the shipping fast! What more could you want?",
    rating: 5,
  },
  {
    id: 2,
    name: "Karola N.",
    source: "Google Review",
    text: "Fast delivery, price completely okay compared to many other providers, really pretty card for children's birthday",
    rating: 5,
  },
  {
    id: 3,
    name: "R W",
    source: "Google Review",
    text: "Very good shop. I bought postcards there for Christmas. Very friendly contact, delivered very quickly, 1a quality, best.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael S.",
    source: "Google Review",
    text: "Great selection of cards. The quality is amazing and shipping was super fast. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah L.",
    source: "Google Review",
    text: "Lovely designs and great paper quality. Will definitely order again for the next occasion.",
    rating: 5,
  },
  {
    id: 6,
    name: "Thomas K.",
    source: "Google Review",
    text: "Everything perfect. From ordering to delivery. The cards look even better in person.",
    rating: 5,
  },
];

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate number of dots based on visible items. 
  // For simplicity in this responsive layout (1 on mobile, 3 on desktop), 
  // we'll just map dots to the start of each "page" or group.
  // Actually, standard carousel behavior maps dots to scroll positions.
  // Let's assume 6 items total.
  // On desktop (3 cols): 2 pages (index 0 and 3).
  // On mobile (1 col): 6 pages (index 0, 1, 2, 3, 4, 5).
  // To keep it simple and consistent with the "6 dots" visual from the user, 
  // we will treat each item as a snap point, so 6 dots = 6 items.
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Near start
      if (scrollLeft < 10) {
        if (activeIndex !== 0) setActiveIndex(0);
        return;
      }

      // Near end
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        if (activeIndex !== reviews.length - 1) setActiveIndex(reviews.length - 1);
        return;
      }
      
      const containerCenter = scrollLeft + clientWidth / 2;
      
      let closestIndex = 0;
      let minDiff = Infinity;
      
      Array.from(container.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(containerCenter - cardCenter);
        
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    }
  };

  const scrollToReview = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[index] as HTMLElement;
      
      if (card) {
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="bg-white py-16 dark:bg-zinc-900">
      <h2 className="mb-12 text-center text-2xl font-medium text-zinc-900 dark:text-zinc-100">
        How customers rate us
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-4 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`w-[280px] flex-none snap-center rounded-lg border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800 sm:w-[320px] md:w-[350px] transition-all duration-300 ${
                activeIndex === index ? "ring-1 ring-zinc-200 dark:ring-zinc-700 shadow-md scale-[1.02]" : "scale-100"
              }`}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 text-center">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {review.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {review.source}
                  </p>
                </div>

                <p className="mb-8 flex-grow text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {review.text}
                </p>

                <div className="flex justify-center text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                
                 {/* Speech Bubble Icon - Positioned absolute relative to card */}
                <div className="absolute bottom-4 right-4 text-zinc-200 dark:text-zinc-700">
                    <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToReview(index)}
              className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                activeIndex === index
                  ? "border-zinc-800 bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100"
                  : "border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
