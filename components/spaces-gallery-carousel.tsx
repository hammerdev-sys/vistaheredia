"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type GalleryImage = {
  src: string
  alt: string
}

export function SpacesGalleryCarousel({
  images,
}: {
  images: GalleryImage[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = scrollRef.current

    if (!el) return

    el.scrollBy({
      left: dir * el.clientWidth,
      behavior: "smooth",
    })
  }

  // 6 images per slide/page
  const pages: GalleryImage[][] = []

  for (let i = 0; i < images.length; i += 6) {
    pages.push(images.slice(i, i + 6))
  }

  return (
    <div className="relative w-full overflow-visible">

      {/* Gallery */}
      <div
        ref={scrollRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          scroll-smooth
          pb-2
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="
              grid
              w-full
              flex-none
              snap-start
              grid-cols-2
              gap-5
              md:grid-cols-3
            "
          >
            {page.map((img) => (
              <div
                key={img.src}
                className="
                  group
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-xl
                  bg-muted
                "
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Hover overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/20
                  "
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {pages.length > 1 && (
        <>
          {/* LEFT ARROW */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous images"
            className="
              absolute
              left-3
              top-1/2
              z-50
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-charcoal/50
              text-cream
              shadow-xl
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-105
              hover:bg-charcoal/70
              active:scale-95
              md:left-4
            "
          >
            <ChevronLeft
              className="h-6 w-6"
              strokeWidth={2}
            />
          </button>

          {/* RIGHT ARROW */}
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next images"
            className="
              absolute
              right-3
              top-1/2
              z-50
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-charcoal/50
              text-cream
              shadow-xl
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-105
              hover:bg-charcoal/70
              active:scale-95
              md:right-4
            "
          >
            <ChevronRight
              className="h-6 w-6"
              strokeWidth={2}
            />
          </button>
        </>
      )}
    </div>
  )
}