import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";
import { experienceHighlights } from "@/lib/content/experience";

import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTALink } from "@/components/brand/cta-link";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/experience",
    title: `${dict.experience.title} — VISTAH Heredia`,
    description: dict.experience.intro,
    image: "/images/experience-hero.png",
  });
}

/* =========================================================
   EXPERIENCE PAGE
========================================================= */

export default async function ExperiencePage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l = locale as Locale;
  const dict = getDictionary(l);
  const t = dict.experience;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">

      {/* =======================================================
          HERO
      ======================================================= */}

      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/experience-hero.png"
        imageAlt="Panoramic view over Heredia, its stadium, and surrounding mountains"
      />

      {/* =======================================================
          SECTION 01 — HOTEL DESIGN
      ======================================================= */}

      <section className="relative overflow-hidden border-b border-border/40 bg-background py-20 md:py-28">

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />

        <Container className="relative z-10">

          {/* Section heading */}
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">

              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t.exteriorKicker}
              </span>

              <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight md:text-5xl">
                {t.exteriorTitle}
              </h2>

            </div>
          </Reveal>

          {/* Exterior images */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">

            {t.exteriorViews.slice(0, 3).map((view, index) => (
              <Reveal
                key={view.image}
                delay={index * 100}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">

                  <Image
                    src={view.image}
                    alt={view.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                      {view.label}
                    </span>
                  </div>

                </div>
              </Reveal>
            ))}

          </div>

          {/* Large night image */}
          {t.exteriorViews[3] && (
            <Reveal delay={200}>
              <div className="group relative mt-5 aspect-[21/8] overflow-hidden rounded-2xl bg-muted">

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
            </Reveal>
          )}

          {/* Overview */}
          <Reveal delay={100}>
            <div className="mx-auto mt-20 max-w-4xl text-center md:mt-28">

              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t.overviewKicker}
              </span>

              <div className="mt-8 space-y-5">

                {t.overviewBody.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-pretty font-light leading-relaxed text-muted-foreground md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}

              </div>

            </div>
          </Reveal>

          {/* Spaces introduction */}
          <Reveal delay={150}>
            <div className="mx-auto mt-20 max-w-3xl text-center md:mt-28">

              <div className="mx-auto mb-6 h-px w-20 bg-primary/40" />

              <p className="text-pretty font-serif text-2xl leading-relaxed tracking-tight md:text-3xl">
                {t.overviewSpacesIntro}
              </p>

            </div>
          </Reveal>

          {/* Spaces cards */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {dict.spaces.items.map((space, index) => (
              <Reveal
                key={space.id}
                delay={index * 70}
              >
                <Link
                  href={`/${l}/spaces#${space.id}`}
                  className="group flex h-full min-h-[230px] flex-col justify-between rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >

                  {/* Number */}
                  <div className="flex items-center justify-between">

                    <span className="font-serif text-2xl text-primary/40 transition-colors group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                      →
                    </span>

                  </div>

                  {/* Content */}
                  <div className="mt-10">

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                      {space.name}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {space.body}
                    </p>

                  </div>

                  {/* Hover line */}
                  <div className="mt-6 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

                </Link>
              </Reveal>
            ))}

          </div>

        </Container>
      </section>

      {/* =======================================================
          SECTION 02 — EXPERIENCE HIGHLIGHTS
      ======================================================= */}

      <section className="bg-background">

        {experienceHighlights.map((item, index) => {

          const reversed = index % 2 === 1;

          return (
            <section
              key={item.id}
              id={item.id}
              className={cn(
                "relative overflow-hidden border-b border-border/30 py-20 md:py-32",
                reversed ? "bg-secondary" : "bg-background"
              )}
            >

              {/* Ambient glow */}
              <div
                className={cn(
                  "pointer-events-none absolute top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]",
                  reversed ? "left-[-10%]" : "right-[-10%]"
                )}
              />

              <Container className="relative z-10">

                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <Reveal
                    className={cn(
                      "lg:col-span-7",
                      reversed && "lg:order-2"
                    )}
                  >
                    <div className="group relative overflow-hidden rounded-2xl">

                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">

                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title[l]}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority={index === 0}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      </div>

                    </div>
                  </Reveal>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <Reveal
                    delay={100}
                    className={cn(
                      "lg:col-span-5",
                      reversed && "lg:order-1"
                    )}
                  >

                    <div className="flex flex-col">

                      {/* Kicker */}
                      <div className="mb-4">

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          <Sparkles className="h-3 w-3" />
                          {item.kicker[l]}
                        </span>

                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                        {item.title[l]}
                      </h2>

                      {/* Description */}
                      <p className="mt-6 text-pretty text-base font-light leading-relaxed text-muted-foreground">
                        {item.body[l]}
                      </p>

                      {/* CTA */}
                      <div className="mt-8 border-t border-border/60 pt-6">

                        <CTALink
                          href={`/${l}/pre-booking`}
                          variant="primary"
                          size="lg"
                          className="group inline-flex rounded-2xl px-8 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 active:translate-y-0 active:scale-[0.98]"
                        >
                          <span className="flex items-center gap-2">

                            {t.ctaButton}

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />

                          </span>
                        </CTALink>

                      </div>

                    </div>

                  </Reveal>

                </div>

              </Container>
            </section>
          );
        })}

      </section>

      {/* =======================================================
          FINAL CTA
      ======================================================= */}

      <section className="relative overflow-hidden bg-background py-24 md:py-32">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

        <Container className="relative z-10">

          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

              {/* Label */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3 w-3" />
                Begin Your Journey
              </span>

              {/* Title */}
              <h2 className="mt-6 text-balance font-serif text-3xl leading-tight tracking-tight md:text-5xl">
                {t.ctaTitle}
              </h2>

              {/* Body */}
              <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-muted-foreground">
                {t.ctaBody}
              </p>

              {/* Button */}
              <div className="mt-10">

                <CTALink
                  href={`/${l}/pre-booking`}
                  variant="primary"
                  size="lg"
                  className="group inline-flex rounded-2xl px-10 py-4 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 active:translate-y-0 active:scale-[0.97]"
                >
                  <span className="flex items-center gap-2">

                    {t.ctaButton}

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />

                  </span>
                </CTALink>

              </div>

            </div>
          </Reveal>

        </Container>
      </section>

    </main>
  );
}