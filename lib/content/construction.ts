import type { Locale } from "@/lib/i18n/config"

/**
 * EDITABLE CONTENT — Construction progress gallery.
 *
 * To add a new construction update:
 *   1. Add the photo to /public/images/ (e.g. construction-4.png).
 *   2. Add a new entry to the top of `progressUpdates` below.
 *   3. Provide a date, image path, and a caption in BOTH languages.
 *
 * This is the MDX/Git-based content workflow chosen for launch. When the site
 * migrates to a headless CMS (Sanity/Contentful) closer to 2027, this array is
 * replaced by a CMS query returning the same shape.
 */

export type LocalizedText = Record<Locale, string>

export type ProgressUpdate = {
  id: string
  date: string // ISO-ish display date, kept locale-neutral for simplicity
  image: string
  alt: LocalizedText
  caption: LocalizedText
}

export const progressUpdates: ProgressUpdate[] = [
  {
    id: "facade-2026-q3",
    date: "September 2026",
    image: "/images/construction-3.png",
    alt: {
      en: "Facade cladding and glass curtain wall nearing completion",
      es: "Revestimiento de fachada y muro cortina de vidrio casi terminados",
    },
    caption: {
      en: "Facade installation advances — warm wood cladding and ceramic-green panels define VISTAH's identity, with the rooftop taking shape.",
      es: "Avanza la instalación de la fachada: el revestimiento de madera cálida y los paneles verde cerámica definen la identidad de VISTAH, mientras la azotea toma forma.",
    },
  },
  {
    id: "envelope-2026-q1",
    date: "February 2026",
    image: "/images/construction-2.png",
    alt: {
      en: "Superstructure topped out with facade beginning on lower floors",
      es: "Superestructura culminada con la fachada iniciando en los pisos inferiores",
    },
    caption: {
      en: "The structure is topped out and the building envelope begins, with the first cladding and glazing rising on the lower floors beside the stadium.",
      es: "La estructura está culminada y comienza la envolvente del edificio, con los primeros revestimientos y acristalamientos en los pisos inferiores junto al estadio.",
    },
  },
  {
    id: "structure-2025-q4",
    date: "November 2025",
    image: "/images/construction-1.png",
    alt: {
      en: "Concrete superstructure rising with tower crane on site",
      es: "Superestructura de concreto en ascenso con grúa torre en el sitio",
    },
    caption: {
      en: "Concrete floor plates and columns rise floor by floor as the superstructure takes its full height alongside the stadium development.",
      es: "Las losas y columnas de concreto se elevan piso por piso mientras la superestructura alcanza su altura total junto al desarrollo del estadio.",
    },
  },
]


/** Design renders shown on the construction page. */
export const designRenders: { id: string; image: string; label: LocalizedText }[] = [
  { id: "exterior", image: "/images/Lateral1.png", label: { en: "Exterior", es: "Exterior" } },
  { id: "lobby", image: "/images/lobbyandcoffee.png", label: { en: "Lobby & Coffee", es: "Lobby y Café" } },
  { id: "room", image: "/images/guest-room.jpg", label: { en: "Guest Room", es: "Habitación" } },
  { id: "ballroom", image: "/images/ballroom3.png", label: { en: "Ballroom", es: "Salón de Eventos" } },
  { id: "skyroom", image: "/images/Skyroomnew.png", label: { en: "Skyroom", es: "Skyroom" } },
  { id: "rooftop", image: "/images/AZO_PISCINA .jpg", label: { en: "Rooftop", es: "Azotea" } },
]
