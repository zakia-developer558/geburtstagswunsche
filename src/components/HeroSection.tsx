import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-12 items-stretch">
      {/* Left: Large seasonal banner using your image */}
      <div className="relative lg:col-span-7 overflow-hidden">
        <Image
          src="/trees.jpg"
          alt="Seasonal greeting cards background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-8 sm:p-10 lg:p-12">
          <span className="inline-flex items-center bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-sm">Christmas cards</span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-accent">Weihnachtskarten</span>
            <span className="block text-foreground">– jetzt entdecken!</span>
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-zinc-100 drop-shadow">
            Die schönste Auswahl für ein frohes Fest.
          </p>
        </div>
      </div>

      {/* Right: Collage with overlay copy using your images */}
      <div className="relative lg:col-span-5 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-2">
          {/* 9 tiles */}
          <div className="relative h-24 overflow-hidden"><Image src="/bird.jpg" alt="Card collage 1" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/donkey.jpg" alt="Card collage 2" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/monkey.jpeg" alt="Card collage 3" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/girl.jpg" alt="Card collage 4" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/boy3.jpeg" alt="Card collage 5" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/camera-man.jpg" alt="Card collage 6" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/man2.jpeg" alt="Card collage 7" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/nature.jpg" alt="Card collage 8" fill className="object-cover" /></div>
          <div className="relative h-24 overflow-hidden"><Image src="/sunny-girl.jpg" alt="Card collage 9" fill className="object-cover" /></div>
        </div>
        {/* Overlay copy */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute left-0 top-0 m-4 sm:m-6 lg:m-8 max-w-md bg-black/60 p-4 sm:p-6 text-white">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Greeting Cards Online Shop — Cards for Every Occasion
          </h2>
          <p className="mt-2 text-sm leading-6 opacity-90">
            Welcome to your greeting card online shop! With us you will find a huge selection of lovingly designed postcards and greeting cards for every conceivable occasion. Whether for a birthday, wedding, birth, or just because — you are guaranteed to find what you are looking for here. Browse through our diverse categories and discover cards that bring joy.
          </p>
        </div>
      </div>
    </section>
  );
}