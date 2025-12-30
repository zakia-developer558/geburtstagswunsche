import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleProductCard from "@/components/ArticleProductCard";

// Mock Data
const heroArticles = [
  {
    title: "The Art of Handwritten Notes in a Digital World",
    image: "/bird.jpg",
    category: "Inspiration",
    href: "/blog/handwritten-notes",
    date: "Dec 29, 2025",
    description: "Why taking the time to write a physical note matters more than ever in our fast-paced digital lives."
  },
  {
    title: "5 Creative Ways to Upcycle Old Greeting Cards",
    image: "/donkey.jpg",
    category: "DIY",
    href: "/blog/upcycle-cards",
    date: "Dec 28, 2025"
  },
  {
    title: "The Best Fonts for Your Wedding Invitations",
    image: "/nature.jpg",
    category: "Design",
    href: "/blog/wedding-fonts",
    date: "Dec 27, 2025"
  }
];

const latestArticles = [
  {
    title: "New Year, New Stationery: Trends to Watch",
    image: "/sunny-girl.jpg",
    alt: "Stationery trends",
    href: "/blog/stationery-trends",
    date: "Dec 26, 2025",
    description: "Discover the hottest colors, patterns, and paper types for the upcoming year."
  },
  {
    title: "How to Choose the Perfect Birthday Card",
    image: "/camera-man.jpg",
    alt: "Birthday card selection",
    href: "/blog/perfect-birthday-card",
    date: "Dec 25, 2025",
    description: "A guide to finding a card that matches the recipient's personality perfectly."
  },
  {
    title: "The History of Valentine's Day Cards",
    image: "/bird.jpg",
    alt: "Valentine's history",
    href: "/blog/valentines-history",
    date: "Dec 24, 2025",
    description: "From handmade tokens to mass-produced masterpieces, explore the evolution of love notes."
  },
  {
    title: "Sustainable Paper: What You Need to Know",
    image: "/donkey.jpg",
    alt: "Sustainable paper",
    href: "/blog/sustainable-paper",
    date: "Dec 23, 2025",
    description: "Understanding the environmental impact of your stationery choices."
  },
  {
    title: "Calligraphy 101: Getting Started",
    image: "/nature.jpg",
    alt: "Calligraphy",
    href: "/blog/calligraphy-101",
    date: "Dec 22, 2025",
    description: "Simple tips and tricks for beginners to start creating beautiful lettering."
  },
  {
    title: "Organizing Your Desk for Creativity",
    image: "/sunny-girl.jpg",
    alt: "Desk organization",
    href: "/blog/desk-organization",
    date: "Dec 21, 2025",
    description: "Create a workspace that inspires you to write and create every day."
  }
];

const trendingArticles = [
  {
    title: "Top 10 Funny Birthday Wishes",
    image: "/camera-man.jpg",
    category: "Humor",
    href: "/blog/funny-wishes",
    views: "2.5k reads"
  },
  {
    title: "Emotional Condolence Messages",
    image: "/nature.jpg",
    category: "Guides",
    href: "/blog/condolence-messages",
    views: "1.8k reads"
  },
  {
    title: "DIY: Pressed Flower Cards",
    image: "/bird.jpg",
    category: "Crafts",
    href: "/blog/pressed-flowers",
    views: "1.5k reads"
  },
  {
    title: "Interview with Artist Anna Bell",
    image: "/donkey.jpg",
    category: "Interviews",
    href: "/blog/anna-bell-interview",
    views: "1.2k reads"
  }
];

const inspirationArticles = [
  {
    title: "Spring Collection Preview",
    image: "/sunny-girl.jpg",
    href: "/blog/spring-collection",
    date: "Dec 20, 2025"
  },
  {
    title: "Minimalist Card Designs",
    image: "/bird.jpg",
    href: "/blog/minimalist-designs",
    date: "Dec 19, 2025"
  },
  {
    title: "Choosing the Right Pen",
    image: "/nature.jpg",
    href: "/blog/choosing-pens",
    date: "Dec 18, 2025"
  },
  {
    title: "Etiquette for Thank You Notes",
    image: "/camera-man.jpg",
    href: "/blog/thank-you-etiquette",
    date: "Dec 17, 2025"
  }
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">
      
      {/* SECTION 1: HERO / FEATURED (1 Large, 2 Small) */}
      <section>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-12">The Greeting Card Blog</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Hero Article */}
          <Link href={heroArticles[0].href} className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 block">
            <Image
              src={heroArticles[0].image}
              alt={heroArticles[0].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
              <span className="text-sm font-medium bg-purple-600 w-fit px-3 py-1 rounded-full mb-3">
                {heroArticles[0].category}
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-2 group-hover:underline decoration-white underline-offset-4">
                {heroArticles[0].title}
              </h2>
              <p className="text-zinc-200 line-clamp-2 md:text-lg">
                {heroArticles[0].description}
              </p>
            </div>
          </Link>

          {/* Side Hero Articles */}
          <div className="flex flex-col gap-8">
            {heroArticles.slice(1).map((article, idx) => (
              <Link key={idx} href={article.href} className="group flex gap-4 h-full">
                <div className="relative aspect-square w-1/3 overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center w-2/3">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-zinc-900 leading-tight mb-2 group-hover:underline">
                    {article.title}
                  </h3>
                  <span className="text-sm text-zinc-500">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: LATEST ARTICLES (Grid using ArticleProductCard) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-zinc-900">Latest Stories</h2>
          <Link href="#" className="text-sm font-medium text-zinc-600 hover:text-purple-600">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article, idx) => (
            <ArticleProductCard key={idx} {...article} />
          ))}
        </div>
      </section>

      {/* SECTION 3: TRENDING (Horizontal List Style) */}
      <section className="bg-zinc-50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-zinc-900 mb-10 text-center">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.map((article, idx) => (
              <Link key={idx} href={article.href} className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-zinc-100">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg mb-4 bg-zinc-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-zinc-900">
                    #{idx + 1}
                  </span>
                </div>
                <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="font-bold text-zinc-900 mt-1 mb-2 leading-tight group-hover:text-purple-700">
                  {article.title}
                </h3>
                <span className="text-xs text-zinc-400">{article.views}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INSPIRATION (Compact List / Sidebar Style) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-6">Daily Inspiration</h2>
          <div className="space-y-8">
            {inspirationArticles.map((article, idx) => (
              <Link key={idx} href={article.href} className="group flex items-center gap-6 border-b border-zinc-100 pb-8 last:border-0 last:pb-0">
                <div className="relative aspect-[4/3] w-32 sm:w-48 overflow-hidden rounded-lg bg-zinc-100 flex-shrink-0">
                   <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2 group-hover:underline decoration-zinc-300 underline-offset-4">
                    {article.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-3">
                    Looking for fresh ideas? Check out this curated collection of beautiful designs...
                  </p>
                  <span className="text-xs text-zinc-400 font-medium">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar / Newsletter or Categories */}
        <div className="space-y-8">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="font-serif font-bold text-xl text-purple-900 mb-2">Subscribe to our Newsletter</h3>
            <p className="text-purple-800/80 text-sm mb-4">Get the latest trends and offers directly in your inbox.</p>
            <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-lg border border-purple-200 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            <button className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Birthday', 'Wedding', 'DIY', 'Interviews', 'Sustainable', 'Typography', 'Quotes', 'History'].map(tag => (
                <Link key={tag} href="#" className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full hover:bg-zinc-200 transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
