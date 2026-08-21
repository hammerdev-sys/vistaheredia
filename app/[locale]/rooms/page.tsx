import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { getActiveRoomTypes } from "@/lib/content/rooms"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { MediaCarousel } from "@/components/media-carousel"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

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
    path: "/rooms",
    title: `${dict.rooms.title} — VISTAH Heredia`,
    description: dict.rooms.intro,
    image: "/images/guest-room.jpg",
  })
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.rooms
  const detail = dict.spaceDetail
  const rooms = getActiveRoomTypes()

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/guest-room.jpg"
        imageAlt="A warm, contemporary VISTAH guest room with city views"
      />

      <div className="bg-background">
        {rooms.map((room, i) => {
          const reversed = i % 2 === 1
          return (
            <section
              key={room.id}
              id={room.id}
              className={cn("scroll-mt-24 py-16 md:py-24", reversed && "bg-secondary")}
            >
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal className={cn(reversed && "lg:order-2")}>
                    <MediaCarousel
                      items={room.gallery}
                      locale={l}
                      labels={{ prev: detail.prev, next: detail.next }}
                      priority={i === 0}
                    />
                  </Reveal>

                  <Reveal delay={100} className={cn(reversed && "lg:order-1")}>
                    <Kicker>{room.tagline[l]}</Kicker>
                    <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                      {room.name[l]}
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {t.sizeLabel}
                        </span>
                        <span className="mt-1 block font-medium text-foreground">{room.size[l]}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {t.sleepsLabel}
                        </span>
                        <span className="mt-1 block font-medium text-foreground">{room.sleeps[l]}</span>
                      </div>
                    </div>

                    <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                      {room.description[l]}
                    </p>

                    <div className="mt-7">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t.featuresLabel}
                      </span>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {room.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-sm text-foreground/90">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                            <span>{f[l]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <CTALink
                        href={`/${l}/pre-booking`}
                        variant="outline"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.enquire}
                      </CTALink>
                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-balance font-serif text-3xl text-cream md:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-cream/80">{t.ctaBody}</p>
            <div className="mt-8">
              <CTALink href={`/${l}/pre-booking`} variant="light" size="lg">
                {dict.experience.ctaButton}
              </CTALink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
