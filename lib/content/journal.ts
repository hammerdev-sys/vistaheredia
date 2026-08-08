import type { LocalizedText } from "./types"

/**
 * EDITABLE CONTENT — Journal (Blog).
 *
 * Used to publish stories, construction updates, events, food, culture, and
 * lifestyle content. Structured for SEO: each post has a stable slug, a
 * category, a date, an excerpt, and body paragraphs — all bilingual.
 *
 * HOW TO ADD A POST:
 *   1. Add an image under /public/images (e.g. journal-my-post.png).
 *   2. Add a new object to the TOP of the `posts` array below.
 *   3. Give it a unique, URL-safe `slug`, an ISO `date`, a `category`,
 *      and bilingual `title`, `excerpt`, and `body` (array of paragraphs).
 *   4. Set `featured: true` on at most one post to headline the index.
 *
 * When migrating to a headless CMS, replace this array with a CMS query
 * returning the same shape (or move each post to an MDX file).
 */

export const journalCategories = ["construction", "culture", "food", "events", "lifestyle"] as const
export type JournalCategory = (typeof journalCategories)[number]

export const categoryLabels: Record<JournalCategory, LocalizedText> = {
  construction: { en: "Construction", es: "Construcción" },
  culture: { en: "Culture", es: "Cultura" },
  food: { en: "Food & Drink", es: "Comida y Bebida" },
  events: { en: "Events", es: "Eventos" },
  lifestyle: { en: "Lifestyle", es: "Estilo de Vida" },
}

export type JournalPost = {
  slug: string
  date: string // ISO date, e.g. "2026-09-18"
  category: JournalCategory
  featured?: boolean
  image: string
  title: LocalizedText
  excerpt: LocalizedText
  author: LocalizedText
  body: LocalizedText[] // paragraphs
}

