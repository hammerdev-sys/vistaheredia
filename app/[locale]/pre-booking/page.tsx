import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  Info,
  BedDouble,
  PartyPopper,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { InquiryForm } from "@/components/forms/inquiry-form"

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
    path: "/pre-booking",
    title: `${dict.sales.title} — VISTAH Heredia`,
    description: dict.sales.intro,
    image: "/images/ballroom.png",
  })
}

export default async function PreBookingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.sales

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground selection:bg-primary/20">
      {/* Hero */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/ballroom.png"
        imageAlt="Sixth-floor ballroom with panoramic stadium views at VISTAH Heredia"
      />

      {/* Main Booking Section */}
      <section className="relative overflow-hidden bg-background py-24 md:py-36">
        {/* Ambient Primary Glow */}
        <div
          className="
            pointer-events-none absolute
            left-[-5%] top-1/3
            h-[600px] w-[600px]
            rounded-full
            bg-primary/5
            blur-[150px]
          "
        />

        {/* Secondary Champagne Glow */}
        <div
          className="
            pointer-events-none absolute
            bottom-10 right-[-5%]
            h-[600px] w-[600px]
            rounded-full
            bg-champagne/5
            blur-[150px]
          "
        />

        <Container className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT COLUMN */}
            <Reveal className="flex flex-col gap-6 lg:col-span-5">
              {/* Rooms Card */}
              <div
                className="
                  group
                  rounded-3xl
                  border border-border/80
                  bg-card/60
                  p-8
                  shadow-sm
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-xl
                "
              >
                {/* Icon */}
                <span
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    shadow-inner
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <BedDouble
                    className="
                      h-6 w-6
                      transition-transform
                      duration-500
                      group-hover:rotate-3
                    "
                  />
                </span>

                <h2 className="mt-6 font-serif text-2xl tracking-tight text-card-foreground md:text-3xl">
                  {t.roomsTitle}
                </h2>

                <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
                  {t.roomsBody}
                </p>
              </div>

              {/* Events Card */}
              <div
                className="
                  group
                  rounded-3xl
                  border border-border/80
                  bg-card/60
                  p-8
                  shadow-sm
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-xl
                "
              >
                {/* Icon */}
                <span
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    shadow-inner
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <PartyPopper
                    className="
                      h-6 w-6
                      transition-transform
                      duration-500
                      group-hover:-rotate-3
                    "
                  />
                </span>

                <h2 className="mt-6 font-serif text-2xl tracking-tight text-card-foreground md:text-3xl">
                  {t.eventsTitle}
                </h2>

                <p className="mt-4 text-pretty font-light leading-relaxed text-muted-foreground">
                  {t.eventsBody}
                </p>
              </div>

              {/* Information Note */}
              <div
                className="
                  group
                  flex items-start gap-4
                  rounded-3xl
                  border border-border/60
                  bg-secondary/40
                  p-6
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-primary/40
                  hover:bg-secondary/60
                "
              >
                <span
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    transition-all
                    duration-300
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <Info className="h-5 w-5" />
                </span>

                <p className="text-pretty text-sm font-light leading-relaxed text-muted-foreground">
                  {t.note}
                </p>
              </div>
            </Reveal>

            {/* RIGHT COLUMN - FORM */}
            <Reveal delay={100} className="lg:col-span-7">
              <div
                className="
                  group
                  rounded-[2.5rem]
                  border border-border/80
                  bg-card/80
                  p-8
                  shadow-xl
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  hover:border-primary/50
                  hover:shadow-2xl
                  md:p-12
                "
              >
                {/* Priority Access Badge */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="
                      inline-flex items-center gap-1.5
                      rounded-full
                      border border-primary/20
                      bg-primary/10
                      px-3.5 py-1.5
                      text-xs font-semibold
                      uppercase tracking-[0.16em]
                      text-primary
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:border-primary/40
                      group-hover:bg-primary/15
                    "
                  >
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    Priority Access
                  </span>
                </div>

                <h2 className="font-serif text-3xl tracking-tight text-card-foreground md:text-4xl">
                  {t.formTitle}
                </h2>

                <p className="mt-3 text-base font-light leading-relaxed text-muted-foreground">
                  {t.formSubtitle}
                </p>

                {/* Form */}
                <div className="mt-8 border-t border-border/60 pt-8">
                  <InquiryForm dict={dict} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section
        className="
          relative
          overflow-hidden
          border-t border-border/20
          bg-background
          py-20
          md:py-28
        "
      >
        {/* Primary Glow */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-1/2
            h-[500px] w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary/5
            blur-[140px]
          "
        />

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* Small Label */}
            <span
              className="
                mb-3
                text-xs font-semibold
                uppercase tracking-[0.2em]
                text-primary
              "
            >
              VISTAH Heredia
            </span>

            <h2
              className="
                text-balance
                font-serif
                text-3xl
                tracking-tight
                text-foreground
                md:text-4xl
              "
            >
              Your Private Sanctuary Awaits
            </h2>

            <p
              className="
                mt-4
                max-w-lg
                text-pretty
                text-base
                font-light
                leading-relaxed
                text-muted-foreground
              "
            >
              Our dedicated concierge team is ready to assist you with
              personalized bookings and bespoke arrangements.
            </p>

            {/* Animated Primary Button */}
            <div className="mt-8">
              <a
                href={`/${l}/pre-booking`}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  bg-primary
                  px-8
                  py-3.5
                  text-sm
                  font-medium
                  text-primary-foreground
                  shadow-md
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
                {/* Sliding Hover Layer */}
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-primary-foreground/10
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:translate-x-0
                  "
                />

                <span className="relative z-10">
                  {dict.home.ctaSalesButton}
                </span>

                <ArrowRight
                  className="
                    relative z-10
                    h-4 w-4
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:translate-x-1.5
                  "
                />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}