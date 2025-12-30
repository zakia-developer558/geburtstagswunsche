import React from "react";
import Image from "next/image";
import Link from "next/link";

export type ProductItem = {
  title: string;
  price: string; // e.g. "€2,75"
  image: string; // public path
  alt: string;
  href?: string;
};

export default function ProductCard({ title, price, image, alt, href = "#" }: ProductItem) {
  return (
    <Link href={href} className="block group">
      <div className="flex flex-col h-full">
        {/* Image area */}
        <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#fcf8f2] dark:bg-zinc-900 p-6 flex items-center justify-center">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain p-4 drop-shadow-md transition-transform group-hover:scale-105 duration-300"
          />
          {/* wishlist icon */}
          <button
            aria-label="Add to wishlist"
            className="absolute right-3 top-3 z-10 text-zinc-500 hover:text-red-500 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20s-7-4.5-9-8.5C1 8 3.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.5 2.5 3.9 6-2 4-9.4 8.5-9.4 8.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="pt-3">
          <div className="flex justify-end mb-1">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {price}
            </span>
          </div>
          <p className="text-sm leading-tight text-zinc-700 dark:text-zinc-300">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}
