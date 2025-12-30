import React from "react";
import Link from "next/link";

interface ArticleLink {
  title: string;
  href: string;
}

interface ArticleNavigationProps {
  prev?: ArticleLink;
  next?: ArticleLink;
}

export default function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  return (
    <nav className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Previous Article */}
      <div className="flex flex-col items-start text-left">
        {prev ? (
          <Link 
            href={prev.href}
            className="group flex flex-col gap-2 w-full"
          >
            <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider group-hover:text-purple-600 transition-colors flex items-center gap-1">
              <span className="text-lg">←</span> Previous Article
            </span>
            <span className="text-lg font-serif font-bold text-zinc-900 group-hover:underline decoration-zinc-300 underline-offset-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" /> /* Spacer for alignment if no prev */
        )}
      </div>

      {/* Next Article */}
      <div className="flex flex-col items-end text-right">
        {next ? (
          <Link 
            href={next.href}
            className="group flex flex-col gap-2 w-full items-end"
          >
            <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider group-hover:text-purple-600 transition-colors flex items-center gap-1">
              Next Article <span className="text-lg">→</span>
            </span>
            <span className="text-lg font-serif font-bold text-zinc-900 group-hover:underline decoration-zinc-300 underline-offset-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" /> /* Spacer for alignment if no next */
        )}
      </div>
    </nav>
  );
}
