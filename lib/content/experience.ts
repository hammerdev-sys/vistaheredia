import type { LocalizedText } from "./types"

/**
 * EDITABLE CONTENT — The Heredia Experience.
 *
 * Positions VISTAH as the gateway to authentic Heredia. To add or edit a
 * highlight: update an entry below with an image under /public/images and
 * bilingual title/body text. Order controls display order.
 */

export type ExperienceHighlight = {
  id: string
  image: string
  title: LocalizedText
  kicker: LocalizedText
  body: LocalizedText
}

export const experienceHighlights: ExperienceHighlight[] = [
  {
    id: "herediano",
    image: "/images/experience-stadium.png",
    kicker: { en: "Football heritage", es: "Herencia futbolística" },
    title: { en: "Club Sport Herediano", es: "Club Sport Herediano" },
    body: {
      en: "El Team — one of Costa Rica's most storied clubs and the pride of the city. VISTAH beats to the rhythm of match day, from pre-game gatherings to the roar of the final whistle.",
      es: "El Team — uno de los clubes más emblemáticos de Costa Rica y el orgullo de la ciudad. VISTAH late al ritmo del día de partido, desde las reuniones previas hasta el rugido del pitazo final.",
    },
  },
  {
    id: "estadio",
    image: "/images/experience-stadium.png",
    kicker: { en: "Next door", es: "Al lado" },
    title: { en: "Estadio Eladio Rosabal Cordero", es: "Estadio Eladio Rosabal Cordero" },
    body: {
      en: "The reborn home of Herediano football rises right beside us. Guest rooms, the Skyroom, and the rooftop frame the pitch — turning every fixture into a front-row experience.",
      es: "El renacido hogar del fútbol herediano se eleva justo a nuestro lado. Las habitaciones, el Skyroom y la azotea enmarcan la cancha — convirtiendo cada encuentro en una experiencia de primera fila.",
    },
  },
  {
    id: "gastronomy",
    image: "/images/food/ajos.jpg",
    kicker: { en: "Flavors of the valley", es: "Sabores del valle" },
    title: { en: "Local gastronomy", es: "Gastronomía local" },
    body: {
      en: "From the sodas of the central market to contemporary Costa Rican kitchens, Heredia's table is generous and proudly local. Our own venues celebrate the same ingredients and makers.",
      es: "Desde las sodas del mercado central hasta las cocinas costarricenses contemporáneas, la mesa de Heredia es generosa y orgullosamente local. Nuestros propios espacios celebran los mismos ingredientes y productores.",
    },
  },
  {
    id: "culture",
    image: "/images/culture2.png",
    kicker: { en: "City of Flowers", es: "Ciudad de las Flores" },
    title: { en: "Culture & heritage", es: "Cultura y patrimonio" },
    body: {
      en: "Colonial landmarks like El Fortín and the central church anchor a city that is young, university-driven, and creative. Heredia's culture is lived in its parks, cafés, and plazas.",
      es: "Hitos coloniales como El Fortín y la iglesia central anclan una ciudad joven, universitaria y creativa. La cultura de Heredia se vive en sus parques, cafés y plazas.",
    },
  },
  {
    id: "coffee",
    image: "/images/experience-coffee.png",
    kicker: { en: "Cafetales", es: "Cafetales" },
    title: { en: "Coffee plantations", es: "Plantaciones de café" },
    body: {
      en: "Heredia's hillsides grow some of the world's most celebrated coffee. Tour the cafetales, meet the growers, and taste the harvest that shaped this region's identity.",
      es: "Las laderas de Heredia cultivan algunos de los cafés más celebrados del mundo. Recorra los cafetales, conozca a los productores y pruebe la cosecha que forjó la identidad de esta región.",
    },
  },
  {
    id: "nature",
    image: "/images/experience-volcano.png",
    kicker: { en: "Volcano & cloud forest", es: "Volcán y bosque nuboso" },
    title: { en: "Nature & the volcano", es: "Naturaleza y el volcán" },
    body: {
      en: "Braulio Carrillo National Park and the Barva Volcano are a short drive away — cloud forests, waterfalls, and crater lakes that make Heredia a launchpad for the wild.",
      es: "El Parque Nacional Braulio Carrillo y el Volcán Barva están a poca distancia — bosques nubosos, cascadas y lagunas de cráter que hacen de Heredia un punto de partida hacia lo silvestre.",
    },
  },
]
