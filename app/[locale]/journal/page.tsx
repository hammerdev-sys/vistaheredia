import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { categoryLabels, getSortedPosts } from "@/lib/content/journal"
import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { JournalGrid } from "@/components/journal/journal-grid"

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
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/journal-topping-out.png"
        imageAlt="VISTAH Heredia under construction against the mountains"
      />

      {/* Featured */}
      <section className="bg-background py-14 md:py-20">
        <Container>
          <Link
            href={`/${l}/journal/${featured.slug}`}
            className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={featured.image || "/placeholder.svg"}
                alt={featured.title[l]}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-[0.16em] text-primary">
                  {t.featuredLabel}
                </span>
                <span className="font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {categoryLabels[featured.category][l]}
                </span>
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
                {featured.title[l]}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{formatDate(featured.date, l)}</p>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {featured.excerpt[l]}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-medium text-primary transition-colors group-hover:text-primary/80">
                {t.readArticle}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* All posts, filterable */}
      <section className="border-t border-border bg-secondary/40 py-14 md:py-20">
        <Container>
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">{t.title}</h2>
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
    </>
  )
}
