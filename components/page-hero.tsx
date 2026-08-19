import Image from "next/image"
import { Container, Kicker } from "@/components/section"

export function PageHero({
  kicker,
  title,
  intro,
  image,
  imageAlt,
}: {
  kicker: string
  title: string
  intro?: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="relative flex min-h-[680px] items-center justify-center overflow-hidden md:min-h-[760px]">

      {/* Background Image */}
      <Image
        src={image || "/placeholder.svg"}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Bottom Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/60" />

      {/* Content */}
      <Container className="relative z-10 w-full py-24 text-center md:py-28">

        {/* Kicker */}
        <div className="flex justify-center">
          <Kicker tone="light">
            {kicker}
          </Kicker>
        </div>

        {/* Main Title */}
        <h1 className="mx-auto mt-5 max-w-5xl text-balance font-serif text-4xl uppercase leading-tight tracking-[0.06em] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {/* Decorative Line */}
        <div className="mx-auto mt-10 flex w-full max-w-4xl items-center">
          <div className="relative h-px w-full bg-cream/90">

            {/* Dot 1 */}
            <span className="absolute left-1/4 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />

            {/* Dot 2 */}
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />

            {/* Dot 3 */}
            <span className="absolute left-3/4 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />

          </div>
        </div>

        {/* Intro */}
        {intro && (
          <p className="mx-auto mt-12 max-w-4xl text-pretty text-base leading-relaxed tracking-wide text-cream/90 sm:text-lg md:text-xl lg:text-[21px]">
            {intro}
          </p>
        )}

      </Container>
    </section>
  )
}