import React from "react";
import Image from "next/image";
import Link from "next/link";

function Tile({
  title,
  image,
  alt,
  className = "",
}: {
  title: string;
  image: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image src={image} alt={alt} fill className="object-cover" />
      <div className="absolute bottom-3 left-3">
        <Link
          href="#"
          className="inline-flex items-center bg-black/70 text-white px-3 py-2 text-xs font-medium"
        >
          {title}
          <svg
            className="ml-2"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function OccasionsSection() {
  return (
    <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: large tile */}
      <Tile
        title="Wedding Cards"
        image="/girl.jpg"
        alt="Wedding card with two champagne glasses"
        className="lg:col-span-7 aspect-[4/3]"
      />

      {/* Right group: 2 tiles top, 1 tile bottom spanning two columns */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        <Tile
          title="Birth cards"
          image="/boy3.jpeg"
          alt="Birth card illustrated with baby motif"
          className="aspect-[4/3]"
        />
        <Tile
          title="Sympathy Cards"
          image="/nature.jpg"
          alt="Sympathy card on soft nature background"
          className="aspect-[4/3]"
        />
        <Tile
          title="Greeting cards"
          image="/camera-man.jpg"
          alt="Assorted greeting cards with framed designs"
          className="col-span-2 aspect-[16/9]"
        />
      </div>
    </section>
  );
}
