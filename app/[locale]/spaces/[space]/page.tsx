import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Download, Users } from "lucide-react"
import { isLocale, locales, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { spaceDetails } from "@/lib/content/spaces"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { MediaCarousel } from "@/components/media-carousel"
import { CTALink } from "@/components/brand/cta-link"

type SpaceItem = { id: string; name: string; tagline: string; body: string }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(spaceDetails).map((space) => ({ locale, space })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; space: string }>
}): Promise<Metadata> {
  const { locale, space } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const item = (dict.spaces.items as SpaceItem[]).find((s) => s.id === space)
  const detail = spaceDetails[space]
  if (!item || !detail) return {}
  return buildMetadata({
    locale,
    path: `/spaces/${space}`,
    title: `${item.name} — VISTAH Heredia`,
    description: item.body,
    image: detail.gallery[0]?.src ?? "/images/rooftop.png",
  })
}

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; space: string }>
}) {
  const { locale, space } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const detail = spaceDetails[space]
  const item = (dict.spaces.items as SpaceItem[]).find((s) => s.id === space)
  if (!detail || !item) notFound()

  const d = dict.spaceDetail
  const isRooms = space === "rooms"

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b border-border bg-secondary/50 pt-28 pb-10 md:pt-32">
        <Container>
          <Link
            href={`/${l}/spaces`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {d.backToSpaces}
          </Link>
          <div className="mt-6 max-w-3xl">
            <Kicker>{item.tagline}</Kicker>
            <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              {item.name}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery + details */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <Reveal className="lg:col-span-3">
              <MediaCarousel
                items={detail.gallery}
                locale={l}
                labels={{ prev: d.prev, next: d.next }}
                aspect="aspect-[3/2]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </Reveal>

            <Reveal delay={100} className="lg:col-span-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {d.highlightsLabel}
              </h2>
              <ul className="mt-4 space-y-3">
                {detail.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/90">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span className="leading-relaxed">{h[l]}</span>
                  </li>
                ))}
              </ul>

              {detail.capacity && (
                <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {d.capacityLabel}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">
                      {detail.capacity[l]}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <CTALink href={`/${l}/pre-booking`} variant="primary">
                  {isRooms ? dict.rooms.enquire : dict.home.ctaSalesButton}
                </CTALink>
                {detail.brochure && (
                  <a
                    href={detail.brochure.pdf}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    {detail.brochure.label[l]}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Menu */}
      {detail.menu && (
        <section className="border-t border-border bg-secondary/40 py-14 md:py-20">
          <Container>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker>{d.menuTitle}</Kicker>
                {detail.menu.note && (
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    {detail.menu.note[l]}
                  </p>
                )}
              </div>
              {detail.menu.pdf && (
                <a
                  href={detail.menu.pdf}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  {d.downloadMenu}
                </a>
              )}
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-14">
              {detail.menu.sections.map((section, si) => (
                <Reveal key={si} delay={si * 60}>
                  <h3 className="font-serif text-2xl text-foreground">{section.title[l]}</h3>
                  <ul className="mt-5 divide-y divide-border">
                    {section.items.map((mi, ii) => (
                      <li key={ii} className="flex items-baseline justify-between gap-4 py-3">
                        <div>
                          <p className="font-medium text-foreground">{mi.name[l]}</p>
                          {mi.description && (
                            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                              {mi.description[l]}
                            </p>
                          )}
                        </div>
                        {mi.price && (
                          <span className="shrink-0 font-mono text-sm text-primary">{mi.price}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
