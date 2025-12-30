"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductCard, { ProductItem } from "@/components/ProductCard";
import ArticleProductCard from "@/components/ArticleProductCard";
import { useCart } from "@/context/CartContext";

// Dummy data for the product (matching the screenshot)
const productData = {
  title: "Business Farewell Card Premium: Elegant design with red stars and foil accents for glamorous farewells in the office.",
  publisher: "Gutsch Verlag",
  cardCount: "1469 Cards",
  id: "WBS_WB_06_WBA_01",
  type: "Double Card",
  price: "€2,90",
  vatInfo: "incl. VAT plus shipping",
  shippingLink: "#",
  stockStatus: "In stock",
  deliveryTime: "Order in the next 16 hours and shipping will take place on Tuesday, 30.12.2025.",
  description: `Our Business Farewell Card Premium is the perfect choice for glamorous farewells in the office. This greeting card impresses with its elegant design with red stars and high-quality foil accents. The red background with a geometric pattern is complemented by a blue circle with the lettering "Farewell" in different languages, making it ideal for colleagues, friends or family members. 🌟 The stylish double card comes with a matching envelope and offers enough space for personal words inside.`,
  images: [
    "/bird.jpg", // Main image placeholder
    "/donkey.jpg", // Thumbnail 1
  ],
  video: true, // Has video thumbnail
};

// Dummy related products
const relatedProducts: ProductItem[] = [
  {
    title: "Farewell Card - Hot Air Balloons in the Sky",
    price: "€2,50",
    image: "/nature.jpg",
    alt: "Hot air balloons card",
    href: "/product/farewell-card-balloons",
  },
  {
    title: "Retirement Card for Colleagues - Elegant Bronze Leaves Design",
    price: "€2,90",
    image: "/camera-man.jpg",
    alt: "Retirement Card",
    href: "/product/retirement-card-colleagues",
  },
  {
    title: "Funny Farewell Card - We will miss you! Cute penguins",
    price: "€2,50",
    image: "/sunny-girl.jpg",
    alt: "Penguin farewell card",
    href: "/product/funny-farewell-card-penguins",
  },
  {
    title: "Good Luck Card - Colorful Signposts for New Paths",
    price: "€2,90",
    image: "/donkey.jpg",
    alt: "Signpost good luck card",
    href: "/product/good-luck-card-signposts",
  },
];

