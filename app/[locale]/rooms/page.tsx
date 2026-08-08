import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { getActiveRoomTypes } from "@/lib/content/rooms"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { MediaCarousel } from "@/components/media-carousel"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"
import { Check, ArrowRight } from "lucide-react"

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
    image: "/images/guest-room.png",
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      {/* Page Hero */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/guest-room.png"
        imageAlt="A warm, contemporary VISTAH guest room with city views"
      />

      {/* Room Sections */}
      <div className="bg-background">
        {rooms.map((room, i) => {
          const reversed = i % 2 === 1

          return (
            <section
              key={room.id}
              id={room.id}
              className={cn(
                "scroll-mt-24 border-b border-border/40 py-20 md:py-32 last:border-b-0",
                i % 2 === 0
                  ? "bg-background"
                  : "bg-secondary"
              )}
            >
              <Container>
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

                  {/* Media Carousel */}
                  <Reveal
                    className={cn(
                      "lg:col-span-7",
                      reversed && "lg:order-2"
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-3 shadow-sm">
                      <MediaCarousel
                        items={room.gallery}
                        locale={l}
                        labels={{
                          prev: detail.prev,
                          next: detail.next,
                        }}
                        priority={i === 0}
                      />
                    </div>
                  </Reveal>

                  {/* Content Info */}
                  <Reveal
                    delay={80}
                    className={cn(
                      "flex flex-col justify-center lg:col-span-5",
                      reversed && "lg:order-1"
                    )}
                  >

                    {/* Tagline */}
                    <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {room.tagline[l]}
                    </span>

                    {/* Room Title */}
                    <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl">
                      {room.name[l]}
                    </h2>

                    {/* Room Details */}
                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border/60 py-4 text-sm">

                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {t.sizeLabel}
                        </span>

                        <span className="mt-1 block font-medium text-foreground">
                          {room.size[l]}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {t.sleepsLabel}
                        </span>

                        <span className="mt-1 block font-medium text-foreground">
                          {room.sleeps[l]}
                        </span>
                      </div>

                    </div>

                    {/* Description */}
                    <p className="mt-6 text-pretty text-base font-light leading-relaxed text-muted-foreground">
                      {room.description[l]}
                    </p>

                    {/* Features */}
                    <div className="mt-6">

                      <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t.featuresLabel}
                      </span>

                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {room.features.map((f, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-2 text-sm font-light text-foreground/90"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                              aria-hidden
                            />

                            <span>{f[l]}</span>
                          </li>
                        ))}
                      </ul>

                    </div>

                    {/* Button */}
                    <div className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">

                      <CTALink
                        href={`/${l}/pre-booking`}
                        variant="outline"
                        className="
                          group
                          rounded-3xl
                          border-primary
                          bg-primary
                          px-6
                          py-3
                          text-white
                          transition-all
                          duration-300
                          ease-out
                          hover:-translate-y-1
                          hover:border-primary
                          hover:bg-primary/90
                          hover:text-white
                          hover:shadow-lg
                          hover:shadow-primary/25
                          active:translate-y-0
                          active:scale-[0.98]
                        "
                      >
                        {t.enquire}

                        <ArrowRight
                          className="
                            h-4 w-4
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </CTALink>

                    </div>

                  </Reveal>
                </div>
              </Container>
            </section>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">

            <h2 className="text-balance font-serif text-3xl tracking-tight text-cream md:text-4xl">
              {t.ctaTitle}
            </h2>

            <p className="mt-4 text-pretty text-base font-light leading-relaxed text-cream/80">
              {t.ctaBody}
            </p>

            <div className="mt-8">

              <CTALink
                href={`/${l}/pre-booking`}
                variant="light"
                size="lg"
                className="
                  group
                  rounded-3xl
                  px-8
                  bg-primary
                  text-cream
                  hover:text-charcoal
                  font-semibold
                  py-3.5
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:shadow-lg
                  active:translate-y-0
                  active:scale-[0.98]
                "
              >
                {dict.experience.ctaButton}

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </CTALink>

            </div>

          </div>
        </Container>
      </section>

    </div>
  )
}