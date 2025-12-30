"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { useCart } from "@/context/CartContext";

const brandScript = Dancing_Script({ subsets: ["latin"], weight: "700" });

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
            <button aria-label="Search" className="p-2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Account (Hidden on very small screens if needed, but kept for now) */}
            <button aria-label="Account" className="hidden sm:block p-2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Wishlist */}
            <button aria-label="Wishlist" className="hidden sm:block p-2 hover:text-accent transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20s-7-4.5-9-8.5C1 8 3.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.5 2.5 3.9 6-2 4-9.4 8.5-9.4 8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
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
            <NavLink href="/collection/abschied">Abschied</NavLink>
            <NavLink href="/collection/geburtstag">Geburtstag</NavLink>
            <NavLink href="/collection/geburt">Geburt</NavLink>
            <NavLink href="/collection/glueckwuensche">Glückwünsche</NavLink>
            <NavLink href="/collection/hochzeit">Hochzeit</NavLink>
            <NavLink href="/collection/trauer">Trauer</NavLink>
            <NavLink href="/collection/weihnachten">Weihnachten</NavLink>
            <NavLink href="/collection/postkarten">Postkarten</NavLink>
            <NavLink href="/collection/anlaesse">Anlässe</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black absolute w-full left-0 shadow-lg h-screen overflow-y-auto pb-20">
          <nav className="flex flex-col py-4">
            <MobileNavLink href="/collection/abschied" onClick={() => setIsMobileMenuOpen(false)}>Abschied</MobileNavLink>
            <MobileNavLink href="/collection/geburtstag" onClick={() => setIsMobileMenuOpen(false)}>Geburtstag</MobileNavLink>
            <MobileNavLink href="/collection/geburt" onClick={() => setIsMobileMenuOpen(false)}>Geburt</MobileNavLink>
            <MobileNavLink href="/collection/glueckwuensche" onClick={() => setIsMobileMenuOpen(false)}>Glückwünsche</MobileNavLink>
            <MobileNavLink href="/collection/hochzeit" onClick={() => setIsMobileMenuOpen(false)}>Hochzeit</MobileNavLink>
            <MobileNavLink href="/collection/trauer" onClick={() => setIsMobileMenuOpen(false)}>Trauer</MobileNavLink>
            <MobileNavLink href="/collection/weihnachten" onClick={() => setIsMobileMenuOpen(false)}>Weihnachten</MobileNavLink>
            <MobileNavLink href="/collection/postkarten" onClick={() => setIsMobileMenuOpen(false)}>Postkarten</MobileNavLink>
            <MobileNavLink href="/collection/anlaesse" onClick={() => setIsMobileMenuOpen(false)}>Anlässe</MobileNavLink>
            <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Ratgeber</MobileNavLink>
            <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Account</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
}