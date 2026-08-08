import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { getActiveJobs } from "@/lib/content/jobs"
import { PageHero } from "@/components/page-hero"
import { Container, SectionHeading } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { JobsSection } from "@/components/careers/jobs-section"

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
    path: "/careers",
    title: `${dict.careers.title} — VISTAH Heredia`,
    description: dict.careers.intro,
    image: "/images/champions-corner.png",
  })
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.careers
  const jobs = getActiveJobs()

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/champions-corner.png"
        imageAlt="The energetic Champions Corner social lounge at VISTAH Heredia"
      />

      {/* Why VISTAH */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.whyTitle} tone="light" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.why.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-lg border border-cream/15 bg-cream/[0.04] p-8">
                  <h3 className="font-serif text-2xl text-cream">{item.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-cream/75">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <JobsSection dict={dict} locale={l} jobs={jobs} />
    </>
  )
}