// Dummy recently viewed products
const recentlyViewedProducts = [
  {
    title: "Greeting Card - Have a Wonderful Day",
    image: "/bird.jpg",
    alt: "Bird greeting card",
    href: "/blog/greeting-card-bird",
    date: "28. December 2025",
    description: "Start the day with a smile! This greeting card with a cheerful bird motif brings joy to every recipient. High-quality paper and vibrant colors make it a real eye-catcher.",
  },
  {
    title: "Birthday Card - Classic Flowers",
    image: "/nature.jpg",
    alt: "Flower birthday card",
    href: "/blog/birthday-card-flowers",
    date: "27. December 2025",
    description: "Classic elegance for a birthday. This flower card combines traditional motifs with a modern touch. The perfect choice for friends, family, or colleagues who appreciate style.",
  },
  {
    title: "Sympathy Card - Peaceful Lake",
    image: "/camera-man.jpg",
    alt: "Lake sympathy card",
    href: "/blog/sympathy-card-lake",
    date: "26. December 2025",
    description: "Quiet sympathy in difficult times. The peaceful lake motif radiates calm and comfort. Includes a high-quality envelope and space for your personal words of condolence.",
  },
  {
    title: "Thank You Card - Minimalist Design",
    image: "/sunny-girl.jpg",
    alt: "Minimalist thank you card",
    href: "/blog/thank-you-card-minimalist",
    date: "25. December 2025",
    description: "Say thank you in a stylish way. This minimalist card focuses on the essentials: your gratitude. Simple, elegant, and versatile for any occasion.",
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [activeImage, setActiveImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addToCart } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    const priceNumber = parseFloat(productData.price.replace('€', '').replace(',', '.').trim());
    addToCart({
      id: productData.id,
      title: productData.title,
      price: priceNumber,
      image: productData.images[0],
      quantity: quantity,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">Start</Link>
        <span className="mx-2">›</span>
        <Link href="/collection/farewell-cards" className="hover:text-zinc-900">Farewell cards</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden bg-[#fcf8f2] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <Image
              src={activeImage}
              alt={productData.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>
          
          <div className="flex gap-4">
            {/* Thumbnail 1 */}
            <button 
              onClick={() => setActiveImage(productData.images[0])}
              className={`relative h-24 w-20 overflow-hidden bg-white border-2 transition-colors ${activeImage === productData.images[0] ? 'border-zinc-900' : 'border-transparent hover:border-zinc-300'}`}
            >
              <Image
                src={productData.images[0]}
                alt="Thumbnail 1"
                fill
                className="object-contain p-1"
              />
            </button>
            {/* Thumbnail 2 (Video placeholder) */}
            <button className="relative h-24 w-24 bg-gradient-to-tr from-pink-500 to-orange-400 flex flex-col items-center justify-center text-white border-2 border-transparent hover:border-zinc-300 transition-colors">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="mb-1">
                 <path d="M8 5v14l11-7z" />
               </svg>
               <span className="text-[10px] font-bold uppercase">Produktvideo</span>
            </button>
             {/* Thumbnail 3 (Second Image for demo) */}
             <button 
              onClick={() => setActiveImage(productData.images[1])}
              className={`relative h-24 w-20 overflow-hidden bg-white border-2 transition-colors ${activeImage === productData.images[1] ? 'border-zinc-900' : 'border-transparent hover:border-zinc-300'}`}
            >
              <Image
                src={productData.images[1]}
                alt="Thumbnail 2"
                fill
                className="object-contain p-1"
              />
            </button>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            {productData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 text-sm text-zinc-500 mb-6">
            <span className="font-medium text-zinc-900 dark:text-zinc-200">{productData.publisher}</span>
            <span>({productData.cardCount})</span>
            <span>, ID: {productData.id}</span>
            <span>, Type: {productData.type}</span>
          </div>

          <div className="mb-8">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {productData.price}
            </div>
            <div className="text-sm text-zinc-500">
              {productData.vatInfo} <Link href={productData.shippingLink} className="underline hover:text-zinc-900">Shipping</Link>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg mb-8">
            <div className="flex gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-zinc-500 hover:text-zinc-900"
                >
                  -
                </button>
                <input 
                  type="text" 
                  value={quantity}
                  readOnly 
                  className="w-10 text-center bg-transparent border-none focus:ring-0 p-0 text-zinc-900 dark:text-zinc-100"
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-zinc-500 hover:text-zinc-900"
                >
                  +
                </button>
              </div>
              
              {/* Add Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium py-3 px-6 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add to cart
              </button>
            </div>

            {/* Payment Icons */}
            <div className="flex flex-wrap gap-2 justify-center opacity-60 grayscale text-[10px] font-bold text-zinc-400">
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">VISA</div>
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">MC</div>
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">PP</div>
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">AMEX</div>
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">Apple</div>
               <div className="h-6 w-10 bg-zinc-200 rounded flex items-center justify-center">GPay</div>
            </div>
          </div>

          {/* Stock & Delivery Info */}
          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{productData.stockStatus}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3 overflow-hidden">
               <div className="h-full bg-green-500 w-3/4"></div>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {productData.deliveryTime}
            </p>
          </div>

          {/* Service Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
             <div className="flex items-start gap-3">
               <span className="text-xl">📦</span>
               <span className="text-sm text-zinc-600 dark:text-zinc-400">Free shipping from 10 euros (DE)</span>
             </div>
             <div className="flex items-start gap-3">
               <span className="text-xl">💌</span>
               <span className="text-sm text-zinc-600 dark:text-zinc-400">Free card with every order</span>
             </div>
             <div className="flex items-start gap-3">
               <span className="text-xl">📄</span>
               <span className="text-sm text-zinc-600 dark:text-zinc-400">Purchase on account</span>
             </div>
             <div className="flex items-start gap-3">
               <span className="text-xl">🔄</span>
               <span className="text-sm text-zinc-600 dark:text-zinc-400">1 month right of withdrawal</span>
             </div>
          </div>

          {/* Description */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className={`text-zinc-600 dark:text-zinc-300 italic ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
              {productData.description}
            </p>
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 text-sm border border-zinc-200 px-3 py-1 rounded bg-white hover:bg-zinc-50 transition-colors"
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-20">
        <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 mb-8">
          You might also like these cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      <section className="mt-20 pb-20">
        <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 mb-8">
          You might also like these articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewedProducts.map((product, index) => (
            <ArticleProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
}
