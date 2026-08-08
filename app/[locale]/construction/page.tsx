import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Check } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container, SectionHeading, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { progressUpdates, designRenders } from "@/lib/content/construction"
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
    path: "/construction",
    title: `${dict.construction.title} — VISTAH Heredia`,
    description: dict.construction.intro,
    image: "/images/construction-3.png",
  })
}

export default async function ConstructionPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.construction

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/construction-3.png"
        imageAlt="VISTAH Heredia under construction with facade installation in progress"
      />

      {/* Status banner */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <Container className="flex flex-col items-start gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/80">
            {t.statusLabel}
          </p>
          <p className="font-serif text-xl">{t.status}</p>
        </Container>
      </section>

      {/* Design renders */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.rendersTitle} intro={t.rendersBody} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designRenders.map((render, i) => (
              <Reveal key={render.id} delay={(i % 3) * 80}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={render.image || "/placeholder.svg"}
                    alt={render.label[l]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-4 text-sm font-medium text-cream">
                    {render.label[l]}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Progress gallery */}
      <section className="bg-secondary py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.galleryTitle} intro={t.galleryBody} />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {progressUpdates.map((update, i) => (
              <Reveal key={update.id} delay={(i % 3) * 100}>
                <figure className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={update.image || "/placeholder.svg"}
                      alt={update.alt[l]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {update.date}
                    </p>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {update.caption[l]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.timelineTitle} intro={t.timelineBody} />
          <ol className="mt-12 space-y-0 border-l border-border">
            {t.timeline.map((milestone) => (
              <li key={milestone.date} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={cn(
                    "absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background",
                    milestone.done ? "bg-primary" : "border border-border bg-card",
                  )}
                >
                  {milestone.done && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {milestone.date}
                </p>
                <h3 className="mt-1 font-serif text-xl text-foreground">{milestone.title}</h3>
                <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                  {milestone.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
