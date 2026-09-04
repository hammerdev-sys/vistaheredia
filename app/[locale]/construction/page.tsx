import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Check, Layers, Clock, Sparkles } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { PageHero } from "@/components/page-hero"
import { Container, SectionHeading } from "@/components/section"
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
<div className="flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
  <PageHero
    kicker={t.kicker}
    title={t.title}
    intro={t.intro}
    image="/images/Principal3.png"
    imageAlt="VISTAH Heredia under construction with facade installation in progress"
  />


      {/* Status Banner */}
    <section className="border-b border-border bg-primary text-primary-foreground">
        <Container className="flex flex-col items-start gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/80">
            {t.statusLabel}
          </p>
          <p className="font-serif text-xl">{t.status}</p>
        </Container>
      </section>

      {/* Design Renders Section */}
      <section className="bg-background py-24 md:py-36">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.rendersTitle} intro={t.rendersBody} />
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {designRenders.map((render, i) => (
              <Reveal key={render.id} delay={(i % 3) * 80} className="h-full">
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl">
                  <Image
                    src={render.image || "/placeholder.svg"}
                    alt={render.label[l]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm font-medium text-cream flex items-center justify-between">
                    <span>{render.label[l]}</span>
                    <span className="h-2 w-2 rounded-full bg-champagne opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Progress Gallery */}
      {/* <section className="bg-secondary/40 py-24 md:py-36 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <SectionHeading kicker={t.kicker} title={t.galleryTitle} intro={t.galleryBody} />
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {progressUpdates.map((update, i) => (
              <Reveal key={update.id} delay={(i % 3) * 100} className="h-full">
                <figure className="group flex flex-col h-full overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={update.image || "/placeholder.svg"}
                      alt={update.alt[l]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="flex flex-col flex-grow p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {update.date}
                      </p>
                    </div>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground font-light">
                      {update.caption[l]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section> */}

      {/* Timeline */}
      <section className="bg-background py-24 md:py-36">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.timelineTitle} intro={t.timelineBody} />
          
          <div className="mt-16 max-w-4xl mx-auto">
            <ol className="relative space-y-8 border-l border-border/80 ml-4 md:ml-6">
              {t.timeline.map((milestone) => (
                <li key={milestone.date} className="relative pl-8 md:pl-10">
                  <span
                    className={cn(
                      "absolute -left-[9px] md:-left-[11px] top-1.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full ring-4 ring-background transition-transform duration-300 hover:scale-110",
                      milestone.done 
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" 
                        : "border-2 border-border bg-card",
                    )}
                  >
                    {milestone.done && <Check className="h-3 w-3" />}
                  </span>

                  <div className="rounded-2xl border border-border/60 bg-card/60 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                      {milestone.date}
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-card-foreground tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground text-sm md:text-base font-light">
                      {milestone.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </div>
  )
}