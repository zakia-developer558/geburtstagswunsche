"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import ProductCard, { ProductItem } from "@/components/ProductCard";
import ArticleProductCard from "@/components/ArticleProductCard";
import { useCart } from "@/context/CartContext";

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

    // Additional fields that might be in API or need defaults
    publisher?: string;
    cardCount?: string;
    id?: string;
    type?: string;
    vatInfo?: string;
    shippingLink?: string;
    stockStatus?: string;
    deliveryTime?: string;
    video?: boolean;
  };
}

interface APIPost {
  _id: string;
  slug: string;
  blogContent: {
    title: string;
    content: string; // HTML content
  };
  createdAt: string;
  firebaseImages: { url: string }[];
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<APIProduct['productData'] | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // 1. Fetch Products
        const productsRes = await fetch(`${baseUrl}/api/products?limit=100`);
        const productsJson = await productsRes.json();

        if (productsJson.success && Array.isArray(productsJson.products)) {
          const allProducts: APIProduct[] = productsJson.products;

          // Find current product
          const foundProduct = allProducts.find(p => p.productData.slug === slug);

          if (foundProduct) {
            // Merge with defaults for missing fields
            const pData = {
              ...foundProduct.productData,
              publisher: foundProduct.productData.publisher || "Gutsch Verlag",
              cardCount: foundProduct.productData.cardCount || "1 Card",
              id: foundProduct.productData.id || foundProduct._id.substring(0, 8).toUpperCase(),
              type: foundProduct.productData.type || "Double Card",
              vatInfo: foundProduct.productData.vatInfo || "incl. VAT plus shipping",
              shippingLink: foundProduct.productData.shippingLink || "#",
              stockStatus: foundProduct.productData.stockStatus || "In stock",
              deliveryTime: foundProduct.productData.deliveryTime || "Order in the next 16 hours...",
              description: foundProduct.productData.description || "No description available.",
              video: false // API doesn't seem to have video yet
            };

            setProduct(pData);
            setActiveImage(pData.images[0] || "/placeholder.jpg");

            // Related Products (Random 4 excluding current)
            const others = allProducts.filter(p => p.productData.slug !== slug);
            const shuffled = [...others].sort(() => 0.5 - Math.random());
            const selectedRelated = shuffled.slice(0, 4).map(p => ({
              title: p.productData.title,
              price: p.productData.price.formatted,
              image: p.productData.images[0] || "/placeholder.jpg",
              alt: p.productData.title,
              href: `/product/${p.productData.slug}`,
            }));
            setRelatedProducts(selectedRelated);
          } else {
            // If not found, we might eventually redirect to 404, but for now just leave state null
            // or handle gracefully
          }
        }

        // 2. Fetch Posts (for "You might also like these articles")
        const postsRes = await fetch(`${baseUrl}/api/posts`);
        const postsJson = await postsRes.json();

        if (postsJson.success && Array.isArray(postsJson.posts)) {
          const allPosts: APIPost[] = postsJson.posts;
          // Shuffle and pick 4
          const shuffledPosts = [...allPosts].sort(() => 0.5 - Math.random());
          const selectedPosts = shuffledPosts.slice(0, 4).map(post => {
            // Strip HTML for description
            const rawContent = post.blogContent.content || "";
            const textContent = rawContent.replace(/<[^>]*>/g, "").substring(0, 150) + "...";

            // Normalize image URL (convert protocol-relative URLs to https)
            const normalizeImageUrl = (url: string) => {
              if (!url) return "/placeholder.jpg";
              if (url.startsWith('//')) return `https:${url}`;
              return url;
            };

            return {
              title: post.blogContent.title,
              image: normalizeImageUrl(post.firebaseImages?.[0]?.url || "/placeholder.jpg"),
              alt: post.blogContent.title,
              href: `/blog/${post.slug}`,
              date: new Date(post.createdAt).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }),
              description: textContent,
            };
          });
          setRelatedArticles(selectedPosts);
        }

      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // Parse price string to number: "€2,90" -> 2.90
    const priceString = product.price.formatted || "0";
    const priceNumber = parseFloat(priceString.replace(/[^0-9,.]/g, '').replace(',', '.'));

    addToCart({
      id: product.id || "0",
      title: product.title,
      price: isNaN(priceNumber) ? 0 : priceNumber,
      image: product.images[0],
      quantity: quantity,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">Start</Link>
        <span className="mx-2">›</span>
        <Link href="/collection" className="hover:text-zinc-900">Collection</Link>
        <span className="mx-2">›</span>
        <span className="text-zinc-900 truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden bg-[#fcf8f2] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-24 w-20 shrink-0 overflow-hidden bg-white border-2 transition-colors ${activeImage === img ? 'border-zinc-900' : 'border-transparent hover:border-zinc-300'}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}

            {/* Video Placeholder if valid */}
            {product.video && (
              <button className="relative h-24 w-24 shrink-0 bg-gradient-to-tr from-pink-500 to-orange-400 flex flex-col items-center justify-center text-white border-2 border-transparent hover:border-zinc-300 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="mb-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-[10px] font-bold uppercase">Produktvideo</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div>
          <h1 className="text-3xl font-serif text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 text-sm text-zinc-500 mb-6">
            <span className="font-medium text-zinc-900 dark:text-zinc-200">{product.publisher}</span>
            <span>({product.cardCount})</span>
            <span>, ID: {product.id}</span>
            <span>, Type: {product.type}</span>
          </div>

          <div className="mb-8">
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {product.price.formatted}
            </div>
            <div className="text-sm text-zinc-500">
              {product.vatInfo} <Link href={product.shippingLink || "#"} className="underline hover:text-zinc-900">Shipping</Link>
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
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{product.stockStatus}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-green-500 w-3/4"></div>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {product.deliveryTime}
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
            <div
              className={`text-zinc-600 dark:text-zinc-300 italic ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 text-sm border border-zinc-200 px-3 py-1 rounded bg-white hover:bg-zinc-50 transition-colors"
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>

        </div>
      </div>

      {/* Related Products Section (Cards) */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 mb-8">
            You might also like these cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, index) => (
              <ProductCard key={index} {...p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Articles Section (Posts) */}
      {relatedArticles.length > 0 && (
        <section className="mt-20 pb-20">
          <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 mb-8">
            You might also like these articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArticles.map((article, index) => (
              <ArticleProductCard key={index} {...article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
