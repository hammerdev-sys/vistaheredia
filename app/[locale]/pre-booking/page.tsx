import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Info, BedDouble, PartyPopper } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
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
  const dict = getDictionary(locale as Locale)
  const t = dict.sales

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/ballroom.png"
        imageAlt="Sixth-floor ballroom with panoramic stadium views at VISTAH Heredia"
      />

      <section className="bg-background py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Opportunities */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BedDouble className="h-5 w-5" />
                </span>
                <h2 className="font-serif text-2xl text-card-foreground">{t.roomsTitle}</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">{t.roomsBody}</p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <PartyPopper className="h-5 w-5" />
                </span>
                <h2 className="font-serif text-2xl text-card-foreground">{t.eventsTitle}</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">{t.eventsBody}</p>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border bg-secondary p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.note}</p>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-lg border border-border bg-card p-7 md:p-9">
              <h2 className="font-serif text-2xl text-card-foreground">{t.formTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.formSubtitle}</p>
              <div className="mt-8">
                <InquiryForm dict={dict} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
