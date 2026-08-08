import Image from "next/image"
import { cn } from "@/lib/utils"

export function SpaceCard({
  name,
  tagline,
  body,
  image,
  className,
  imageAlt,
}: {
  name: string
  tagline: string
  body?: string
  image: string
  imageAlt: string
  className?: string
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg bg-charcoal",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-champagne">
          {tagline}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-cream">{name}</h3>
        {body && (
          <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-cream/80">
            {body}
          </p>
        )}
      </div>
    </article>
  )
}
