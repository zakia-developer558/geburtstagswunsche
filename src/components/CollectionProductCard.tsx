import React from "react";
import Image from "next/image";
import Link from "next/link";

export type CollectionProductItem = {
  title: string;
  price: string; // e.g. "€2,75"
  image: string; // public path
  alt: string;
  publisher?: string;
  href?: string;
};

export default function CollectionProductCard({ 
  title, 
  price, 
  image, 
  alt, 
  publisher = "Gutsch Verlag", // Default publisher if not provided
  href = "#" 
}: CollectionProductItem) {
  return (
    <Link href={href} className="block group">
      <div className="flex flex-col h-full">
        {/* Image area */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-2 flex items-center justify-center">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain p-2 transition-transform group-hover:scale-105 duration-300"
          />
          {/* wishlist icon */}
          <button
            aria-label="Add to wishlist"
            className="absolute right-2 top-2 z-10 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <svg
              width="18"
              height="18"
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
        <div className="pt-3 pb-1 flex flex-col flex-grow">
          {/* Publisher */}
          <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-1">
            {publisher}
          </p>
          
          {/* Title */}
          <h3 className="text-xs leading-snug text-zinc-800 dark:text-zinc-200 font-medium mb-4 line-clamp-3">
            {title}
          </h3>
          
          {/* Price */}
          <div className="mt-auto flex justify-end">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
