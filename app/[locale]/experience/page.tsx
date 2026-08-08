import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
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
      <section className="relative border-b border-border/40 bg-background pb-4 pt-16">

        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[160px]" />

        
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