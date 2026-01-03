"use client";
import React, { useState, useEffect } from "react";
import ProductCard, { ProductItem } from "@/components/ProductCard";

interface APIProduct {
  _id: string;
  productData: {
    title: string;
    slug: string;
    price: {
      formatted: string;
    };
    images: string[];
  };
}

export default function PopularCardsSection() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        // Fetch a larger batch to allow client-side 'load more'
        const res = await fetch(`${baseUrl}/api/products?limit=50`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const json = await res.json();
        if (json.success && Array.isArray(json.products)) {
          const mappedProducts: ProductItem[] = json.products.map((p: APIProduct) => ({
            title: p.productData.title,
            price: p.productData.price.formatted,
            image: p.productData.images[0] || "/placeholder.jpg",
            alt: p.productData.title,
            href: `/product/${p.productData.slug}`,
          }));

          // Shuffle the products randomly
          for (let i = mappedProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mappedProducts[i], mappedProducts[j]] = [mappedProducts[j], mappedProducts[i]];
          }

          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error fetching popular cards:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Popular cards from our collections</h3>
        {/* Removed category nav as per user feedback that products don't have categories in this context */}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-md" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.slice(0, visibleCount).map((p, idx) => (
            <ProductCard key={idx} {...p} />
          ))}
        </div>
      )}

      {visibleCount < products.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}