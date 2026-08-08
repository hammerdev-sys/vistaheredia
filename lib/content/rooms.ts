import type { LocalizedText, MediaItem } from "./types"

/**
 * EDITABLE CONTENT — Room types / Accommodation.
 *
 * To add or edit a room type: update an entry below with bilingual name,
 * description, a list of feature bullets, and a gallery of images/videos
 * (used by the carousel). Set `active: false` to hide a room type.
 */

export type RoomType = {
  id: string
  active: boolean
  name: LocalizedText
  tagline: LocalizedText
  description: LocalizedText
  /** e.g. { en: "32 m² · King", es: "32 m² · King" } */
  size: LocalizedText
  sleeps: LocalizedText
  features: LocalizedText[]
  gallery: MediaItem[]
}

export const roomTypes: RoomType[] = [
  {
    id: "signature-king",
    active: true,
    name: { en: "Signature King", es: "Signature King" },
    tagline: { en: "The everyday elevated", es: "Lo cotidiano elevado" },
    description: {
      en: "A warm, contemporary room layered in natural wood, ceramic greens, and woven textures — the VISTAH signature. Floor-to-ceiling windows frame the city and mountains beyond.",
      es: "Una habitación cálida y contemporánea en capas de madera natural, verdes cerámicos y texturas tejidas — el sello de VISTAH. Ventanales de piso a techo enmarcan la ciudad y las montañas.",
    },
    size: { en: "32 m²", es: "32 m²" },
    sleeps: { en: "Sleeps 2", es: "Para 2" },
    features: [
      { en: "King bed with premium linens", es: "Cama King con ropa de cama premium" },
      { en: "City & mountain views", es: "Vistas a la ciudad y montañas" },
      { en: "Costa Rican coffee station", es: "Estación de café costarricense" },
      { en: "Rain shower & local amenities", es: "Ducha tipo lluvia y amenidades locales" },
    ],
    gallery: [
      { type: "image", src: "/images/guest-room.png", alt: { en: "Signature King room interior", es: "Interior de la habitación Signature King" } },
      { type: "image", src: "/images/room-signature.png", alt: { en: "Signature King seating and window", es: "Sala y ventanal de la Signature King" } },
    ],
  },
  {
    id: "stadium-view",
    active: true,
    name: { en: "Stadium View Room", es: "Habitación Vista al Estadio" },
    tagline: { en: "Rest with a view of the game", es: "Descansa con vista al juego" },
    description: {
      en: "Positioned toward the pitch, these rooms turn match day into a private grandstand. Soundproofing keeps the calm when you want it, and the roar close when you don't.",
      es: "Orientadas hacia la cancha, estas habitaciones convierten el día de partido en una gradería privada. La insonorización mantiene la calma cuando la quieres, y el rugido cerca cuando no.",
    },
    size: { en: "34 m²", es: "34 m²" },
    sleeps: { en: "Sleeps 2", es: "Para 2" },
    features: [
      { en: "Direct stadium sightlines", es: "Vistas directas al estadio" },
      { en: "Enhanced soundproofing", es: "Insonorización reforzada" },
      { en: "King or twin configuration", es: "Configuración King o dos camas" },
      { en: "Smart lighting & blackout drapes", es: "Iluminación inteligente y cortinas blackout" },
    ],
    gallery: [
      { type: "image", src: "/images/room-stadium-suite.png", alt: { en: "Stadium View room overlooking the pitch", es: "Habitación con vista a la cancha" } },
      { type: "image", src: "/images/guest-room.png", alt: { en: "Stadium View room interior", es: "Interior de la habitación con vista al estadio" } },
    ],
  },
  {
    id: "corner-suite",
    active: true,
    name: { en: "Corner Suite", es: "Suite de Esquina" },
    tagline: { en: "Room to gather", es: "Espacio para reunirse" },
    description: {
      en: "A spacious corner suite with a separate lounge, wraparound views, and room to host. Ideal for longer stays, families, and travelers who want space to spread out.",
      es: "Una amplia suite de esquina con sala independiente, vistas envolventes y espacio para recibir. Ideal para estadías largas, familias y viajeros que buscan más amplitud.",
    },
    size: { en: "52 m²", es: "52 m²" },
    sleeps: { en: "Sleeps 3", es: "Para 3" },
    features: [
      { en: "Separate living area", es: "Sala de estar independiente" },
      { en: "Wraparound corner windows", es: "Ventanales de esquina envolventes" },
      { en: "Wet bar & lounge seating", es: "Barra húmeda y sala de estar" },
      { en: "Premium bath with soaking tub", es: "Baño premium con tina" },
    ],
    gallery: [
      { type: "image", src: "/images/room-corner-suite.png", alt: { en: "Corner Suite living area", es: "Sala de la Suite de Esquina" } },
      { type: "image", src: "/images/room-signature.png", alt: { en: "Corner Suite bedroom", es: "Dormitorio de la Suite de Esquina" } },
    ],
  },
  {
    id: "accessible-king",
    active: true,
    name: { en: "Accessible King", es: "King Accesible" },
    tagline: { en: "Comfort without compromise", es: "Comodidad sin concesiones" },
    description: {
      en: "Thoughtfully designed for full accessibility, with step-free layouts, a roll-in shower, and lowered fixtures — delivering the same warmth and views as every VISTAH room.",
      es: "Diseñada cuidadosamente para plena accesibilidad, con distribución sin desniveles, ducha de acceso rodado y accesorios a menor altura — con la misma calidez y vistas de cada habitación VISTAH.",
    },
    size: { en: "36 m²", es: "36 m²" },
    sleeps: { en: "Sleeps 2", es: "Para 2" },
    features: [
      { en: "Step-free, wheelchair-friendly layout", es: "Distribución sin desniveles y accesible" },
      { en: "Roll-in shower with grab bars", es: "Ducha de acceso rodado con barras de apoyo" },
      { en: "Lowered fixtures & controls", es: "Accesorios y controles a menor altura" },
      { en: "Visual & audible alerts", es: "Alertas visuales y sonoras" },
    ],
    gallery: [
      { type: "image", src: "/images/guest-room.png", alt: { en: "Accessible King room", es: "Habitación King Accesible" } },
    ],
  },
]

export function getActiveRoomTypes(): RoomType[] {
  return roomTypes.filter((r) => r.active)
}
