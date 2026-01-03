"use client";
import React, { useEffect, useState, useRef } from "react";
import CollectionProductCard, { CollectionProductItem } from "@/components/CollectionProductCard";

interface APIProduct {
  _id: string;
  productData: {
    title: string;
    slug: string;
    price: {
      formatted: string;
    };
    images: string[];
    description?: string;
  };
}

export default function CollectionsCarousel() {
  const [products, setProducts] = useState<CollectionProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const json = await res.json();
        if (json.success && Array.isArray(json.products)) {
          const mappedProducts: CollectionProductItem[] = json.products.map((p: APIProduct) => ({
            title: p.productData.title,
            price: p.productData.price.formatted,
            image: p.productData.images[0] || "/placeholder.jpg",
            alt: p.productData.title,
            publisher: "Gutsch Verlag", // Static for now as not in API
            href: `/product/${p.productData.slug}`,
          }));

          // Shuffle and take first 6
          for (let i = mappedProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mappedProducts[i], mappedProducts[j]] = [mappedProducts[j], mappedProducts[i]];
          }

          setProducts(mappedProducts.slice(0, 6)); // First 6 for this section
        }
      } catch (error) {
        console.error("Error fetching collection products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const scrollByCards = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 /* gap */ : el.clientWidth / 2;
    el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Kollektionen</h3>
      </div>

      <div className="relative group">
        {/* Previous Button - Left Side */}
        <button
          aria-label="Previous"
          onClick={() => scrollByCards("prev")}
          className="hidden sm:inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-zinc-800 hover:bg-white dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
        >
          {loading ? (
            // Loading Skeletons
            [...Array(6)].map((_, i) => (
              <div key={i} className="snap-center shrink-0 basis-[45%] sm:basis-[30%] lg:basis-[20%]">
                <div className="aspect-[4/5] w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-md" />
              </div>
            ))
          ) : (
            products.map((product, i) => (
              <div
                key={i}
                data-card
                className="snap-center shrink-0 basis-[45%] sm:basis-[30%] lg:basis-[20%]"
              >
                <CollectionProductCard {...product} />
              </div>
            ))
          )}
        </div>

        {/* Next Button - Right Side */}
        <button
          aria-label="Next"
          onClick={() => scrollByCards("next")}
          className="hidden sm:inline-flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-zinc-800 hover:bg-white dark:bg-zinc-800/90 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}