import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Coffee, Users, Sparkles } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import type { Locale } from "@/lib/i18n/config"
import { Container, SectionHeading, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { SpaceCard } from "@/components/space-card"

const pillarIcons = [Users, Sparkles, Coffee]

const spaceImages: Record<string, string> = {
  rooms: "/images/guest-room.png",
  lobby: "/images/lobby-cafe.png",
  champions: "/images/champions-corner.png",
  ballroom: "/images/ballroom.png",
  skyroom: "/images/skyroom.png",
  rooftop: "/images/rooftop.png",
}

export function Intro({ dict }: { dict: Dictionary }) {
  const t = dict.home
  return (
    <section className="bg-background py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Kicker>{t.introKicker}</Kicker>
            <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-[2.75rem]">
              {t.introTitle}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.introBody}
            </p>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/exterior-day.png"
              alt="Daytime architectural render of the VISTAH Heredia exterior beside the stadium"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export function Pillars({ dict }: { dict: Dictionary }) {
  const t = dict.home
  return (
    <section className="bg-secondary py-20 md:py-28">
      <Container>
        <SectionHeading kicker={t.pillarsKicker} title={t.pillarsTitle} align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Users
            return (
              <Reveal key={pillar.name} delay={i * 100}>
                <div className="flex h-full flex-col rounded-lg border border-border bg-card p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl text-card-foreground">{pillar.name}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export function FeaturedSpaces({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home
  const featured = dict.spaces.items.slice(0, 3)
  return (
    <section className="bg-background py-20 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading kicker={t.spacesKicker} title={t.spacesTitle} className="md:max-w-2xl" />
          <CTALink href={`/${locale}/spaces`} variant="outline" className="shrink-0">
            {t.spacesCta}
            <ArrowRight className="h-4 w-4" />
          </CTALink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((space, i) => (
            <Reveal key={space.id} delay={i * 100}>
              <Link href={`/${locale}/spaces#${space.id}`}>
                <SpaceCard
                  name={space.name}
                  tagline={space.tagline}
                  body={space.body}
                  image={spaceImages[space.id]}
                  imageAlt={`${space.name} at VISTAH Heredia`}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ProgressTeaser({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <Image
        src="/images/construction-2.png"
        alt="Construction progress of VISTAH Heredia"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/75" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Kicker tone="light">{t.progressKicker}</Kicker>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-cream md:text-4xl lg:text-[2.75rem]">
            {t.progressTitle}
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
            {t.progressBody}
          </p>
          <div className="mt-8">
            <CTALink href={`/${locale}/construction`} variant="light" size="lg">
              {t.progressCta}
              <ArrowRight className="h-4 w-4" />
            </CTALink>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function DualCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home
  return (
    <section className="bg-secondary py-20 md:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col rounded-lg bg-primary p-10 text-primary-foreground">
            <h3 className="font-serif text-3xl">{t.ctaSalesTitle}</h3>
            <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/85">
              {t.ctaSalesBody}
            </p>
            <div className="mt-8">
              <CTALink href={`/${locale}/pre-booking`} variant="light">
                {t.ctaSalesButton}
                <ArrowRight className="h-4 w-4" />
              </CTALink>
            </div>
          </Reveal>
          <Reveal delay={100} className="flex flex-col rounded-lg bg-charcoal p-10 text-cream">
            <h3 className="font-serif text-3xl">{t.ctaCareersTitle}</h3>
            <p className="mt-4 text-pretty leading-relaxed text-cream/80">
              {t.ctaCareersBody}
            </p>
            <div className="mt-8">
              <CTALink href={`/${locale}/careers`} variant="light">
                {t.ctaCareersButton}
                <ArrowRight className="h-4 w-4" />
              </CTALink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
