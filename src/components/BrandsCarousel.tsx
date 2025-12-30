"use client";
import { useRef, type ComponentType } from "react";

type LogoProps = { className?: string };

const GDLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 120 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="24" fill="#e11d48" />
    <path d="M70 6a24 24 0 1 1 0 48" fill="#2563eb" />
    <text x="12" y="38" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700" fill="#fff">G</text>
    <text x="74" y="38" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700" fill="#fff">D</text>
  </svg>
);

const GutschVerlagLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <text x="12" y="38" fontFamily="Arial Black, Arial" fontSize="26" fontWeight="900" letterSpacing="1" fill="#ef4444">GUTSCH</text>
    <circle cx="120" cy="22" r="8" fill="#ef4444" />
    <path d="M120 22l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <text x="136" y="38" fontFamily="Arial Black, Arial" fontSize="26" fontWeight="900" letterSpacing="1" fill="#ef4444">VERLAG</text>
  </svg>
);

const CityProductsLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 160 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="22" fill="#86efac" stroke="#34d399" strokeWidth="4" />
    <path d="M30 18l6 24h-12z" fill="#34d399" />
    <text x="62" y="38" fontFamily="Arial Black, Arial" fontSize="22" fontWeight="800" fill="#34d399">cityproducts</text>
  </svg>
);

const TushitaLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="30" r="8" fill="#ef4444" />
    <rect x="34" y="14" width="120" height="32" rx="4" fill="#111827" />
    <text x="44" y="38" fontFamily="Arial Black, Arial" fontSize="24" fontWeight="900" fill="#ffffff">TUSHITA</text>
    <text x="34" y="54" fontFamily="Georgia, serif" fontSize="12" fill="#6b7280">... and the art of joy</text>
  </svg>
);

type BrandItem = {
  name: string;
  Logo: ComponentType<LogoProps>;
};

const brands: BrandItem[] = [
  { name: "Verlag Dominique", Logo: GDLogo },
  { name: "Gutsch Verlag", Logo: GutschVerlagLogo },
  { name: "cityproducts", Logo: CityProductsLogo },
  { name: "TUSHITA", Logo: TushitaLogo },
];

export default function BrandsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const amount = card ? card.offsetWidth + 16 /* gap */ : el.clientWidth / 2;
    el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Marken</h3>
        <div className="hidden sm:flex gap-2">
          <button
            aria-label="Previous"
            onClick={() => scrollByCards("prev")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-black dark:text-zinc-200 dark:border-zinc-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByCards("next")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-black dark:text-zinc-200 dark:border-zinc-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* gradient edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent" />

        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
          {brands.map((b) => (
            <div key={b.name} data-card className="snap-center shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[24%]">
              <div className="flex h-28 w-full items-center justify-center border border-zinc-200 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
                <b.Logo className="h-16 w-auto" />
              </div>
              <p className="mt-3 text-center text-sm text-zinc-700 dark:text-zinc-300">{b.name}</p>
            </div>
          ))}
        </div>

        {/* desktop arrows overlay */}
        <div className="hidden sm:block">
          <button
            aria-label="Previous"
            onClick={() => scrollByCards("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByCards("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}