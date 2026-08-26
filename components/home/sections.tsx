import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Users, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";
import { Container, SectionHeading, Kicker } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTALink } from "@/components/brand/cta-link";
import { SpaceCard } from "@/components/space-card";

const pillarIcons = [Users, Sparkles, Coffee];

const spaceImages: Record<string, string> = {
  rooms: "/images/guest-room.png",
  lobby: "/images/lobby-cafe.png",
  champions: "/images/champions-corner.png",
  ballroom: "/images/ballroom.png",
  skyroom: "/images/skyroomnew.png",
  rooftop: "/images/rooftop.png",
};

export function Intro({ dict }: { dict: Dictionary }) {
  const t = dict.home;
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
          <Reveal
            delay={120}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
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
  );
}

export function Pillars({ dict }: { dict: Dictionary }) {
  const t = dict.home;

  return (
    <section className="relative overflow-hidden bg-secondary/50 py-24 md:py-32">
      <Container>
        {/* Section Header */}
        <SectionHeading
          kicker={t.pillarsKicker}
          title={t.pillarsTitle}
          align="center"
        />

        {/* Pillars Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Users;

            return (
              <Reveal key={pillar.name} delay={i * 100}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-border/65 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  {/* Top Icon with Pulse/Glow Effect */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Pillar Title */}
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-card-foreground">
                    {pillar.name}
                  </h3>

                  {/* Pillar Description */}
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>

                  {/* Subtle Bottom Accent Line on Hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 rounded-b-2xl bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedSpaces({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.home;
  const featured = dict.spaces.items.slice(0, 3);

  return (
    <section className="bg-background py-20 md:py-28">
      <Container>
        {/* Simple Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            kicker={t.spacesKicker}
            title={t.spacesTitle}
            className="md:max-w-2xl"
          />
         <CTALink 
            href={`/${locale}/spaces`} 
            variant="primary" 
            className="group relative shrink-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.spacesCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </CTALink>
        </div>

        {/* Clean 3-Column Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((space, i) => (
            <Reveal key={space.id} delay={i * 100}>
              <Link
                href={`/${locale}/spaces#${space.id}`}
                className="block h-full"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
                  <SpaceCard
                    name={space.name}
                    tagline={space.tagline}
                    body={space.body}
                    image={spaceImages[space.id]}
                    imageAlt={`${space.name} at VISTAH Heredia`}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function ProgressTeaser({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.home;
  
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Background Image with Parallax-style scale effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/construction-2.png"
          alt="Construction progress of VISTAH Heredia"
          fill
          sizes="100vw"
          className="object-cover transform scale-105 transition-transform duration-1000 hover:scale-100"
        />
      </div>

      {/* Modern Gradient Overlay (Deep charcoal fading to subtle bottom tint) */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />

      {/* Decorative Blur Element */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-2xl">
          {/* Kicker badge style */}
          <div className="inline-block">
            <Kicker tone="light" className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              {t.progressKicker}
            </Kicker>
          </div>

          <h2 className="mt-6 text-balance font-serif text-3xl leading-tight text-cream md:text-5xl lg:text-[3.25rem] tracking-tight">
            {t.progressTitle}
          </h2>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80 md:text-xl">
            {t.progressBody}
          </p>

          <div className="mt-10">
            <CTALink 
              href={`/${locale}/construction`} 
              variant="light" 
              size="lg"
              className="group relative shrink-0 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.progressCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </CTALink>
          </div>
        </div>
      </Container>
    </section>
  );
}
export function DualCta({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.home;

  return (
    <section className="bg-secondary py-20 md:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sales CTA */}
          <Reveal
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-10"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-primary-foreground/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-primary-foreground/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="relative z-10 flex h-full flex-col">
           

              <h3 className="max-w-lg font-serif text-3xl leading-tight md:text-4xl">
                {t.ctaSalesTitle}
              </h3>

              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
                {t.ctaSalesBody}
              </p>

              <div className="mt-auto pt-8">
                <CTALink
                  href={`/${locale}/pre-booking`}
                  variant="light"
                  className="rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {t.ctaSalesButton}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </CTALink>
              </div>
            </div>
          </Reveal>

          {/* Careers CTA */}
          <Reveal
            delay={100}
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-charcoal p-8 text-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-10"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-cream/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-cream/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="relative z-10 flex h-full flex-col">
              

              <h3 className="max-w-lg font-serif text-3xl leading-tight md:text-4xl">
                {t.ctaCareersTitle}
              </h3>

              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-cream/70">
                {t.ctaCareersBody}
              </p>

              <div className="mt-auto pt-8">
                <CTALink
                  href={`/${locale}/careers`}
                  variant="light"
                  className="rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {t.ctaCareersButton}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </CTALink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}