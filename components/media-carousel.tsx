"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import type { MediaItem } from "@/lib/content/types"
import { cn } from "@/lib/utils"

export function MediaCarousel({
  items,
  locale,
  labels,
  aspect = "aspect-[4/3]",
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  items: MediaItem[]
  locale: Locale
  labels: { prev: string; next: string }
  aspect?: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const [index, setIndex] = useState(0)
  const count = items.length

  const go = useCallback(
    (next: number) => setIndex((prev) => (next + count) % count),
    [count],
  )

  useEffect(() => {
    if (count <= 1) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1)
      if (e.key === "ArrowRight") go(index + 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, go, count])

  if (count === 0) return null

  return (
    <div
      className={cn("group relative overflow-hidden rounded-lg bg-charcoal", aspect, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.next}
    >
      {items.map((item, i) => {
        const active = i === index
        return (
          <div
            key={item.src + i}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!active}
          >
            {item.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
              >
                <source src={item.src} />
              </video>
            ) : (
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt[locale] ?? item.alt.en}
                fill
                sizes={sizes}
                priority={priority && i === 0}
                className="object-cover"
              />
            )}
          </div>
        )
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={labels.prev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/50 text-cream backdrop-blur-sm transition-all hover:bg-charcoal/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/50 text-cream backdrop-blur-sm transition-all hover:bg-charcoal/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-cream" : "w-2 bg-cream/50 hover:bg-cream/80",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
