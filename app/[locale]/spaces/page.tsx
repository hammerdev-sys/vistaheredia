import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"

const spaceImages: Record<string, string> = {
  rooms: "/images/guest-room.png",
  lobby: "/images/lobby-cafe.png",
  champions: "/images/champions-corner.png",
  ballroom: "/images/ballroom.png",
  skyroom: "/images/skyroom.png",
  rooftop: "/images/rooftop.png",
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
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/rooftop.png"
        imageAlt="Rooftop pool and lounge at VISTAH Heredia"
      />

      <div className="bg-background">
        {t.items.map((space, i) => {
          const reversed = i % 2 === 1
          return (
            <section
              key={space.id}
              id={space.id}
              className={cn("scroll-mt-24 py-16 md:py-24", i % 2 === 1 && "bg-secondary")}
            >
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-lg",
                      reversed && "lg:order-2",
                    )}
                  >
                    <Image
                      src={spaceImages[space.id] || "/placeholder.svg"}
                      alt={`${space.name} at VISTAH Heredia`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Reveal>
                  <Reveal delay={100} className={cn(reversed && "lg:order-1")}>
                    <Kicker>{space.tagline}</Kicker>
                    <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                      {space.name}
                    </h2>
                    <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                      {space.body}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <CTALink href={`/${l}/spaces/${space.id}`} variant="primary">
                        {dict.spaceDetail.exploreDetail}
                      </CTALink>
                      {(space.id === "ballroom" || space.id === "rooms") && (
                        <CTALink href={`/${l}/pre-booking`} variant="outline">
                          {dict.home.ctaSalesButton}
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
    </>
  )
}
