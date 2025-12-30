import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export type ProductItem = {
  title: string;
  price: string; // e.g. "€2,75"
  image: string; // public path
  alt: string;
  href?: string;
};

export default function ProductCard({ title, price, image, alt, href = "#" }: ProductItem) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(title);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ id: title, title, price, image, alt, href });
  };

  return (
    <div className="group flex flex-col h-full relative">
      {/* Image area */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#fcf8f2] dark:bg-zinc-900 p-6 flex items-center justify-center">
        <Link href={href} className="absolute inset-0 z-0">
          <span className="sr-only">View {title}</span>
        </Link>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain p-4 drop-shadow-md transition-transform group-hover:scale-105 duration-300 pointer-events-none"
        />
        {/* wishlist icon */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 transition-colors ${
            isFav ? "text-red-500 hover:text-red-600" : "text-zinc-500 hover:text-red-500"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFav ? "currentColor" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20s-7-4.5-9-8.5C1 8 3.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.5 2.5 3.9 6-2 4-9.4 8.5-9.4 8.5z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <Link href={href} className="block pt-3 flex-grow">
        <div className="flex justify-end mb-1">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {price}
          </span>
        </div>
        <p className="text-sm leading-tight text-zinc-700 dark:text-zinc-300">
          {title}
        </p>
      </Link>
    </div>
  );
}
