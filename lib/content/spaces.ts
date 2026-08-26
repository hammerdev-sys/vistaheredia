import type { LocalizedText, MediaItem } from "./types"

/**
 * EDITABLE CONTENT — Detailed public areas & venues.
 *
 * Keyed by the same space `id` used in the dictionaries (spaces.items):
 *   rooms · lobby · champions · ballroom · skyroom · rooftop
 *
 * Each detail adds a media gallery (carousel), highlight bullets, an optional
 * capacity note, an optional web menu, and an optional downloadable PDF menu.
 *
 * To edit a venue: update its gallery images, highlight bullets, or menu
 * sections below. To swap the PDF menu, replace the file in /public/menus and
 * keep the same path, or point `pdf` to a new file.
 */

export type MenuItem = {
  name: LocalizedText
  description?: LocalizedText
  price?: string
}

export type MenuSection = {
  title: LocalizedText
  items: MenuItem[]
}

export type SpaceMenu = {
  note?: LocalizedText
  sections: MenuSection[]
  /** Path to a downloadable PDF menu under /public. */
  pdf?: string
}

export type SpaceDetail = {
  id: string
  gallery: MediaItem[]
  highlights: LocalizedText[]
  capacity?: LocalizedText
  menu?: SpaceMenu
  /** A downloadable PDF that is not a food menu (e.g. an events kit). */
  brochure?: { label: LocalizedText; pdf: string }
}

