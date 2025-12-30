"use client";
import React, { useState } from "react";
import ProductCard, { ProductItem } from "@/components/ProductCard";

const products: ProductItem[] = [
  {
    title:
      "Birthday Card with Sparkler and Golden Font Happy Birthday Noble Greeting Card Birthday Modern Festive Double Card",
    price: "€2,75",
    image: "/bird.jpg",
    alt: "Happy Birthday card with golden sparkler design",
    href: "/product/birthday-card-sparkler",
  },
  {
    title:
      "Birthday Card \"Just Be Yourself\" — Humorous Frog Illustration in Yellow & Green, Creative Congratulations for Individuality",
    price: "€2,90",
    image: "/donkey.jpg",
    alt: "Humorous frog birthday card in yellow and green",
    href: "/product/birthday-card-frog",
  },
  {
    title:
      "Birthday Card Funny for Seniors with Saying Top Fit and Bottom Dense Birthday Card Red Glasses Star Vintage Design",
    price: "€2,90",
    image: "/camera-man.jpg",
    alt: "Vintage red glasses themed birthday card for seniors",
    href: "/product/birthday-card-seniors",
  },
  {
    title:
      "Birthday Card with Floral Motif and Butterfly in Blue Purple Watercolor Birthday Greeting Card Noble Design",
    price: "€2,75",
    image: "/nature.jpg",
    alt: "Blue and purple watercolor floral birthday card",
    href: "/product/birthday-card-floral",
  },
  {
    title:
      "Birthday Card with Flower Meadow and Happy Birthday Colorful Double Card for Personal Birthday",
    price: "€2,75",
    image: "/sunny-girl.jpg",
    alt: "Colorful flower meadow birthday card",
    href: "/product/birthday-card-meadow",
  },
    {
    title:
      "Birthday Card with Sparkler and Golden Font Happy Birthday Noble Greeting Card Birthday Modern Festive Double Card",
    price: "€2,75",
    image: "/bird.jpg",
    alt: "Happy Birthday card with golden sparkler design",
    href: "#",
  },
  {
    title:
      "Birthday Card \"Just Be Yourself\" — Humorous Frog Illustration in Yellow & Green, Creative Congratulations for Individuality",
    price: "€2,90",
    image: "/donkey.jpg",
    alt: "Humorous frog birthday card in yellow and green",
    href: "#",
  },
  {
    title:
      "Birthday Card Funny for Seniors with Saying Top Fit and Bottom Dense Birthday Card Red Glasses Star Vintage Design",
    price: "€2,90",
    image: "/camera-man.jpg",
    alt: "Vintage red glasses themed birthday card for seniors",
    href: "#",
  },
  {
    title:
      "Birthday Card with Floral Motif and Butterfly in Blue Purple Watercolor Birthday Greeting Card Noble Design",
    price: "€2,75",
    image: "/nature.jpg",
    alt: "Blue and purple watercolor floral birthday card",
    href: "#",
  },
  {
    title:
      "Birthday Card with Flower Meadow and Happy Birthday Colorful Double Card for Personal Birthday",
    price: "€2,75",
    image: "/sunny-girl.jpg",
    alt: "Colorful flower meadow birthday card",
    href: "#",
  },
  {
    title:
      "Birthday Card with Sparkler and Golden Font Happy Birthday Noble Greeting Card Birthday Modern Festive Double Card",
    price: "€2,75",
    image: "/bird.jpg",
    alt: "Happy Birthday card with golden sparkler design",
    href: "#",
  },
  {
    title:
      "Birthday Card \"Just Be Yourself\" — Humorous Frog Illustration in Yellow & Green, Creative Congratulations for Individuality",
    price: "€2,90",
    image: "/donkey.jpg",
    alt: "Humorous frog birthday card in yellow and green",
    href: "#",
  },
  {
    title:
      "Birthday Card Funny for Seniors with Saying Top Fit and Bottom Dense Birthday Card Red Glasses Star Vintage Design",
    price: "€2,90",
    image: "/camera-man.jpg",
    alt: "Vintage red glasses themed birthday card for seniors",
    href: "#",
  },
  {
    title:
      "Birthday Card with Floral Motif and Butterfly in Blue Purple Watercolor Birthday Greeting Card Noble Design",
    price: "€2,75",
    image: "/nature.jpg",
    alt: "Blue and purple watercolor floral birthday card",
    href: "#",
  },
  {
    title:
      "Birthday Card with Flower Meadow and Happy Birthday Colorful Double Card for Personal Birthday",
    price: "€2,75",
    image: "/sunny-girl.jpg",
    alt: "Colorful flower meadow birthday card",
    href: "#",
  },
];

export default function PopularCardsSection() {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Popular cards from our collections</h3>
        <nav className="flex gap-4 text-sm">
          <a href="#" className="text-accent hover:underline">Birthday Cards</a>
          <a href="#" className="text-zinc-600 hover:text-accent">Birthday cards</a>
          <a href="#" className="text-zinc-600 hover:text-accent">Art Postcards</a>
          <a href="#" className="text-zinc-600 hover:text-accent">Sympathy Cards</a>
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.slice(0, visibleCount).map((p, idx) => (
          <ProductCard key={idx} {...p} />
        ))}
      </div>

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