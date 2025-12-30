import Link from "next/link";
import Image from "next/image";

interface ArticleProductCardProps {
  title: string;
  image: string;
  alt: string;
  href: string;
  date?: string;
  description?: string;
}

export default function ArticleProductCard({
  title,
  image,
  alt,
  href,
  date = "27. December 2025",
  description = "Discover everything about this wonderful card. Perfect for special occasions and memorable moments.",
}: ArticleProductCardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-3">
      {/* Image Container */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-100">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Date / Meta */}
        <p className="text-xs text-zinc-500">{date}</p>

        {/* Title */}
        <h3 className="font-bold text-zinc-900 text-lg leading-tight group-hover:underline">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
