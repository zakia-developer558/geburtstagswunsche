"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArticleNavigation from "@/components/ArticleNavigation";

// Types based on API response
interface APIPost {
  _id: string;
  postId: string;
  slug: string;
  blogContent: {
    title: string;
    content: string;
    htmlContent: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    wordCount: number;
  };
  firebaseImages: {
    url: string;
    alt: string;
    width: number;
    height: number;
    source: string;
    position: number;
    originalUrl: string;
    watermarkRemoved: boolean;
  }[];
  youtubeVideos: any[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogEntryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<APIPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // 1. Fetch specific post by slug
        const postRes = await fetch(`${baseUrl}/api/posts?slug=${slug}`);
        const postJson = await postRes.json();

        if (postJson.success && postJson.post) {
          setPost(postJson.post);
        }

        // 2. Fetch related posts (random 2)
        const allPostsRes = await fetch(`${baseUrl}/api/posts`);
        const allPostsJson = await allPostsRes.json();

        if (allPostsJson.success && Array.isArray(allPostsJson.posts)) {
          const others = allPostsJson.posts.filter((p: APIPost) => p.slug !== slug);
          const shuffled = [...others].sort(() => 0.5 - Math.random());
          setRelatedPosts(shuffled.slice(0, 2));
        }

      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found.</div>;
  }

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Normalize image URL (convert protocol-relative URLs to https)
  const normalizeImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith('//')) return `https:${url}`;
    return url;
  };

  // Get main image
  const mainImage = post.firebaseImages?.[0];

  // Extract headings from HTML content for table of contents
  const extractHeadings = (html: string) => {
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ level, text, id });
    }

    return headings;
  };

  // Add IDs to headings in HTML content
  const addIdsToHeadings = (html: string) => {
    return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
      const text = content.replace(/<[^>]*>/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    });
  };

  const headings = extractHeadings(post.blogContent.htmlContent);
  const contentWithIds = addIdsToHeadings(post.blogContent.htmlContent);

  // Prepare navigation
  const prevArticle = relatedPosts[0] ? {
    title: relatedPosts[0].blogContent.title,
    href: `/blog/${relatedPosts[0].slug}`
  } : undefined;

  const nextArticle = relatedPosts[1] ? {
    title: relatedPosts[1].blogContent.title,
    href: `/blog/${relatedPosts[1].slug}`
  } : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">Start</Link>
        <span className="mx-2">›</span>
        <Link href="/blog" className="hover:text-zinc-900">Blog</Link>
        <span className="mx-2">›</span>
        <span className="text-zinc-900 truncate max-w-[200px]">{post.blogContent.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
        {/* Sidebar: Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden lg:block h-fit sticky top-8">
            <div className="bg-zinc-50 rounded-lg p-6 border border-zinc-100">
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-4">Table of Contents</h3>
              <ul className="space-y-3 text-sm">
                {headings.map((heading, index) => (
                  <li key={index} className={heading.level === 3 ? 'ml-4' : ''}>
                    <a
                      href={`#${heading.id}`}
                      className="text-zinc-600 hover:text-zinc-900 hover:underline decoration-zinc-400 underline-offset-4 transition-colors"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <article className="max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{post.blogContent.wordCount} words</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight mb-8">
              {post.blogContent.title}
            </h1>

            {mainImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 mb-8">
                <Image
                  src={normalizeImageUrl(mainImage.url)}
                  alt={mainImage.alt || post.blogContent.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Body - HTML Content with embedded images */}
          <div className="space-y-8">
            {(() => {
              // Sort images by position (excluding the main image which is position 0)
              const contentImages = post.firebaseImages
                .filter(img => img.position > 0)
                .sort((a, b) => a.position - b.position);

              // Split HTML content by paragraphs to insert images
              const paragraphs = contentWithIds.split(/(<\/p>)/gi);
              const elements: React.ReactElement[] = [];
              let imageIndex = 0;

              // Calculate how to distribute images throughout content
              const totalParagraphs = Math.floor(paragraphs.length / 2); // Each paragraph is split into 2 parts
              const imageInterval = contentImages.length > 0
                ? Math.floor(totalParagraphs / (contentImages.length + 1))
                : 0;

              for (let i = 0; i < paragraphs.length; i += 2) {
                const paragraphContent = paragraphs[i] + (paragraphs[i + 1] || '');
                const paragraphNumber = Math.floor(i / 2);

                // Add paragraph
                if (paragraphContent.trim()) {
                  elements.push(
                    <div
                      key={`content-${i}`}
                      className="prose prose-lg prose-zinc max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-zinc-900
                        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:scroll-mt-24
                        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:scroll-mt-24
                        prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:mb-6
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                        prose-li:text-zinc-700 prose-li:mb-2
                        prose-strong:text-zinc-900 prose-strong:font-semibold
                        prose-a:text-purple-600 prose-a:underline prose-a:decoration-purple-300
                        hover:prose-a:text-purple-700
                        prose-blockquote:border-l-4 prose-blockquote:border-purple-300 
                        prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 
                        prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-zinc-800 
                        prose-blockquote:bg-purple-50/50 prose-blockquote:rounded-r-lg"
                      dangerouslySetInnerHTML={{ __html: paragraphContent }}
                    />
                  );
                }

                // Insert image at intervals
                if (
                  imageIndex < contentImages.length &&
                  imageInterval > 0 &&
                  paragraphNumber > 0 &&
                  paragraphNumber % imageInterval === 0
                ) {
                  const img = contentImages[imageIndex];
                  elements.push(
                    <figure key={`image-${imageIndex}`} className="my-8">
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-100">
                        <Image
                          src={normalizeImageUrl(img.url)}
                          alt={img.alt || `Image ${imageIndex + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {img.alt && (
                        <figcaption className="text-center text-sm text-zinc-500 mt-2">
                          {img.alt}
                        </figcaption>
                      )}
                    </figure>
                  );
                  imageIndex++;
                }
              }

              // Add any remaining images at the end
              while (imageIndex < contentImages.length) {
                const img = contentImages[imageIndex];
                elements.push(
                  <figure key={`image-remaining-${imageIndex}`} className="my-8">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-100">
                      <Image
                        src={normalizeImageUrl(img.url)}
                        alt={img.alt || `Image ${imageIndex + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {img.alt && (
                      <figcaption className="text-center text-sm text-zinc-500 mt-2">
                        {img.alt}
                      </figcaption>
                    )}
                  </figure>
                );
                imageIndex++;
              }

              return elements;
            })()}
          </div>

          {/* YouTube Videos */}
          {post.youtubeVideos && post.youtubeVideos.length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-4">Related Videos</h2>
              {post.youtubeVideos.map((video: any, index: number) => (
                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100">
                  <iframe
                    src={video.url || video.embedUrl}
                    title={video.title || `Video ${index + 1}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer / Tags */}
          {post.blogContent.keywords && post.blogContent.keywords.length > 0 && (
            <footer className="mt-16 pt-8 border-t border-zinc-200">
              <div className="flex flex-wrap gap-2">
                {post.blogContent.keywords.map((keyword, index) => (
                  <span key={index} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-sm">
                    #{keyword}
                  </span>
                ))}
              </div>
            </footer>
          )}

          {/* Next/Prev Navigation */}
          <ArticleNavigation prev={prevArticle} next={nextArticle} />
        </article>
      </div>
    </div>
  );
}
