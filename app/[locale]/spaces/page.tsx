import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"
import { SpacesGalleryCarousel } from "@/components/spaces-gallery-carousel"

const gallerySpaceImages = [
  { src: "/images/AZO_bar.jpg", alt: "Azo Lounge Bar rooftop terrace at VISTAH" },
  { src: "/images/AZO_PISCINA .jpg", alt: "Azo Piscina rooftop infinity pool at VISTAH" },
  { src: "/images/CORNER.jpg", alt: "The Corner sports bar terrace at VISTAH" },
  { src: "/images/lobby.png", alt: "VISTAH guest room with wardrobe" },
  { src: "/images/room-corner.png", alt: "VISTAH guest room with workspace" },
  { src: "/images/skyroomnew.png", alt: "VISTAH en-suite bathroom" },
]

const spaceImages: Record<string, string> = {
  rooms: "/images/guest-room.png",
  lobby: "/images/lobbyandcoffee.png",
  champions: "/images/champion.png",
  ballroom: "/images/ballroom3.png",
  skyroom: "/images/skyroomnew.png",
  rooftop: "/images/AZO_PISCINA .jpg",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) return {}

  const dict = getDictionary(locale)

  return buildMetadata({
    locale,
    path: "/spaces",
    title: `${dict.spaces.title} — VISTAH Heredia`,
    description: dict.spaces.intro,
    image: "/images/rooftop.png",
  })
}

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.spaces

  return (
    <>
      {/* Page Hero */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/rooftop.png"
        imageAlt="VISTAH Heredia spaces"
      />

      {/* Spaces */}
      <div className="bg-background">
        {t.items.map((space, i) => {
          const reversed = i % 2 === 1

          return (
            <section
              key={space.id}
              id={space.id}
              className={cn(
                "scroll-mt-24 py-16 md:py-24",
                i % 2 === 1 && "bg-secondary"
              )}
            >
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                  {/* Image */}
                  <Reveal
                    className={cn(
                      "group relative aspect-[4/3] overflow-hidden rounded-lg",
                      reversed && "lg:order-2"
                    )}
                  >
                    <Image
                      src={
                        spaceImages[space.id] ||
                        "/placeholder.svg"
                      }
                      alt={`${space.name} at VISTAH Heredia`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Image Overlay */}
                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-charcoal/40
                        via-transparent
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Image Corner Icon */}
                    <div
                      className="
                        absolute right-5 top-5
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-background/80
                        text-foreground
                        opacity-0
                        shadow-lg
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover:opacity-100
                        group-hover:scale-100
                        scale-90
                      "
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal
                    delay={100}
                    className={cn(
                      reversed && "lg:order-1"
                    )}
                  >
                    {/* Kicker */}
                    <Kicker
                      className="
                        transition-colors
                        duration-300
                        hover:text-primary
                      "
                    >
                      {space.tagline}
                    </Kicker>

                    {/* Title */}
                    <h2
                      className="
                        mt-3
                        font-serif
                        text-3xl
                        tracking-tight
                        text-foreground
                        transition-colors
                        duration-300
                        hover:text-primary
                        md:text-4xl
                      "
                    >
                      {space.name}
                    </h2>

                    {/* Description */}
                    <p
                      className="
                        mt-5
                        text-pretty
                        text-lg
                        leading-relaxed
                        text-muted-foreground
                      "
                    >
                      {space.body}
                    </p>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-wrap items-center gap-3">

                      {/* Explore Button */}
                      <CTALink
                        href={`/${l}/spaces/${space.id}`}
                        variant="primary"
                        className="
                          group/primary
                          rounded-xl
                          px-5
                          py-3
                          transition-all
                          duration-300
                          ease-out
                          hover:-translate-y-1
                          hover:shadow-lg
                          hover:shadow-primary/25
                          active:translate-y-0
                          active:scale-[0.97]
                        "
                      >
                        <span>
                          {dict.spaceDetail.exploreDetail}
                        </span>

                        <ArrowRight
                          className="
                            h-4 w-4
                            transition-transform
                            duration-300
                            ease-out
                            group-hover/primary:translate-x-1
                          "
                        />
                      </CTALink>

                      {/* Booking Button */}
                      {(space.id === "ballroom" ||
                        space.id === "rooms") && (
                        <CTALink
                          href={`/${l}/pre-booking`}
                          variant="outline"
                          className="
                            group/outline
                            rounded-xl
                            border-primary/40
                            px-5
                            py-3
                            transition-all
                            duration-300
                            ease-out
                            hover:-translate-y-1
                            hover:border-primary
                            hover:bg-primary
                            hover:text-primary-foreground
                            hover:shadow-md
                            active:translate-y-0
                            active:scale-[0.97]
                          "
                        >
                          <span>
                            {dict.home.ctaSalesButton}
                          </span>

                          <ArrowUpRight
                            className="
                              h-4 w-4
                              transition-transform
                              duration-300
                              ease-out
                              group-hover/outline:translate-x-0.5
                              group-hover/outline:-translate-y-0.5
                            "
                          />
                        </CTALink>
                      )}

                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
          )
        })}
      </div>

      {/* ================================================== */}
      {/* SPACE GALLERY */}
      {/* ================================================== */}

<section className="border-t border-border bg-secondary/30 py-20 md:py-28">
  <Container>

    {/* Gallery Header */}
    <div className="mb-12 text-center">
      <Kicker>Gallery</Kicker>

      <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-5xl">
        Explore VISTAH
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        Discover the spaces, atmosphere, and details of VISTAH Heredia.
      </p>
    </div>

    {/* Gallery Carousel */}
    <SpacesGalleryCarousel images={gallerySpaceImages} />
  </Container>
</section>
    </>
  )
}