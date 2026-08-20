import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { experienceHighlights } from "@/lib/content/experience"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Compass,
  Shield,
  ArrowRight,
} from "lucide-react"

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
    path: "/experience",
    title: `${dict.experience.title} — VISTAH Heredia`,
    description: dict.experience.intro,
    image: "/images/experience-hero.png",
  })
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.experience

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">

      {/* =========================
          HERO
      ========================= */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/experience-hero.png"
        imageAlt="Panoramic view over Heredia, its stadium, and the surrounding mountains"
      />

      {/* =========================
          OVERVIEW HIGHLIGHTS
      ========================= */}
<section className="relative overflow-hidden border-b border-border/40 bg-background py-20 md:py-28">
  {/* Soft background glow */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[160px]" />

  <Container className="relative z-10">

    {/* =========================================================
        HOTEL DESIGN
    ========================================================= */}
    <Reveal>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {t.exteriorKicker}
        </span>

        <h2 className="mt-5 text-balance font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
          {t.exteriorTitle}
        </h2>
      </div>
    </Reveal>


    {/* =========================================================
        EXTERIOR IMAGES
    ========================================================= */}
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
      {t.exteriorViews.slice(0, 3).map((view, i) => (
        <Reveal key={view.image} delay={i * 100}>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-sm">
            <Image
              src={view.image}
              alt={view.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            {/* View label */}
            <div className="absolute bottom-5 left-5">
              <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {view.label}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>


    {/* =========================================================
        NIGHT VIEW - FEATURE IMAGE
    ========================================================= */}
    {t.exteriorViews[3] && (
      <Reveal delay={200}>
        <div className="mt-5">
          <div className="group relative aspect-[21/8] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={t.exteriorViews[3].image}
              alt={t.exteriorViews[3].alt}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5">
              <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {t.exteriorViews[3].label}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    )}


    {/* =========================================================
        OVERVIEW
    ========================================================= */}
    <Reveal delay={100}>
      <div className="mx-auto mt-24 max-w-4xl text-center md:mt-32">

        <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {t.overviewKicker}
        </span>

        <div className="mt-8 space-y-6">
          {t.overviewBody.map((paragraph, i) => (
            <p
              key={i}
              className="text-pretty font-light leading-relaxed text-muted-foreground md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

      </div>
    </Reveal>


    {/* =========================================================
        SPACES INTRO
    ========================================================= */}
    <Reveal delay={150}>
      <div className="mx-auto mt-24 max-w-3xl text-center md:mt-32">

        <div className="mx-auto mb-6 h-px w-20 bg-primary/40" />

        <p className="text-balance font-serif text-2xl leading-relaxed tracking-tight text-foreground md:text-3xl">
          {t.overviewSpacesIntro}
        </p>

      </div>
    </Reveal>


    {/* =========================================================
        SPACES
    ========================================================= */}
    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {dict.spaces.items.map((space, i) => (
        <Reveal key={space.id} delay={i * 70}>
          <Link
            href={`/${l}/spaces#${space.id}`}
            className="group relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >

            {/* Number */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl text-primary/40 transition-colors group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm text-muted-foreground transition-all group-hover:border-primary group-hover:text-primary">
                →
              </span>
            </div>

            {/* Content */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors group-hover:text-primary">
                {space.name}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {space.body}
              </p>
            </div>

            {/* Bottom line */}
            <div className="mt-6 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

          </Link>
        </Reveal>
      ))}
    </div>


    {/* =========================================================
        CTA
    ========================================================= */}
    <Reveal delay={100}>
      <div className="relative mt-24 overflow-hidden rounded-3xl bg-charcoal px-6 py-16 text-center text-cream md:mt-32 md:px-12 md:py-24">

        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-champagne/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl">

          <h2 className="text-balance font-serif text-3xl leading-tight md:text-5xl">
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-cream/75 md:text-lg">
            {t.ctaBody}
          </p>

          <div className="mt-8">
            <CTALink
              href={`/${l}/pre-booking`}
              variant="light"
              size="lg"
            >
              {t.ctaButton}
            </CTALink>
          </div>

        </div>
      </div>
    </Reveal>

  </Container>
</section>

      {/* =========================
          EXPERIENCE HIGHLIGHTS
          1,3,5 = background
          2,4   = secondary
      ========================= */}
      <div className="bg-background">

        {experienceHighlights.map((item, i) => {

          const reversed = i % 2 === 1
          const isSecondary = i % 2 === 1

          return (
            <section
              key={item.id}
              id={item.id}
              className={cn(
                "relative scroll-mt-28 overflow-hidden border-b border-border/30 py-20 md:py-32",
                isSecondary
                  ? "bg-secondary"
                  : "bg-background"
              )}
            >

              {/* Ambient Accent */}
              <div
                className={cn(
                  "pointer-events-none absolute top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]",
                  reversed
                    ? "left-[-10%]"
                    : "right-[-10%]"
                )}
              />

              <Container className="relative z-10">

                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

                  {/* =========================
                      IMAGE
                  ========================= */}
                  <Reveal
                    className={cn(
                      "h-full lg:col-span-7",
                      reversed && "lg:order-2"
                    )}
                  >

                    <div className="
                    ">

                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">

                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title[l]}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority={i === 0}
                        />

                        {/* Image Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      </div>

                    </div>

                  </Reveal>

                  {/* =========================
                      CONTENT
                  ========================= */}
                  <Reveal
                    delay={100}
                    className={cn(
                      "flex flex-col justify-center lg:col-span-5",
                      reversed && "lg:order-1"
                    )}
                  >

                    {/* Kicker */}
                    <div className="mb-3 flex items-center gap-2">

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur-md">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        {item.kicker[l]}
                      </span>

                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-3xl leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                      {item.title[l]}
                    </h2>

                    {/* Body */}
                    <p className="mt-6 text-pretty text-base font-light leading-relaxed text-muted-foreground">
                      {item.body[l]}
                    </p>

                    {/* Animated Button */}
                    <div className="mt-10 border-t border-border/60 pt-6">

                      <CTALink
                        href={`/${l}/pre-booking`}
                        variant="primary"
                        size="lg"
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-2xl
                          px-8
                          py-4
                          shadow-sm
                          transition-all
                          duration-300
                          ease-out
                          hover:-translate-y-1
                          hover:shadow-xl
                          hover:shadow-primary/25
                          active:translate-y-0
                          active:scale-[0.98]
                        "
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {t.ctaButton}

                          <ArrowRight
                            className="
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              ease-out
                              group-hover:translate-x-1.5
                            "
                          />
                        </span>

                       
                      </CTALink>

                    </div>

                  </Reveal>

                </div>

              </Container>
            </section>
          )
        })}

      </div>

      {/* =========================
          FINAL CTA
          BACKGROUND + PRIMARY BUTTON
      ========================= */}
      <section className="relative overflow-hidden bg-background py-24 md:py-36">

        {/* Ambient Background */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />

        <Container className="relative z-10">

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

            {/* Label */}
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md">

              <Sparkles className="h-3 w-3 animate-pulse" />

              Begin Your Journey

            </span>

            {/* Title */}
            <h2 className="text-balance font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
              {t.ctaTitle}
            </h2>

            {/* Body */}
            <p className="mt-6 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground">
              {t.ctaBody}
            </p>

            {/* Primary Animated Button */}
            <div className="mt-10">

              <CTALink
                href={`/${l}/pre-booking`}
                variant="primary"
                size="lg"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  px-10
                  py-4
                  shadow-lg
                  shadow-primary/20
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:shadow-2xl
                  hover:shadow-primary/30
                  active:translate-y-0
                  active:scale-[0.97]
                "
              >

                <span className="relative z-10 flex items-center gap-2">

                  {t.ctaButton}

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:translate-x-1.5
                    "
                  />

                </span>

                

              </CTALink>

            </div>

          </div>

        </Container>
      </section>

    </div>
  )
}