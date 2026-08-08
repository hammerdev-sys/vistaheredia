import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container, SectionHeading, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"

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
    path: "/story",
    title: `${dict.story.title} — VISTAH Heredia`,
    description: dict.story.intro,
    image: "/images/heredia-city.png",
  })
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale as Locale)
  const t = dict.story

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/heredia-city.png"
        imageAlt="Heredia, the City of Flowers, at golden hour"
      />

      {/* Acronym */}
      <section className="bg-background py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <Container className="relative z-10">
          <SectionHeading kicker={t.acronymTitle} title={t.title} className="sr-only" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.acronym.map((item, i) => (
              <Reveal key={item.letter} delay={i * 60} className="h-full">
                <div className="group relative h-full flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-6xl text-primary transition-transform duration-300 group-hover:scale-105">
                        {item.letter}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-primary/20 transition-colors group-hover:bg-primary" />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl text-card-foreground tracking-tight">
                      {item.word}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground text-sm">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stadium connection */}
      <section className="relative overflow-hidden py-32 md:py-40">
        <Image
          src="/images/hero-stadium.png"
          alt="VISTAH Heredia integrated with the stadium at dusk"
          fill
          sizes="100vw"
          className="object-cover transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/70" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <Kicker tone="light" className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 backdrop-blur-md border border-white/15">
              {t.stadiumKicker}
            </Kicker>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-cream md:text-5xl lg:text-[3.25rem] tracking-tight">
              {t.stadiumTitle}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
              {t.stadiumBody}
            </p>
            
            <div className="mt-8">
              <Link 
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-3.5 text-sm font-medium text-charcoal transition-all duration-300 hover:bg-cream hover:shadow-lg hover:shadow-champagne/20 active:scale-95"
              >
                <span>Discover Spaces</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 py-24 md:py-32">
        <Container>
          <SectionHeading kicker={t.valuesKicker} title={t.valuesTitle} align="center" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, i) => (
              <Reveal key={value.name} delay={i * 80} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                  <div className="h-2 w-8 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-16 group-hover:bg-primary mb-6" />
                  <h3 className="font-serif text-xl text-card-foreground tracking-tight">{value.name}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Personality */}
      <section className="bg-background py-24 md:py-32">
        <Container>
          <SectionHeading kicker={t.personalityKicker} title={t.personalityTitle} />
          <div className="mt-12 flex flex-wrap gap-3">
            {t.personality.map((trait, index) => (
              <Reveal key={trait} delay={index * 40}>
                <span
                  className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-primary-foreground" />
                  {trait}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="bg-charcoal py-24 text-cream md:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
        <Container className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <Kicker tone="light" className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 backdrop-blur-md border border-white/15">
                {t.locationKicker}
              </Kicker>
              <h2 className="mt-4 text-balance font-serif text-3xl leading-tight md:text-5xl tracking-tight">
                {t.locationTitle}
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
                {t.locationBody}
              </p>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm shadow-xl">
              <dl className="divide-y divide-white/10">
                {t.locationPoints.map((point) => (
                  <div key={point.label} className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
                    <dt className="text-cream/70 text-sm">{point.label}</dt>
                    <dd className="text-right font-medium text-cream text-sm">{point.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}