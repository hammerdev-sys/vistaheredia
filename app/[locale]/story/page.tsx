import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

import { PageHero } from "@/components/page-hero";
import { Container, SectionHeading, Kicker } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTALink } from "@/components/brand/cta-link";

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
    <main className="flex flex-col min-h-screen">
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src="/images/vistah-story.jpeg"
          alt="Heredia city and surrounding mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:pb-24 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.28em] text-champagne">
                {t.heroKicker}
              </p>

              <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-cream md:text-6xl lg:text-7xl">
                {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-xl text-pretty font-sans text-lg leading-relaxed text-cream/85">
                {t.heroSubtitle}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <CTALink
                  href={`/${locale}/pre-booking`}
                  variant="light"
                  size="lg"
                >
                  {t.heroPrebook}
                </CTALink>

                <CTALink
                  href={`/${locale}/story`}
                  variant="light-outline"
                  size="lg"
                >
                  {t.heroExplore}
                </CTALink>
              </div>
            </div>

            {/* Right Logo */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/logo1.png"
                alt="VISTAH"
                className="h-40 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:h-56 lg:h-90"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="story-acronym"
        className="relative overflow-hidden bg-background py-20 md:py-32 scroll-mt-24"
      >
        <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <Container className="relative z-10">
          <SectionHeading
            kicker={t.acronymTitle}
            title={t.title}
            className="sr-only"
          />
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4">
 
  <h2 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-foreground  sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
    {t.whatIsVistah2}
  </h2>
  <div className="mt-4 h-1.5 w-16 mx-auto bg-primary rounded-full" />
</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.acronym.map((item, i) => (
              <Reveal key={item.letter} delay={i * 60} className="h-full">
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
         PAGE HERO
      ===================================================== */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/view3.jpeg"
        imageAlt="Heredia, the City of Flowers, at golden hour"
      />

      {/* =====================================================
         MEANING OF VISTAH (ACRONYM)
      ===================================================== */}

      {/* =====================================================
         VISTAH IN CONTEXT — MAP
      ===================================================== */}
      <section className="overflow-hidden bg-[#f3efe7] py-16 md:py-20">
        <Container>
          <SectionHeading
            kicker={t.mapsKicker}
            title={t.mapsTitle}
            align="center"
          />
          <Reveal className="mt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-sm md:aspect-[21/9]">
              <iframe
                title="VISTAH Heredia location on Google Maps"
                src="https://www.google.com/maps?q=Estadio+Eladio+Rosabal+Cordero,+Heredia,+Costa+Rica&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
         HOTEL VIEWS
      ===================================================== */}
      <section className="bg-background py-24 md:py-32">
        <Container>
          <SectionHeading
            kicker={t.hotelViewsKicker}
            title={t.hotelViewsTitle}
            align="center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-muted-foreground">
            {t.hotelViewsBody}
          </p>
          <div className="mt-14 flex flex-col flex-wrap gap-5 sm:flex-row">
            {t.hotelViews.map((view, i) => (
              <Reveal
                key={view.image}
                delay={i * 80}
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={view.image}
                    alt={view.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-cream">
                      {view.badge}
                    </p>
                    <p className="mt-1 font-serif text-lg text-cream/90 md:text-xl">
                      {view.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
         STADIUM CONNECTION
      ===================================================== */}
      <section className="overflow-hidden bg-background">
        <div className="relative min-h-[700px] overflow-hidden md:min-h-[760px]">
          {/* Background Image */}
          <Image
            src="/images/stadium-connection.png"
            alt="VISTAH Heredia integrated with the stadium and surrounding landscape"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/35" />

          {/* Main Content */}
          <Container className="relative z-10 min-h-[700px] md:min-h-[760px]">
            <div className="flex min-h-[700px] items-center py-20 md:min-h-[760px] md:py-24">
              <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
                {/* LEFT CONTENT */}
                <div className="max-w-2xl">
                  <Kicker
                    tone="light"
                    className="mb-4 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md"
                  >
                    {t.stadiumKicker}
                  </Kicker>

                  <h2 className="mt-4 max-w-xl text-balance font-serif text-4xl leading-tight tracking-tight text-cream md:text-5xl lg:text-[3.5rem]">
                    {t.stadiumTitle}
                  </h2>

                  {/* Paragraphs */}
                  <div className="mt-7 max-w-xl space-y-5 text-pretty text-base leading-relaxed text-cream/85 md:text-lg">
                    {t.stadiumBody.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Spaces */}
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {t.stadiumSpaces.map((space) => (
                      <span
                        key={space}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-cream/90 backdrop-blur-sm"
                      >
                        {space}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      href={`/${locale}/contact`}
                      className="group inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-3.5 text-sm font-medium text-charcoal transition-all duration-300 hover:bg-cream hover:shadow-lg hover:shadow-champagne/20 active:scale-95"
                    >
                      <span>{t.discoverSpaces}</span>

                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* RIGHT IMAGE + INFO CARDS */}
                <div className="hidden space-y-5 lg:block">
                  {/* CARD 01 */}
                  <div className="group overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-[150px_1fr]">
                      <div className="relative h-full min-h-[145px] overflow-hidden">
                        <Image
                          src="/images/stadium3.png"
                          alt="Stadium match night atmosphere"
                          fill
                          sizes="150px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-col justify-center p-5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                          {t.stadiumCard1Label}
                        </span>

                        <h3 className="mt-2 font-serif text-xl text-cream">
                          {t.stadiumCard1Title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-cream/70">
                          {t.stadiumCard1Body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 02 */}
                  <div className="group overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-[150px_1fr]">
                      <div className="relative h-full min-h-[145px] overflow-hidden">
                        <Image
                          src="/images/stadium2.png"
                          alt="Stadium concert and event atmosphere"
                          fill
                          sizes="150px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-col justify-center p-5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                          {t.stadiumCard2Label}
                        </span>

                        <h3 className="mt-2 font-serif text-xl text-cream">
                          {t.stadiumCard2Title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-cream/70">
                          {t.stadiumCard2Body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <Reveal key={value.name} delay={i * 80} className="h-full">
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
              <Reveal key={trait} delay={index * 40}>
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
                    <dt className="text-sm text-cream/70">{point.label}</dt>
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
            <Kicker>{t.finalCtaKicker}</Kicker>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              {t.finalCtaTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.finalCtaBody}
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/spaces`}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t.exploreSpaces}
                <span>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
