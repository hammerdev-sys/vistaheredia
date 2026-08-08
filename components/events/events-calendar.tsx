"use client"

import { useMemo, useState } from "react"
import { CalendarPlus } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import {
  eventTypeLabels,
  eventTypes,
  type CalendarEvent,
  type EventType,
} from "@/lib/content/events"
import { cn } from "@/lib/utils"

function formatMonth(iso: string, locale: Locale) {
  return new Date(iso + "T00:00:00").toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "long",
  })
}

function formatDay(iso: string, locale: Locale) {
  const d = new Date(iso + "T00:00:00")
  return {
    day: d.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", { day: "2-digit" }),
    weekday: d.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", { weekday: "short" }),
  }
}

const typeAccent: Record<EventType, string> = {
  match: "border-primary/40 bg-primary/10 text-primary",
  concert: "border-primary/30 bg-primary/5 text-foreground",
  hotel: "border-foreground/20 bg-secondary text-foreground",
  culture: "border-foreground/20 bg-secondary text-foreground",
}

function toGoogleCalendar(event: CalendarEvent, locale: Locale) {
  const date = event.date.replace(/-/g, "")
  const title = encodeURIComponent(event.title[locale])
  const details = encodeURIComponent(
    [event.venue?.[locale], event.note?.[locale]].filter(Boolean).join(" — "),
  )
  const loc = encodeURIComponent(event.venue?.[locale] ?? "VISTAH Heredia")
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${details}&location=${loc}`
}

export function EventsCalendar({
  events,
  locale,
  labels,
}: {
  events: CalendarEvent[]
  locale: Locale
  labels: { all: string; empty: string; addToCalendar: string }
}) {
  const [active, setActive] = useState<EventType | "all">("all")

  const filtered = useMemo(
    () => (active === "all" ? events : events.filter((e) => e.type === active)),
    [active, events],
  )

  const groups = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const e of filtered) {
      const key = e.date.slice(0, 7)
      const list = map.get(key) ?? []
      list.push(e)
      map.set(key, list)
    }
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))
  }, [filtered])

  const filters: Array<{ id: EventType | "all"; label: string }> = [
    { id: "all", label: labels.all },
    ...eventTypes.map((t) => ({ id: t, label: eventTypeLabels[t][locale] })),
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Event types">
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
        <div className="mt-12 flex flex-col gap-14">
          {groups.map(([monthKey, list]) => (
            <div key={monthKey}>
              <h2 className="font-serif text-2xl text-foreground capitalize">
                {formatMonth(list[0].date, locale)}
              </h2>
              <ul className="mt-6 divide-y divide-border border-t border-border">
                {list.map((event) => {
                  const { day, weekday } = formatDay(event.date, locale)
                  return (
                    <li
                      key={event.id}
                      className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8"
                    >
                      <div className="flex w-16 shrink-0 flex-col items-center rounded-lg bg-secondary py-3 text-center">
                        <span className="font-serif text-2xl leading-none text-foreground">
                          {day}
                        </span>
                        <span className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                          {weekday}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={cn(
                              "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
                              typeAccent[event.type],
                            )}
                          >
                            {eventTypeLabels[event.type][locale]}
                          </span>
                          {event.time && (
                            <span className="text-sm font-medium text-muted-foreground">
                              {event.time}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-balance font-serif text-xl text-foreground">
                          {event.title[locale]}
                        </h3>
                        {event.venue && (
                          <p className="mt-1 text-sm text-muted-foreground">{event.venue[locale]}</p>
                        )}
                        {event.note && (
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                            {event.note[locale]}
                          </p>
                        )}
                      </div>

                      <a
                        href={toGoogleCalendar(event, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:self-center"
                      >
                        <CalendarPlus className="h-4 w-4" aria-hidden />
                        {labels.addToCalendar}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
