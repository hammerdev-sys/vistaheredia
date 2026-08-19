import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

import { PageHero } from "@/components/page-hero";
import {
  Container,
  SectionHeading,
  Kicker,
} from "@/components/section";
import { Reveal } from "@/components/reveal";


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: "/story",
    title: `${dict.story.title} — VISTAH Heredia`,
    description: dict.story.intro,
    image: "/images/heredia-city.png",
  });
}


/* =========================================================
   STORY PAGE
========================================================= */

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);
  const t = dict.story;

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/view3.jpeg"
        imageAlt="Heredia, the City of Flowers, at golden hour"
      />


      {/* =====================================================
          MEANING OF VISTAH
      ===================================================== */}

      <section className="relative overflow-hidden bg-background py-20 md:py-32">

        {/* Decorative background */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <Container className="relative z-10">

          <SectionHeading
            kicker={t.acronymTitle}
            title={t.title}
            className="sr-only"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {t.acronym.map((item, i) => (
              <Reveal
                key={item.letter}
                delay={i * 60}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">

                  <div>

                    <div className="flex items-baseline justify-between">

                      <span className="font-serif text-6xl text-primary transition-transform duration-300 group-hover:scale-105">
                        {item.letter}
                      </span>

                      <span className="h-2 w-2 rounded-full bg-primary/20 transition-colors group-hover:bg-primary" />

                    </div>

                    <h3 className="mt-6 font-serif text-2xl tracking-tight text-card-foreground">
                      {item.word}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>

                  </div>

                </div>
              </Reveal>
            ))}

          </div>

        </Container>
      </section>


{/* =====================================================
    VISTAH IN CONTEXT — MAPS
===================================================== */}
<section className="overflow-hidden bg-[#f3efe7] py-16 md:py-20">
  <Container>
    <div className="flex flex-col gap-6 lg:flex-row">

      {/* MAP 1 */}
      <Reveal className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/map1.png"
            alt="VISTAH location across Costa Rica"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </Reveal>

      {/* MAP 2 */}
      <Reveal
        delay={100}
        className="w-full lg:w-1/2"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/map2.png"
            alt="VISTAH surrounding area map"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </Reveal>

    </div>
  </Container>
</section>

      {/* =====================================================
          STADIUM CONNECTION
      ===================================================== */}

     {/* =====================================================
    STADIUM CONNECTION
===================================================== */}

<section className="overflow-hidden bg-background">

  {/* =========================
      MAIN STADIUM HERO
  ========================= */}

  <div className="relative min-h-[650px] overflow-hidden md:min-h-[720px]">

    {/* Stadium Background */}
    <Image
      src="/images/stadium-connection.png"
      alt="VISTAH Heredia integrated with the stadium and surrounding landscape"
      fill
      sizes="100vw"
      className="object-cover object-center"
      priority
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/30" />

    {/* Hero Content */}
    <Container className="relative z-10 flex min-h-[650px] items-center md:min-h-[720px]">

      <div className="max-w-2xl">

        <Kicker
          tone="light"
          className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 backdrop-blur-md"
        >
          {t.stadiumKicker}
        </Kicker>

        <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight text-cream md:text-5xl lg:text-[3.25rem]">
          {t.stadiumTitle}
        </h2>

        <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/85">
          {t.stadiumBody}
        </p>

        <div className="mt-8">

          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-3.5 text-sm font-medium text-charcoal transition-all duration-300 hover:bg-cream hover:shadow-lg hover:shadow-champagne/20 active:scale-95"
          >
            <span>
              Discover Spaces
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>

        </div>

      </div>

    </Container>

  </div>


  {/* =========================
      STADIUM IMAGE GALLERY
  ========================= */}

  <div className="bg-background py-12 md:py-16">

    <Container>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* IMAGE 01 */}
        <Reveal delay={0}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">

            <Image
              src="/images/stadium-connection.png"
              alt="Stadium tournament atmosphere"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

          </div>
        </Reveal>


        {/* IMAGE 02 */}
        <Reveal delay={80}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">

            <Image
              src="/images/stadium2.png"
              alt="Live tournament experience"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

          </div>
        </Reveal>


        {/* IMAGE 03 */}
        <Reveal delay={160}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">

            <Image
              src="/images/stadium3.png"
              alt="Stadium crowd and tournament atmosphere"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

          </div>
        </Reveal>


        {/* IMAGE 04 */}
        <Reveal delay={240}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">

            <Image
              src="/images/stadium4.png"
              alt="VISTAH stadium experience"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

          </div>
        </Reveal>

      </div>

    </Container>

  </div>

</section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="bg-secondary/50 py-24 md:py-32">

        <Container>

          <SectionHeading
            kicker={t.valuesKicker}
            title={t.valuesTitle}
            align="center"
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {t.values.map((value, i) => (
              <Reveal
                key={value.name}
                delay={i * 80}
                className="h-full"
              >

                <div className="group flex h-full flex-col rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">

                  <div className="mb-6 h-2 w-8 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />

                  <h3 className="font-serif text-xl tracking-tight text-card-foreground">
                    {value.name}
                  </h3>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {value.body}
                  </p>

                </div>

              </Reveal>
            ))}

          </div>

        </Container>

      </section>


      {/* =====================================================
          PERSONALITY
      ===================================================== */}

      <section className="bg-background py-24 md:py-32">

        <Container>

          <SectionHeading
            kicker={t.personalityKicker}
            title={t.personalityTitle}
          />

          <div className="mt-12 flex flex-wrap gap-3">

            {t.personality.map((trait, index) => (
              <Reveal
                key={trait}
                delay={index * 40}
              >

                <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm">

                  <span className="h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-primary-foreground" />

                  {trait}

                </span>

              </Reveal>
            ))}

          </div>

        </Container>

      </section>


      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-32">

        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-champagne/5 blur-3xl" />

        <Container className="relative z-10">

          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

            <div>

              <Kicker
                tone="light"
                className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 backdrop-blur-md"
              >
                {t.locationKicker}
              </Kicker>

              <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-5xl">
                {t.locationTitle}
              </h2>

              <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
                {t.locationBody}
              </p>

            </div>


            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-xl backdrop-blur-sm">

              <dl className="divide-y divide-white/10">

                {t.locationPoints.map((point) => (
                  <div
                    key={point.label}
                    className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
                  >

                    <dt className="text-sm text-cream/70">
                      {point.label}
                    </dt>

                    <dd className="text-right text-sm font-medium text-cream">
                      {point.value}
                    </dd>

                  </div>
                ))}

              </dl>

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-background py-24 md:py-32">

        <Container>

          <div className="rounded-3xl border border-border/70 bg-secondary/40 px-6 py-16 text-center md:px-12 md:py-24">

            <Kicker>
              VISTAH · HEREDIA
            </Kicker>

            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              Discover a place shaped by its surroundings.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore the spaces, experiences and stories that make
              VISTAH part of Heredia.
            </p>

            <div className="mt-8">

              <Link
                href={`/${locale}/spaces`}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Spaces
                <span>→</span>
              </Link>

            </div>

          </div>

        </Container>

      </section>

    </>
  );
}