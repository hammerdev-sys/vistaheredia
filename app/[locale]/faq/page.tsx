import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { faqs } from "@/lib/content/faq"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"

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
    path: "/faq",
    title: `${dict.faq.title} — VISTAH Heredia`,
    description: dict.faq.intro,
    image: "/images/experience-hero.png",
  })
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.faq

  // FAQPage structured data for SEO.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question[l],
      acceptedAnswer: { "@type": "Answer", text: f.answer[l] },
    })),
  }

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/experience-hero.png"
        imageAlt="View across Heredia and the surrounding mountains"
      />

      <section className="bg-background py-14 md:py-20">
        <Container className="max-w-3xl">
          <div className="divide-y divide-border">
            {faqs.map((item, i) => (
              <Reveal key={item.id} delay={i * 50}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-xl leading-snug text-foreground">
                      {item.question[l]}
                    </span>
                    <span
                      className="mt-1 shrink-0 text-2xl leading-none text-primary transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                    {item.answer[l]}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-lg border border-border bg-secondary/50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-xl text-foreground">{t.stillQuestions}</p>
            <CTALink href={`/${l}/contact`} variant="primary">
              {t.contactUs}
            </CTALink>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
