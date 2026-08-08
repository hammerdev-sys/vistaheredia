"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import {
  categoryLabels,
  journalCategories,
  type JournalCategory,
  type JournalPost,
} from "@/lib/content/journal"
import { cn } from "@/lib/utils"

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T00:00:00").toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function JournalGrid({
  posts,
  locale,
  labels,
}: {
  posts: JournalPost[]
  locale: Locale
  labels: { all: string; readMore: string; empty: string; minRead: string }
}) {
  const [active, setActive] = useState<JournalCategory | "all">("all")

  const filtered = useMemo(
    () => (active === "all" ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  )

  const filters: Array<{ id: JournalCategory | "all"; label: string }> = [
    { id: "all", label: labels.all },
    ...journalCategories.map((c) => ({ id: c, label: categoryLabels[c][locale] })),
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Journal categories">
        {filters.map((f) => {
          const isActive = active === f.id
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">{labels.empty}</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link
                href={`/${locale}/journal/${post.slug}`}
                className="relative aspect-[3/2] overflow-hidden rounded-lg bg-charcoal"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="font-semibold uppercase tracking-[0.16em] text-primary">
                  {categoryLabels[post.category][locale]}
                </span>
                <span className="text-muted-foreground">{formatDate(post.date, locale)}</span>
              </div>
              <h3 className="mt-2 text-balance font-serif text-xl leading-snug text-foreground">
                <Link
                  href={`/${locale}/journal/${post.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {post.title[locale]}
                </Link>
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {post.excerpt[locale]}
              </p>
              <Link
                href={`/${locale}/journal/${post.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {labels.readMore}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
