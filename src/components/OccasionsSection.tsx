"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface APIProduct {
  _id: string;
  productData: {
    title: string;
    slug: string;
    images: string[];
  };
}

function Tile({
  title,
  image,
  alt,
  href = "#",
  className = "",
}: {
  title: string;
  image: string;
  alt: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className} group`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-3 left-3 right-3">
        <Link
          href={href}
          className="inline-flex items-center bg-black/70 backdrop-blur-sm text-white px-3 py-2 text-xs font-medium rounded hover:bg-black/90 transition-colors"
        >
          <span className="truncate max-w-[200px]">{title}</span>
          <svg
            className="ml-2 flex-shrink-0"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function OccasionsSection() {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const json = await res.json();
        if (json.success && Array.isArray(json.products)) {
          // Shuffle and take 4
          const shuffled = [...json.products];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setProducts(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching occasion products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 animate-pulse">
        <div className="lg:col-span-7 aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="col-span-2 aspect-[16/9] bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>
      </section>
    );
  }

  if (products.length < 4) return null; // Don't show if not enough products

  return (
    <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: large tile */}
      <Tile
        title={products[0].productData.title}
        image={products[0].productData.images[0] || "/placeholder.jpg"}
        alt={products[0].productData.title}
        href={`/product/${products[0].productData.slug}`}
        className="lg:col-span-7 aspect-[4/3] rounded-lg"
      />

      {/* Right group: 2 tiles top, 1 tile bottom spanning two columns */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        <Tile
          title={products[1].productData.title}
          image={products[1].productData.images[0] || "/placeholder.jpg"}
          alt={products[1].productData.title}
          href={`/product/${products[1].productData.slug}`}
          className="aspect-[4/3] rounded-lg"
        />
        <Tile
          title={products[2].productData.title}
          image={products[2].productData.images[0] || "/placeholder.jpg"}
          alt={products[2].productData.title}
          href={`/product/${products[2].productData.slug}`}
          className="aspect-[4/3] rounded-lg"
        />
        <Tile
          title={products[3].productData.title}
          image={products[3].productData.images[0] || "/placeholder.jpg"}
          alt={products[3].productData.title}
          href={`/product/${products[3].productData.slug}`}
          className="col-span-2 aspect-[16/9] rounded-lg"
        />
      </div>
    </section>
  );
}