export const posts: JournalPost[] = [
  {
    slug: "facade-takes-shape",
    date: "2026-09-18",
    category: "construction",
    featured: true,
    image: "/images/journal-topping-out.png",
    title: {
      en: "The façade takes shape: VISTAH's identity emerges",
      es: "La fachada toma forma: emerge la identidad de VISTAH",
    },
    excerpt: {
      en: "Warm wood cladding and ceramic-green panels are now rising across the tower, giving Heredia its first true glimpse of VISTAH.",
      es: "El revestimiento de madera cálida y los paneles verde cerámica se elevan por la torre, dando a Heredia su primer vistazo real de VISTAH.",
    },
    author: { en: "VISTAH Team", es: "Equipo VISTAH" },
    body: [
      {
        en: "For two years, VISTAH has been a promise drawn in renders. This month it became architecture you can read from the street. The façade — warm wood-look cladding interlaced with ceramic-green panels — is now installed across the lower floors, framing the building's identity beside the stadium.",
        es: "Durante dos años, VISTAH fue una promesa dibujada en renders. Este mes se convirtió en arquitectura que se lee desde la calle. La fachada — revestimiento tipo madera cálida entrelazado con paneles verde cerámica — ya está instalada en los pisos inferiores, enmarcando la identidad del edificio junto al estadio.",
      },
      {
        en: "The materials were chosen to belong to Heredia: the wood echoes the region's coffee-farm vernacular, while the ceramic green nods to the mountains that ring the valley. As the glass curtain wall follows floor by floor, the interplay of warmth and light that defines VISTAH is finally visible.",
        es: "Los materiales fueron elegidos para pertenecer a Heredia: la madera evoca el lenguaje de las fincas cafetaleras de la región, mientras que el verde cerámico guiña a las montañas que rodean el valle. A medida que el muro cortina de vidrio avanza piso por piso, el juego de calidez y luz que define a VISTAH por fin es visible.",
      },
      {
        en: "Next up: the rooftop crown and the sixth-floor ballroom envelope. Follow The Build for monthly updates as we move toward our Q4 2027 opening.",
        es: "Lo que sigue: la corona de la azotea y la envolvente del salón del sexto piso. Sigue La Obra para actualizaciones mensuales mientras avanzamos hacia nuestra apertura en Q4 2027.",
      },
    ],
  },
  {
    slug: "coffee-country-guide",
    date: "2026-08-05",
    category: "culture",
    image: "/images/journal-coffee.png",
    title: {
      en: "A morning in coffee country",
      es: "Una mañana en la región cafetalera",
    },
    excerpt: {
      en: "Heredia's hillsides grow some of the world's most celebrated coffee. Here's how to spend a morning among the cafetales.",
      es: "Las laderas de Heredia cultivan algunos de los cafés más celebrados del mundo. Así se pasa una mañana entre los cafetales.",
    },
    author: { en: "VISTAH Team", es: "Equipo VISTAH" },
    body: [
      {
        en: "Just above the city, the land tilts into rows of glossy coffee shrubs. The best mornings start early, when the mist still hangs in the valley and the pickers move through the rows. Many fincas welcome visitors for tastings that trace the bean from cherry to cup.",
        es: "Justo sobre la ciudad, la tierra se inclina en hileras de arbustos de café brillantes. Las mejores mañanas comienzan temprano, cuando la neblina aún cuelga en el valle y los recolectores recorren las hileras. Muchas fincas reciben visitantes para catas que siguen el grano de la cereza a la taza.",
      },
      {
        en: "Back at VISTAH, our lobby coffee shop pours the same single-origin harvests — a full-circle way to end the tour and begin the day.",
        es: "De regreso en VISTAH, la cafetería de nuestro lobby sirve las mismas cosechas de origen único — una forma de cerrar el círculo del recorrido y comenzar el día.",
      },
    ],
  },
  {
    slug: "match-day-at-vistah",
    date: "2026-07-12",
    category: "events",
    image: "/images/journal-matchday.png",
    title: {
      en: "What match day will feel like at VISTAH",
      es: "Cómo se vivirá el día de partido en VISTAH",
    },
    excerpt: {
      en: "From the Champions Corner buzz to rooftop views of the pitch, here's how VISTAH will move to the rhythm of El Team.",
      es: "Desde el bullicio del Champions Corner hasta las vistas de la cancha desde la azotea, así se moverá VISTAH al ritmo de El Team.",
    },
    author: { en: "VISTAH Team", es: "Equipo VISTAH" },
    body: [
      {
        en: "When Herediano plays at home, the whole city leans in — and VISTAH will lean with it. The Champions Corner fills hours before kickoff, the Skyroom frames the floodlights, and the rooftop turns the final whistle into a celebration under the stars.",
        es: "Cuando el Herediano juega de local, toda la ciudad se inclina hacia el partido — y VISTAH se inclinará con ella. El Champions Corner se llena horas antes del pitazo inicial, el Skyroom enmarca los reflectores y la azotea convierte el pitazo final en una celebración bajo las estrellas.",
      },
      {
        en: "For visiting fans and teams, our Stadium View rooms put the action steps from your bed. It's football hospitality, designed into the building itself.",
        es: "Para aficionados y equipos visitantes, nuestras habitaciones con vista al estadio ponen la acción a pasos de tu cama. Es hospitalidad futbolística, diseñada dentro del propio edificio.",
      },
    ],
  },
  {
    slug: "flavors-of-heredia",
    date: "2026-06-20",
    category: "food",
    image: "/images/journal-gastronomy.png",
    title: {
      en: "Flavors of Heredia, from soda to table",
      es: "Sabores de Heredia, de la soda a la mesa",
    },
    excerpt: {
      en: "The dishes that define the City of Flowers — and how VISTAH's kitchens will celebrate them.",
      es: "Los platos que definen la Ciudad de las Flores — y cómo las cocinas de VISTAH los celebrarán.",
    },
    author: { en: "VISTAH Team", es: "Equipo VISTAH" },
    body: [
      {
        en: "Costa Rican cooking is generous and unpretentious: the casado at midday, chifrijo to share, gallo pinto at dawn. Heredia's central market is the best classroom, its sodas serving recipes passed down through families.",
        es: "La cocina costarricense es generosa y sin pretensiones: el casado al mediodía, el chifrijo para compartir, el gallo pinto al amanecer. El mercado central de Heredia es la mejor escuela, con sus sodas sirviendo recetas heredadas de generación en generación.",
      },
      {
        en: "VISTAH's venues will build on that foundation — sourcing from the same growers and makers, and giving classic flavors a contemporary, view-filled home.",
        es: "Los espacios de VISTAH partirán de esa base — abasteciéndose de los mismos productores y dando a los sabores clásicos un hogar contemporáneo y lleno de vistas.",
      },
    ],
  },
]

export function getSortedPosts(): JournalPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): JournalPost | undefined {
  return posts.find((p) => p.slug === slug)
}
