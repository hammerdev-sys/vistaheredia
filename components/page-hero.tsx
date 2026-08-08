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
    <section className="relative flex min-h-[52vh] items-end overflow-hidden md:min-h-[60vh]">
      <Image
        src={image || "/placeholder.svg"}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/30" />
      <Container className="relative z-10 pb-14 pt-28 md:pb-20">
        <Kicker tone="light">{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-cream md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream/85">
            {intro}
          </p>
        )}
      </Container>
    </section>
  )
}
