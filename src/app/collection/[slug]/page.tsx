import React from "react";
import Link from "next/link";
import CollectionProductCard, { CollectionProductItem } from "@/components/CollectionProductCard";

// Mock data for products
const products: CollectionProductItem[] = [
  {
    title: "Business Farewell Card Premium: Elegant design with red stars and foil accents for glamorous farewells in the office.",
    price: "€2,90",
    image: "/bird.jpg", // Using existing placeholder images
    alt: "Business Farewell Card",
    publisher: "Gutsch Verlag",
    href: "/product/business-farewell-card-premium",
  },
  {
    title: "Farewell card for the world trip: Have a good trip & thirst for adventure - greeting card with suitcase sticker design",
    price: "€2,50",
    image: "/donkey.jpg",
    alt: "World trip farewell card",
    publisher: "Publisher Dominique",
    href: "/product/farewell-card-world-trip",
  },
  {
    title: "Retirement Card for Colleagues - Elegant Bronze Leaves Design for Retirement and Farewell Wishes",
    price: "€2,90",
    image: "/camera-man.jpg",
    alt: "Retirement Card",
    publisher: "Gutsch Verlag",
    href: "/product/retirement-card-colleagues",
  },
  {
    title: "Farewell card with watering can and rubber boots for new beginnings, loving saying, farewell card, garden motif, courage, change",
    price: "€1,20",
    image: "/nature.jpg",
    alt: "Garden themed farewell card",
    publisher: "Turnowsky Design",
    href: "/product/farewell-card-garden",
  },
  {
    title: "Funny Farewell Card - We will miss you! Cute penguins waving goodbye",
    price: "€2,50",
    image: "/sunny-girl.jpg",
    alt: "Penguin farewell card",
    publisher: "Gutsch Verlag",
    href: "/product/funny-farewell-card-penguins",
  },
  {
    title: "Retirement Card - Floral Design with Orange Flowers",
    price: "€2,75",
    image: "/bird.jpg",
    alt: "Floral retirement card",
    publisher: "Cityproducts",
    href: "/product/retirement-card-floral",
  },
  {
    title: "Good Luck Card - Colorful Signposts for New Paths",
    price: "€2,90",
    image: "/donkey.jpg",
    alt: "Signpost good luck card",
    publisher: "Skorpion",
    href: "/product/good-luck-card-signposts",
  },
  {
    title: "Farewell Card - Hot Air Balloons in the Sky",
    price: "€2,50",
    image: "/nature.jpg",
    alt: "Hot air balloons card",
    publisher: "Tushita",
    href: "/product/farewell-card-balloons",
  },
];

// Helper to format slug to title
const formatTitle = (slug: string) => {
  const map: Record<string, string> = {
    abschied: "Farewell cards",
    geburtstag: "Birthday cards",
    geburt: "Birth cards",
    glueckwuensche: "Congratulations",
    hochzeit: "Wedding cards",
    trauer: "Sympathy cards",
    weihnachten: "Christmas cards",
    postkarten: "Postcards",
    anlaesse: "Occasions",
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

// Helper for description
const getDescription = (slug: string) => {
    const map: Record<string, string> = {
        abschied: "You will find a large selection of farewell cards - whether for the last day of work, retirement or moving to a new city. In our online shop you can easily order lovingly designed farewell cards and express your words in style. From classic to funny: Discover the right farewell cards for colleagues, friends or family now and say goodbye with heart.",
        // Add more descriptions as needed
    };
    return map[slug] || "Explore our beautiful collection of greeting cards perfect for any occasion.";
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = formatTitle(slug);
  const description = getDescription(slug);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 pb-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="py-4 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-300">Start</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-zinc-300">{title}</span>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-[133px] z-40 bg-white dark:bg-black py-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
          <div className="flex items-center justify-between">
            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm font-medium transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              <span>Filter</span>
            </button>

            {/* Right Side: Sort & Count */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                <span>Sort by</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1L5 5L9 1" />
                </svg>
              </div>
              <span className="text-xs text-zinc-500">38 products</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product, index) => (
            <CollectionProductCard key={index} {...product} />
          ))}
          {/* Duplicate for demo to show more items */}
          {products.map((product, index) => (
            <CollectionProductCard key={`dup-${index}`} {...product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            disabled
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
            aria-label="Previous page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Page Numbers */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
            1
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
            2
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
            3
          </button>
          <span className="flex h-10 w-10 items-center justify-center text-zinc-400">...</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
            8
          </button>

          {/* Next Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            aria-label="Next page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
