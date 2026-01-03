"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleProductCard from "@/components/ArticleProductCard";

// Types
interface RawBlogPost {
  _id: string;
  postId: string;
  slug: string;
  categoryId?: string;
  language?: string;
  status?: string;
  blogContent: {
    title: string;
    content: string;
    htmlContent?: string;
    metaTitle?: string;
    metaDescription?: string;
    wordCount?: number;
  };
  firebaseImages: Array<{
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  categorySlug?: string;
  createdAt: string;
  author?: {
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface PostsResponse {
  success: boolean;
  posts: RawBlogPost[];
}

interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export default function BlogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroPosts, setHeroPosts] = useState<BlogPost[]>([]);
  const [cat2Posts, setCat2Posts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination for "All Posts"
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Helper to map raw posts to UI posts
  const mapPosts = (rawPosts: RawBlogPost[]): BlogPost[] => {
    return rawPosts.map((raw) => ({
      _id: raw._id,
      title: raw.blogContent?.title || "Untitled Post",
      slug: raw.slug,
      excerpt: raw.blogContent?.metaDescription || raw.blogContent?.content?.substring(0, 100) || "No description available.",
      content: raw.blogContent?.content || "",
      coverImage: raw.firebaseImages?.[0]?.url || "/bird.jpg",
      categorySlug: raw.categoryId || "Blog",
      createdAt: raw.createdAt,
      author: { name: "Team" },
    }));
  };

  useEffect(() => {
    async function initData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setError("API URL not configured");
          setLoading(false);
          return;
        }

        console.log("BlogPage: Fetching initial data...");

        // 1. Fetch Categories
        const catRes = await fetch(`${apiUrl}/api/categories`);
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const catData: CategoriesResponse = await catRes.json();
        const cats = catData.data || [];
        setCategories(cats);

        // Prepare fetch promises
        const promises = [];

        // 2. Fetch Hero Posts (Category 1)
        if (cats.length > 0) {
          promises.push(
            fetch(`${apiUrl}/api/posts?categorySlug=${cats[0].slug}&page=1&limit=3`)
              .then(res => res.json())
              .then((data: PostsResponse) => setHeroPosts(mapPosts(data.posts || [])))
              .catch(err => console.error("Error fetching hero posts:", err))
          );
        }

        // 3. Fetch Category 2 Posts
        if (cats.length > 1) {
          promises.push(
            fetch(`${apiUrl}/api/posts?categorySlug=${cats[1].slug}&page=1&limit=3`)
              .then(res => res.json())
              .then((data: PostsResponse) => setCat2Posts(mapPosts(data.posts || [])))
              .catch(err => console.error("Error fetching cat2 posts:", err))
          );
        }

        // 4. Fetch All Posts (Page 1)
        promises.push(
          fetch(`${apiUrl}/api/posts?page=1&limit=9`)
            .then(res => res.json())
            .then((data: PostsResponse) => {
              const mapped = mapPosts(data.posts || []);
              setAllPosts(mapped);
              if (mapped.length < 9) setHasMore(false);
            })
            .catch(err => console.error("Error fetching all posts:", err))
        );

        await Promise.all(promises);

      } catch (err: any) {
        console.error("Error initializing blog page:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    initData();
  }, []);

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const nextPage = page + 1;
      const res = await fetch(`${apiUrl}/api/posts?page=${nextPage}&limit=9`);
      const data: PostsResponse = await res.json();
      const newPosts = mapPosts(data.posts || []);

      if (newPosts.length > 0) {
        setAllPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        if (newPosts.length < 9) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Prepare Hero Data
  const mainHeroPost = heroPosts[0];
  const heroArticle = mainHeroPost ? {
    title: mainHeroPost.title,
    image: mainHeroPost.coverImage || "/bird.jpg",
    category: categories[0]?.name || "Featured",
    href: `/blog/${mainHeroPost.slug}`,
    date: formatDate(mainHeroPost.createdAt),
    description: mainHeroPost.excerpt || "Read our latest article...",
  } : null;

  const sideHeroPosts = heroPosts.slice(1, 3).map(post => ({
    title: post.title,
    image: post.coverImage || "/nature.jpg",
    category: categories[0]?.name || "Featured",
    href: `/blog/${post.slug}`,
    date: formatDate(post.createdAt),
  }));

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center">
        <p className="text-zinc-500 text-lg">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-20">
      
      {/* SECTION 1: HERO (Category 1) */}
      <section>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-12">Blogs</h1>
        
        {heroArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Hero Article */}
            <Link href={heroArticle.href} className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 block">
              <Image
                src={heroArticle.image}
                alt={heroArticle.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-sm font-medium bg-purple-600 w-fit px-3 py-1 rounded-full mb-3 uppercase">
                  {heroArticle.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-2 group-hover:underline decoration-white underline-offset-4">
                  {heroArticle.title}
                </h2>
                <p className="text-zinc-200 line-clamp-2 md:text-lg">
                  {heroArticle.description}
                </p>
              </div>
            </Link>

            {/* Side Hero Articles */}
            {sideHeroPosts.length > 0 && (
              <div className="flex flex-col gap-8">
                {sideHeroPosts.map((article, idx) => (
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
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
             <p className="text-zinc-500">No featured posts found.</p>
          </div>
        )}
      </section>

      {/* SECTION 2: Category 2 Posts */}
      {categories.length > 1 && cat2Posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-zinc-900">{categories[1].name}</h2>
            <Link href={`/blog/${categories[1].slug}`} className="text-sm font-medium text-zinc-600 hover:text-purple-600">
              View all {categories[1].name} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat2Posts.map((post, idx) => (
               <ArticleProductCard 
                 key={idx}
                 title={post.title}
                 image={post.coverImage || "/camera-man.jpg"}
                 alt={post.title}
                 href={`/blog/${post.slug}`}
                 date={formatDate(post.createdAt)}
                 description={post.excerpt}
               />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: ALL POSTS with Load More */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-zinc-900">All Stories</h2>
        </div>
        
        {allPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {allPosts.map((post, idx) => (
                <ArticleProductCard 
                  key={idx}
                  title={post.title}
                  image={post.coverImage || "/camera-man.jpg"}
                  alt={post.title}
                  href={`/blog/${post.slug}`}
                  date={formatDate(post.createdAt)}
                  description={post.excerpt}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center">
                <button 
                  onClick={loadMorePosts}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-white border border-zinc-300 text-zinc-900 font-medium rounded-full hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "Loading..." : "Load More Articles"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No articles found.</p>
          </div>
        )}
      </section>

      {/* Ad Banner Section */}
      <section className="w-full max-w-5xl mx-auto mt-20 mb-12">
        <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[250px] text-center">
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-widest mb-4">Advertisement</span>
          <div className="w-full max-w-[728px] h-[90px] bg-zinc-200 rounded flex items-center justify-center">
            <span className="text-zinc-500 font-medium">Ad Banner Space (728x90)</span>
          </div>
        </div>
      </section>

    </div>
  );
}
