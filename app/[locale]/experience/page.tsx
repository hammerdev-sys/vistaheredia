import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { experienceHighlights } from "@/lib/content/experience"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { cn } from "@/lib/utils"

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
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/experience-hero.png"
        imageAlt="Panoramic view over Heredia, its stadium, and the surrounding mountains"
      />

      <div className="bg-background">
        {experienceHighlights.map((item, i) => {
          const reversed = i % 2 === 1
          return (
            <section
              key={item.id}
              id={item.id}
              className={cn("scroll-mt-24 py-16 md:py-24", reversed && "bg-secondary")}
            >
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-lg",
                      reversed && "lg:order-2",
                    )}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title[l]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Reveal>
                  <Reveal delay={100} className={cn(reversed && "lg:order-1")}>
                    <Kicker>{item.kicker[l]}</Kicker>
                    <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                      {item.title[l]}
                    </h2>
                    <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                      {item.body[l]}
                    </p>
                  </Reveal>
                </div>
              </Container>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-balance font-serif text-3xl text-cream md:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-cream/80">{t.ctaBody}</p>
            <div className="mt-8">
              <CTALink href={`/${l}/pre-booking`} variant="light" size="lg">
                {t.ctaButton}
              </CTALink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
