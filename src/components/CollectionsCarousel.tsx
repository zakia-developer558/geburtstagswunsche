"use client";
import Image from "next/image";
import { useRef } from "react";

type Collection = {
  title: string;
  image: string;
  alt: string;
};

const collections: Collection[] = [
  {
    title: "Gutsch Verlag Merry Christmas",
    image: "/chrust.jpeg",
    alt: "Festive Christmas card selection on a decorated background",
  },
  {
    title: "Gutsch Verlag Viva Natura",
    image: "/nature.jpg",
    alt: "Nature-inspired greeting cards arranged on a soft background",
  },
  {
    title: "Gutsch Verlag Paloma",
    image: "/camera-man.jpg",
    alt: "Vintage-look cards with camera and books on desk",
  },
];

export default function CollectionsCarousel() {
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
        <h3 className="text-xl font-semibold">Kollektionen</h3>
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

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        >
          {collections.map((c, i) => (
            <div
              key={c.title}
              data-card
              className="snap-center shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[32%]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image src={c.image} alt={c.alt} fill className="object-cover" />
                {/* Edge arrows for small screens */}
                <div className="sm:hidden absolute inset-y-0 left-0 flex items-center">
                  <button
                    aria-label="Previous"
                    onClick={() => scrollByCards("prev")}
                    className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="sm:hidden absolute inset-y-0 right-0 flex items-center">
                  <button
                    aria-label="Next"
                    onClick={() => scrollByCards("next")}
                    className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-zinc-700 dark:text-zinc-300">{c.title}</p>
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