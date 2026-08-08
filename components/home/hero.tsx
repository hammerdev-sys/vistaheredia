import Image from "next/image"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import type { Locale } from "@/lib/i18n/config"
import { CTALink } from "@/components/brand/cta-link"

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src="/images/hero-stadium.png"
        alt="VISTAH Heredia at dusk, integrated with the illuminated Estadio Eladio Rosabal Cordero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:pb-24 lg:px-8">
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
          <CTALink href={`/${locale}/pre-booking`} variant="light" size="lg">
            {t.heroPrebook}
          </CTALink>
          <CTALink href={`/${locale}/story`} variant="light-outline" size="lg">
            {t.heroExplore}
          </CTALink>
        </div>
      </div>
    </section>
  )
}
