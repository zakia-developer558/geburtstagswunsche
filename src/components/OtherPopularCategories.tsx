"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface CategoryItem {
  id: number;
  title: string;
  image: string;
}

const categories: CategoryItem[] = [
  {
    id: 1,
    title: "Greeting cards for communion",
    image: "/bird.jpg",
  },
  {
    id: 2,
    title: "Retirement map",
    image: "/donkey.jpg",
  },
  {
    id: 3,
    title: "Christmas cards",
    image: "/camera-man.jpg",
  },
  {
    id: 4,
    title: "Farewell cards",
    image: "/nature.jpg",
  },
  {
    id: 5,
    title: "Get well cards",
    image: "/sunny-girl.jpg",
  },
  {
    id: 6,
    title: "Wedding cards",
    image: "/bird.jpg",
  },
];

export default function OtherPopularCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-16 py-12">
      <h2 className="mb-12 text-center text-2xl font-medium text-zinc-900 dark:text-zinc-100">
        Other Popular Categories
      </h2>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition-all hover:bg-black sm:-left-4"
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[200px] flex-none snap-start sm:min-w-[220px]"
            >
              <div className="group relative aspect-square overflow-hidden bg-transparent">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white transition-all hover:bg-black sm:-right-4"
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
