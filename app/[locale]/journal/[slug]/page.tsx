import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { isLocale, locales, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { categoryLabels, getPost, getSortedPosts } from "@/lib/content/journal"
import { Container, Kicker } from "@/components/section"

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getSortedPosts().map((post) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = getPost(slug)
  if (!post) return {}
  return buildMetadata({
    locale,
    path: `/journal/${slug}`,
    title: `${post.title[locale]} — VISTAH Heredia`,
    description: post.excerpt[locale],
    image: post.image,
  })
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T00:00:00").toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)
  const t = dict.journal
  const post = getPost(slug)
  if (!post) notFound()

  const related = getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="bg-background">
      {/* Hero image */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-charcoal md:h-[52vh]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title[l]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/20" />
      </div>

      <article className="relative">
        <Container className="max-w-3xl">
          <div className="-mt-20 rounded-lg border border-border bg-background p-6 shadow-sm md:-mt-24 md:p-10">
            <Link
              href={`/${l}/journal`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t.backToJournal}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="font-semibold uppercase tracking-[0.16em] text-primary">
                {categoryLabels[post.category][l]}
              </span>
              <span className="text-muted-foreground">{formatDate(post.date, l)}</span>
              <span className="text-muted-foreground">
                {t.by} {post.author[l]}
              </span>
            </div>

            <h1 className="mt-4 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {post.title[l]}
            </h1>

            <div className="mt-8 space-y-6">
              {post.body.map((para, i) => (
                <p key={i} className="text-pretty text-lg leading-relaxed text-foreground/85">
                  {para[l]}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </article>

      {/* Related */}
      <section className="mt-16 border-t border-border bg-secondary/40 py-14 md:py-20">
        <Container>
          <Kicker>{t.relatedTitle}</Kicker>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rp) => (
              <article key={rp.slug} className="group flex flex-col">
                <Link
                  href={`/${l}/journal/${rp.slug}`}
                  className="relative aspect-[3/2] overflow-hidden rounded-lg bg-charcoal"
                >
                  <Image
                    src={rp.image || "/placeholder.svg"}
                    alt={rp.title[l]}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {categoryLabels[rp.category][l]}
                </span>
                <h3 className="mt-2 text-balance font-serif text-lg leading-snug text-foreground">
                  <Link
                    href={`/${l}/journal/${rp.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {rp.title[l]}
                  </Link>
                </h3>
                <Link
                  href={`/${l}/journal/${rp.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {t.readMore}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
