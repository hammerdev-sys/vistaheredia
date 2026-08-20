import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Clock, Sparkles } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { categoryLabels, getSortedPosts } from "@/lib/content/journal"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { JournalGrid } from "@/components/home/journal/journal-grid"
import { Reveal } from "@/components/reveal"

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
    path: "/journal",
    title: `${dict.journal.title} — VISTAH Heredia`,
    description: dict.journal.intro,
    image: "/images/journal-topping-out.png",
  })
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T00:00:00").toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.journal

  const sorted = getSortedPosts()
  const featured = sorted.find((p) => p.featured) ?? sorted[0]
  const rest = sorted.filter((p) => p.slug !== featured.slug)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/journal-topping-out.png"
        imageAlt="VISTAH Heredia under construction against the mountains"
      />

      {/* Featured Article Section */}
      <section className="bg-background py-24 md:py-36 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <Reveal>
            <Link
              href={`/${l}/journal/${featured.slug}`}
              className="group grid gap-12 lg:grid-cols-12 lg:items-center rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 md:p-12 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:bg-card"
            >
              <div className="relative aspect-[16/10] lg:col-span-7 overflow-hidden rounded-2xl bg-charcoal shadow-md">
                <Image
                  src={featured.image || "/placeholder.svg"}
                  alt={featured.title[l]}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-primary">
                    <Sparkles className="h-3 w-3" />
                    {t.featuredLabel}
                  </span>
                  <span className="font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {categoryLabels[featured.category][l]}
                  </span>
                </div>

                <h2 className="text-balance font-serif text-3xl leading-tight text-card-foreground md:text-4xl tracking-tight transition-colors group-hover:text-primary">
                  {featured.title[l]}
                </h2>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>{formatDate(featured.date, l)}</span>
                </div>

                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground font-light">
                  {featured.excerpt[l]}
                </p>

                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 group-hover:bg-primary/90 group-hover:shadow-lg">
                    <span>{t.readArticle}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* All Posts Filterable Grid Section */}
      <section className="border-t border-border/80 bg-secondary/40 py-24 md:py-36 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-xl mb-16">
            <Kicker className="mb-3 inline-block">{t.kicker}</Kicker>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
              {t.title}
            </h2>
          </div>

          <div className="mt-10">
            <JournalGrid
              posts={rest}
              locale={l}
              labels={{
                all: t.allCategories,
                readMore: t.readMore,
                empty: t.empty,
                minRead: t.minRead,
              }}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}