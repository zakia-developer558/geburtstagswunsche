"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const brandScript = Dancing_Script({ subsets: ["latin"], weight: "700" });

interface Category {
  name: string;
  href: string;
}

const PRODUCT_CATEGORIES = [
  { name: "Abschied", href: "/collection/abschied" },
  { name: "Geburtstag", href: "/collection/geburtstag" },
  { name: "Geburt", href: "/collection/geburt" },
  { name: "Glückwünsche", href: "/collection/glueckwuensche" },
  { name: "Hochzeit", href: "/collection/hochzeit" },
  { name: "Trauer", href: "/collection/trauer" },
  { name: "Weihnachten", href: "/collection/weihnachten" },
  { name: "Postkarten", href: "/collection/postkarten" },
  { name: "Anlässe", href: "/collection/anlaesse" },
  { name: "Blog", href: "/blog" },
];

const DEFAULT_BLOG_CATEGORIES = [
  { name: "Inspiration", href: "/blog/inspiration" },
  { name: "DIY", href: "/blog/diy" },
  { name: "Design", href: "/blog/design" },
  { name: "Humor", href: "/blog/humor" },
  { name: "Guides", href: "/blog/guides" },
  { name: "Crafts", href: "/blog/crafts" },
  { name: "Interviews", href: "/blog/interviews" },
  { name: "Shop", href: "/" },
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-3 py-1 text-sm text-zinc-700 hover:text-accent transition-colors dark:text-zinc-300 dark:hover:text-accent"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block w-full px-4 py-3 text-lg font-medium text-zinc-800 hover:bg-zinc-50 hover:text-accent transition-colors dark:text-zinc-200 dark:hover:bg-zinc-800"
  >
    {children}
  </Link>
);

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogCategories, setBlogCategories] = useState<Category[]>(DEFAULT_BLOG_CATEGORIES);
  const { cartItems, toggleCart } = useCart();
  const { favorites } = useFavorites();
  
  const isBlogSection = pathname?.startsWith("/blog");

  useEffect(() => {
    const fetchBlogCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          console.warn("API URL not found");
          return;
        }

        const response = await fetch(`${apiUrl}/api/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const data = await response.json();
        const categoriesData = data.data || [];
        
        const mappedCategories = categoriesData.map((cat: any) => ({
          name: cat.name,
          href: `/blog/${cat.slug || cat.id}`
        }));
        
        // Add "Shop" link at the end
        setBlogCategories([...mappedCategories, { name: "Shop", href: "/" }]);
      } catch (error) {
        console.error("Error fetching blog categories:", error);
        // Fallback is already set to DEFAULT_BLOG_CATEGORIES
      }
    };

    if (isBlogSection) {
      console.log("Fetching blog categories...");
      fetchBlogCategories();
    }
  }, [isBlogSection]);

  const categories = isBlogSection ? blogCategories : PRODUCT_CATEGORIES;

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favorites ? favorites.length : 0;

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      // Logic for logged in user (e.g., go to profile)
      console.log("User is logged in");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200 dark:bg-black/60 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Header Row (Brand + Actions + Mobile Toggle) */}
        <div className="flex h-20 items-center justify-between">
          
          {/* Mobile Menu Button (Left) */}
          <button
            className="md:hidden p-2 -ml-2 text-zinc-700 hover:text-accent transition-colors dark:text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Brand (Center on mobile, Left on desktop) */}
          <Link href="/" className="flex items-center gap-1 py-2">
            <span className={`${brandScript.className} text-3xl sm:text-4xl md:text-5xl font-bold leading-none text-accent`}>geburtstagswnsche-e3b</span>
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-accent align-middle sm:w-[22px] sm:h-[22px]">
              <path d="M12 20s-7-4.5-9-8.5C1 8 3.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.5 2.5 3.9 6-2 4-9.4 8.5-9.4 8.5z" fill="currentColor" />
            </svg>
            <span className={`${brandScript.className} text-3xl sm:text-4xl md:text-5xl font-bold leading-none text-accent`}>art</span>
          </Link>

          {/* Desktop Nav (Center - Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 absolute left-1/2 -translate-x-1/2">
             {/* We need to move the nav links here or keep them in a separate row if we want the original design. 
                 The original design had top row categories, bottom row brand. 
                 Let's try to merge them for a better standard header, or keep the top row for desktop only.
                 
                 Refined plan: Keep the original 2-row layout for desktop, but hide the top row on mobile 
                 and show the hamburger in the bottom row (which becomes the only row on mobile).
             */}
          </nav>

          {/* Actions (Right) */}
          <div className="flex items-center gap-2 sm:gap-4 text-zinc-700 dark:text-zinc-300">
            {/* Search */}
            <button 
              aria-label="Search" 
              className="p-2 hover:text-accent transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Account (Hidden on very small screens if needed, but kept for now) */}
            <div className="relative">
              <button 
                aria-label="Account" 
                className="hidden sm:block p-2 hover:text-accent transition-colors"
                onClick={handleAccountClick}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Login Dropdown */}
              {isLoginOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLoginOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2">
                      <Link 
                        href="/sign-in" 
                        onClick={() => setIsLoginOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Wishlist */}
            <button aria-label="Wishlist" className="hidden sm:block relative p-2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20s-7-4.5-9-8.5C1 8 3.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.5 2.5 3.9 6-2 4-9.4 8.5-9.4 8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {favoritesCount}
                </span>
              )}
            </button>
            {/* Cart */}
            <button aria-label="Cart" onClick={toggleCart} className="relative p-2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="9" cy="20" r="1.3" fill="currentColor" />
                <circle cx="18" cy="20" r="1.3" fill="currentColor" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Row (Hidden on Mobile) */}
        <div className="hidden md:flex h-12 items-center justify-center border-t border-zinc-100 dark:border-zinc-800">
          <nav className="flex items-center gap-4">
            {categories.map((category) => (
              <NavLink key={category.href} href={category.href}>
                {category.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black absolute w-full left-0 shadow-lg h-screen overflow-y-auto pb-20">
          <nav className="flex flex-col py-4">
            {categories.map((category) => (
              <MobileNavLink
                key={category.href}
                href={category.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </MobileNavLink>
            ))}
            {!isBlogSection && (
              <>
                <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
                <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Ratgeber</MobileNavLink>
              </>
            )}
            <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Account</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</MobileNavLink>
          </nav>
        </div>
      )}

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-4 shadow-lg z-40 dark:bg-zinc-900 dark:border-zinc-800">
          <form className="max-w-3xl mx-auto relative flex items-center">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-4 pr-10 py-2 rounded-full border border-zinc-300 focus:outline-none focus:border-accent dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
              autoFocus
            />
            <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </form>
        </div>
      )}

      {/* Login Modal (Deprecated - Replaced by Dropdown) */}
      {/* Removed old modal code to clean up */}
    </header>
  );
}
