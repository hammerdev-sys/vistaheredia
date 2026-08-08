import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
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
      <section className="bg-background py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.acronymTitle} title={t.title} className="sr-only" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {t.acronym.map((item, i) => (
              <Reveal key={item.letter} delay={i * 60} className="bg-card p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-5xl text-primary">{item.letter}</span>
                  <span className="font-serif text-2xl text-card-foreground">{item.word}</span>
                </div>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stadium connection */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <Image
          src="/images/hero-stadium.png"
          alt="VISTAH Heredia integrated with the stadium at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Kicker tone="light">{t.stadiumKicker}</Kicker>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-cream md:text-4xl lg:text-[2.75rem]">
              {t.stadiumTitle}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
              {t.stadiumBody}
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.valuesKicker} title={t.valuesTitle} align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, i) => (
              <Reveal key={value.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
                  <h3 className="font-serif text-xl text-card-foreground">{value.name}</h3>
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
      <section className="bg-background py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.personalityKicker} title={t.personalityTitle} />
          <div className="mt-10 flex flex-wrap gap-3">
            {t.personality.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-foreground"
              >
                {trait}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Kicker tone="light">{t.locationKicker}</Kicker>
              <h2 className="mt-4 text-balance font-serif text-3xl leading-tight md:text-4xl">
                {t.locationTitle}
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
                {t.locationBody}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <dl className="divide-y divide-cream/15">
                {t.locationPoints.map((point) => (
                  <div key={point.label} className="flex items-center justify-between gap-4 py-4">
                    <dt className="text-cream/70">{point.label}</dt>
                    <dd className="text-right font-medium text-cream">{point.value}</dd>
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
