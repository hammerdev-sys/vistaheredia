import type { LocalizedText } from "./types"

/**
 * EDITABLE CONTENT — Events & Match Calendar.
 *
 * Covers stadium matches, hotel events, concerts, and cultural happenings.
 *
 * HOW TO UPDATE THE CALENDAR:
 *   - Add an entry with an ISO `date` (and optional `time`).
 *   - Choose a `type`: "match" | "concert" | "hotel" | "culture".
 *   - Provide bilingual `title` and optional `venue` / `note`.
 *   - Past-dated entries are hidden automatically by getUpcomingEvents().
 */

export const eventTypes = ["match", "concert", "hotel", "culture"] as const
export type EventType = (typeof eventTypes)[number]

export const eventTypeLabels: Record<EventType, LocalizedText> = {
  match: { en: "Match", es: "Partido" },
  concert: { en: "Concert", es: "Concierto" },
  hotel: { en: "Hotel event", es: "Evento del hotel" },
  culture: { en: "Culture", es: "Cultura" },
}

export type CalendarEvent = {
  id: string
  date: string // ISO date, e.g. "2027-11-14"
  time?: string // display time, e.g. "7:00 PM"
  type: EventType
  title: LocalizedText
  venue?: LocalizedText
  note?: LocalizedText
}

export const events: CalendarEvent[] = [
  {
    id: "opening-week-gala",
    date: "2027-11-05",
    time: "7:00 PM",
    type: "hotel",
    title: { en: "Grand Opening Gala", es: "Gala de Gran Apertura" },
    venue: { en: "Sixth-floor Ballroom", es: "Salón del Sexto Piso" },
    note: { en: "An invitation-only celebration to open VISTAH's doors.", es: "Una celebración solo por invitación para abrir las puertas de VISTAH." },
  },
  {
    id: "herediano-home-nov",
    date: "2027-11-14",
    time: "8:00 PM",
    type: "match",
    title: { en: "C.S. Herediano vs. Rival (Home)", es: "C.S. Herediano vs. Rival (Local)" },
    venue: { en: "Estadio Eladio Rosabal Cordero", es: "Estadio Eladio Rosabal Cordero" },
  },
  {
    id: "rooftop-sessions-nov",
    date: "2027-11-21",
    time: "6:00 PM",
    type: "concert",
    title: { en: "Rooftop Sessions: Live Music", es: "Rooftop Sessions: Música en Vivo" },
    venue: { en: "Rooftop", es: "Azotea" },
    note: { en: "Sunset DJ and live sets by the pool.", es: "DJ al atardecer y sets en vivo junto a la piscina." },
  },
  {
    id: "coffee-culture-day",
    date: "2027-11-28",
    time: "10:00 AM",
    type: "culture",
    title: { en: "Coffee Culture Day", es: "Día de la Cultura del Café" },
    venue: { en: "Lobby & Coffee Shop", es: "Lobby y Cafetería" },
    note: { en: "Tastings with regional growers.", es: "Catas con productores regionales." },
  },
  {
    id: "herediano-home-dec",
    date: "2027-12-05",
    time: "5:00 PM",
    type: "match",
    title: { en: "C.S. Herediano vs. Rival (Home)", es: "C.S. Herediano vs. Rival (Local)" },
    venue: { en: "Estadio Eladio Rosabal Cordero", es: "Estadio Eladio Rosabal Cordero" },
  },
]

export function getUpcomingEvents(from: Date = new Date()): CalendarEvent[] {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  return [...events]
    .filter((e) => new Date(e.date) >= start)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}
