import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleNavigation from "@/components/ArticleNavigation";

// Dummy data for the blog post
const articleData = {
  title: "The Art of Giving: Why Greeting Cards Still Matter in the Digital Age",
  date: "28. December 2025",
  author: "Sarah Meyer",
  image: "/bird.jpg",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: "In an era where text messages and emails can be sent in milliseconds, the physical greeting card remains a powerful symbol of thoughtfulness. It's not just about the paper or the ink; it's about the time taken to select, write, and send a tangible message of care.",
    },
    {
      id: "emotional-impact",
      title: "The Emotional Impact",
      content: "Studies have shown that receiving a physical card triggers a stronger emotional response than a digital message. The tactile experience of opening an envelope and holding a card creates a lasting memory.",
      quote: "A greeting card is a hug with a fold in the middle.",
    },
    {
      id: "design-trends",
      title: "Current Design Trends",
      content: "From minimalist typography to lush botanical illustrations, greeting card designs are evolving. Foil accents, sustainable paper, and hand-lettered fonts are particularly popular this year.",
      image: "/nature.jpg",
      imageAlt: "Botanical card designs",
    },
    {
      id: "sustainability",
      title: "Sustainability in Stationery",
      content: "Eco-friendly options are becoming the norm. Recycled paper, vegetable-based inks, and plastic-free packaging are essential for the modern consumer who wants to give without harming the planet.",
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: "While digital communication is convenient, it lacks the personal touch of a handwritten card. So next time you want to make someone smile, reach for a pen and paper.",
    },
  ],
  prevArticle: {
    title: "10 Creative Ways to Display Your Greeting Cards",
    href: "/blog/creative-display-ideas",
  },
  nextArticle: {
    title: "The History of Birthday Cards: A Journey Through Time",
    href: "/blog/history-of-birthday-cards",
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch data based on params.slug
  // const post = await getPost(params.slug);
  
  // For demo, we just use the static articleData
  const post = articleData;

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">Start</Link>
        <span className="mx-2">›</span>
        <Link href="/blog" className="hover:text-zinc-900">Blog</Link>
        <span className="mx-2">›</span>
        <span className="text-zinc-900 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
        {/* Sidebar: Table of Contents */}
        <aside className="hidden lg:block h-fit sticky top-8">
          <div className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
            <h3 className="font-serif text-lg font-bold text-zinc-900 mb-4">Table of Contents</h3>
            <ul className="space-y-3 text-sm">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    className="text-zinc-600 hover:text-zinc-900 hover:underline decoration-zinc-400 underline-offset-4 transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <article className="max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>by {post.author}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          {/* Body */}
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-4">
                  {section.title}
                </h2>
                
                <p className="text-lg text-zinc-700 leading-relaxed mb-6">
                  {section.content}
                </p>

                {/* Optional Quote */}
                {section.quote && (
                  <blockquote className="border-l-4 border-purple-300 pl-6 py-2 my-8 italic text-xl text-zinc-800 bg-purple-50/50 rounded-r-lg">
                    "{section.quote}"
                  </blockquote>
                )}

                {/* Optional Image */}
                {section.image && (
                  <figure className="my-8">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-100">
                      <Image
                        src={section.image}
                        alt={section.imageAlt || section.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {section.imageAlt && (
                      <figcaption className="text-center text-sm text-zinc-500 mt-2">
                        {section.imageAlt}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}
          </div>

          {/* Footer / Tags / Share (Optional placeholder) */}
          <footer className="mt-16 pt-8 border-t border-zinc-200">
             <div className="flex flex-wrap gap-2">
               <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-sm">#GreetingCards</span>
               <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-sm">#Design</span>
               <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-sm">#Sustainability</span>
             </div>
          </footer>

          {/* Next/Prev Navigation */}
          <ArticleNavigation prev={post.prevArticle} next={post.nextArticle} />
        </article>
      </div>
    </div>
  );
}
