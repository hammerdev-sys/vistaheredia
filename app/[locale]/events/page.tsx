import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { EventsCalendar } from "@/components/events/events-calendar"
import { getUpcomingEvents } from "@/lib/content/events"

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
    path: "events",
    title: `${dict.events.title} — VISTAH Heredia`,
    description: dict.events.intro,
  })
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.events

  const upcoming = getUpcomingEvents()

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/journal-matchday.png"
        imageAlt={t.title}
      />

      <section className="py-20 md:py-28">
        <Container>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">{t.upcomingTitle}</h2>
          <div className="mt-8">
            <EventsCalendar
              events={upcoming}
              locale={l}
              labels={{
                all: t.allTypes,
                empty: t.empty,
                addToCalendar: t.addToCalendar,
              }}
            />
          </div>
        </Container>
      </section>
    </>
  )
}