export const spaceDetails: Record<string, SpaceDetail> = {
  skyroom: {
    id: "skyroom",
    gallery: [
      { type: "image", src: "/images/Skyroomnew.png", alt: { en: "Skyroom lounge at dusk", es: "Lounge Skyroom al atardecer" } },
      { type: "image", src: "/images/skyroomnew.png", alt: { en: "Skyroom bar and seating", es: "Barra y sala del Skyroom" } },
      { type: "image", src: "/images/AZO_PISCINA .jpg", alt: { en: "Views from the Skyroom", es: "Vistas desde el Skyroom" } },
    ],
    highlights: [
      { en: "Upper-floor lounge & cocktail bar", es: "Lounge y bar de cócteles en pisos superiores" },
      { en: "Panoramic stadium and mountain views", es: "Vistas panorámicas al estadio y las montañas" },
      { en: "Moody, layered, sophisticated design", es: "Diseño envolvente, en capas y sofisticado" },
    ],
    menu: {
      note: {
        en: "A concise list of signature cocktails and small plates. Menu evolves seasonally.",
        es: "Una lista concisa de cócteles de autor y platos pequeños. El menú cambia por temporada.",
      },
      pdf: "/menus/skyroom-menu.pdf",
      sections: [
        {
          title: { en: "Signature Cocktails", es: "Cócteles de Autor" },
          items: [
            { name: { en: "City of Flowers", es: "Ciudad de las Flores" }, description: { en: "Guaro, hibiscus, lime, cane", es: "Guaro, flor de jamaica, limón, caña" }, price: "₡5,900" },
            { name: { en: "Barva Sour", es: "Barva Sour" }, description: { en: "Aged rum, tamarind, bitters", es: "Ron añejo, tamarindo, amargos" }, price: "₡6,400" },
            { name: { en: "Cafetal Old Fashioned", es: "Cafetal Old Fashioned" }, description: { en: "Coffee-washed whiskey, cacao", es: "Whisky infusionado en café, cacao" }, price: "₡6,900" },
          ],
        },
        {
          title: { en: "Small Plates", es: "Platos Pequeños" },
          items: [
            { name: { en: "Chifrijo VISTAH", es: "Chifrijo VISTAH" }, description: { en: "Beans, pork, pico, chicharrón", es: "Frijoles, cerdo, pico, chicharrón" }, price: "₡5,200" },
            { name: { en: "Plantain & queso", es: "Plátano y queso" }, description: { en: "Sweet plantain, Turrialba cheese", es: "Plátano maduro, queso Turrialba" }, price: "₡4,300" },
          ],
        },
      ],
    },
  },
  champions: {
    id: "champions",
    gallery: [
      { type: "image", src: "/images/champions-corner.png", alt: { en: "Champions Corner social bar", es: "Bar social Champions Corner" } },
      { type: "image", src: "/images/champions-2.png", alt: { en: "Champions Corner on match day", es: "Champions Corner en día de partido" } },
    ],
    highlights: [
      { en: "Energetic sports bar & social lounge", es: "Bar deportivo enérgico y lounge social" },
      { en: "Big screens for every match", es: "Pantallas gigantes para cada partido" },
      { en: "Herediano football heritage on the walls", es: "Herencia del fútbol herediano en las paredes" },
    ],
    menu: {
      note: {
        en: "Match-day food and drink built for sharing.",
        es: "Comida y bebida de día de partido para compartir.",
      },
      pdf: "/menus/champions-menu.pdf",
      sections: [
        {
          title: { en: "To Share", es: "Para Compartir" },
          items: [
            { name: { en: "Loaded patacones", es: "Patacones cargados" }, description: { en: "Green plantain, beef, cheese", es: "Plátano verde, res, queso" }, price: "₡6,100" },
            { name: { en: "Alitas El Team", es: "Alitas El Team" }, description: { en: "Wings, chili-tamarind glaze", es: "Alitas, glaseado chile-tamarindo" }, price: "₡6,800" },
            { name: { en: "Casado sliders", es: "Sliders de casado" }, description: { en: "Three mini sandwiches", es: "Tres mini sándwiches" }, price: "₡5,900" },
          ],
        },
        {
          title: { en: "On Tap & Bottle", es: "De Barril y Botella" },
          items: [
            { name: { en: "Local craft lager", es: "Lager artesanal local" }, price: "₡3,200" },
            { name: { en: "Imperial", es: "Imperial" }, price: "₡2,400" },
            { name: { en: "Agua de sapo", es: "Agua de sapo" }, description: { en: "Ginger, tapa de dulce, lime", es: "Jengibre, tapa de dulce, limón" }, price: "₡2,600" },
          ],
        },
      ],
    },
  },
  ballroom: {
    id: "ballroom",
    gallery: [
      { type: "image", src: "/images/ballroom.png", alt: { en: "Sixth-floor ballroom set for an event", es: "Salón del sexto piso montado para un evento" } },
      { type: "image", src: "/images/ballroom-2.png", alt: { en: "Ballroom with panoramic stadium views", es: "Salón con vistas panorámicas al estadio" } },
    ],
    highlights: [
      { en: "Sixth-floor ballroom with panoramic views", es: "Salón en el sexto piso con vistas panorámicas" },
      { en: "Weddings, conferences & galas", es: "Bodas, conferencias y galas" },
      { en: "Divisible space with pre-function foyer", es: "Espacio divisible con foyer de pre-función" },
    ],
    capacity: {
      en: "Up to 300 reception · 200 banquet · 250 theatre",
      es: "Hasta 300 recepción · 200 banquete · 250 auditorio",
    },
    brochure: {
      label: { en: "Events & catering kit (PDF)", es: "Kit de eventos y catering (PDF)" },
      pdf: "/menus/ballroom-events-kit.pdf",
    },
  },
  rooftop: {
    id: "rooftop",
    gallery: [
      { type: "image", src: "/images/rooftop.png", alt: { en: "Rooftop pool and lounge", es: "Piscina y lounge en la azotea" } },
      { type: "image", src: "/images/rooftop-2.png", alt: { en: "Rooftop at golden hour", es: "Azotea a la hora dorada" } },
      { type: "image", src: "/images/skyroomnew.png", alt: { en: "Lounge seating with city views", es: "Sala con vistas a la ciudad" } },
    ],
    highlights: [
      { en: "Rooftop pool crowning the hotel", es: "Piscina en la azotea que corona el hotel" },
      { en: "360° views over stadium, city & mountains", es: "Vistas 360° sobre estadio, ciudad y montañas" },
      { en: "Day-to-night poolside bar", es: "Bar junto a la piscina de día y de noche" },
    ],
    menu: {
      note: {
        en: "Light bites and refreshing drinks, poolside.",
        es: "Bocados ligeros y bebidas refrescantes, junto a la piscina.",
      },
      pdf: "/menus/rooftop-menu.pdf",
      sections: [
        {
          title: { en: "Poolside", es: "Junto a la Piscina" },
          items: [
            { name: { en: "Ceviche de la casa", es: "Ceviche de la casa" }, description: { en: "Corvina, lime, cilantro", es: "Corvina, limón, culantro" }, price: "₡6,200" },
            { name: { en: "Tropical fruit plate", es: "Plato de fruta tropical" }, price: "₡4,100" },
          ],
        },
        {
          title: { en: "Refreshers", es: "Refrescos" },
          items: [
            { name: { en: "Fresco de cas", es: "Fresco de cas" }, price: "₡2,300" },
            { name: { en: "Coconut cooler", es: "Refresco de coco" }, price: "₡3,400" },
          ],
        },
      ],
    },
  },
 
  rooms: {
    id: "rooms",
    gallery: [
      { type: "image", src: "/images/guest-room.png", alt: { en: "Guest room interior", es: "Interior de la habitación" } },
      { type: "image", src: "/images/room-signature.png", alt: { en: "Guest room with city view", es: "Habitación con vista a la ciudad" } },
      { type: "image", src: "/images/Banro.jpg", alt: { en: "En-suite bathroom with terrazzo floor", es: "Baño con piso de terrazo" } },
    ],
    highlights: [
      { en: "Contemporary rooms with dramatic views", es: "Habitaciones contemporáneas con vistas dramáticas" },
      { en: "Layered natural materials", es: "Materiales naturales en capas" },
      { en: "Soundproof options for business travelers", es: "Opciones insonorizadas para viajeros de negocios" },
    ],
  },
}
