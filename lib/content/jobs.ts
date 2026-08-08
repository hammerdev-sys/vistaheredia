import type { Locale } from '@/lib/i18n/config'

/**
 * Job listings.
 *
 * HOW TO MANAGE JOBS (pre-CMS workflow):
 *  - Add a new object to the `jobs` array below.
 *  - Provide bilingual `title`, `department`, `summary`, and `requirements`.
 *  - Set `active: false` to archive a role without deleting it.
 *  - `id` must be unique and URL-safe (used as an anchor).
 *
 * When the Careers section is migrated to a headless CMS, this array is
 * replaced by a CMS query returning the same shape.
 */
export type LocalizedText = Record<Locale, string>

export interface Job {
  id: string
  active: boolean
  title: LocalizedText
  department: LocalizedText
  location: LocalizedText
  summary: LocalizedText
  requirements: LocalizedText[]
}

export const jobs: Job[] = [
  {
    id: 'general-manager',
    active: true,
    title: { en: 'General Manager', es: 'Gerente General' },
    department: { en: 'Operations', es: 'Operaciones' },
    location: { en: 'Heredia, Costa Rica', es: 'Heredia, Costa Rica' },
    summary: {
      en: 'Lead the pre-opening and operation of VISTAH Heredia, setting the standard for service, culture, and community connection.',
      es: 'Liderar la pre-apertura y operación de VISTAH Heredia, estableciendo el estándar de servicio, cultura y conexión comunitaria.',
    },
    requirements: [
      { en: '8+ years of hotel leadership, ideally within an international brand.', es: '8+ años de liderazgo hotelero, idealmente en una marca internacional.' },
      { en: 'Fluent in Spanish and English.', es: 'Dominio del español y el inglés.' },
      { en: 'Proven pre-opening or brand-launch experience preferred.', es: 'Se prefiere experiencia comprobada en pre-apertura o lanzamiento de marca.' },
    ],
  },
  {
    id: 'director-of-sales',
    active: true,
    title: { en: 'Director of Sales', es: 'Director de Ventas' },
    department: { en: 'Sales & Marketing', es: 'Ventas y Marketing' },
    location: { en: 'Heredia, Costa Rica', es: 'Heredia, Costa Rica' },
    summary: {
      en: 'Drive pre-opening room-block and event sales, building relationships with corporate, group, and event clients.',
      es: 'Impulsar la venta anticipada de bloques de habitaciones y eventos, construyendo relaciones con clientes corporativos, grupales y de eventos.',
    },
    requirements: [
      { en: '5+ years in hotel sales, with a strong local network.', es: '5+ años en ventas hoteleras, con una sólida red local.' },
      { en: 'Experience selling event and meeting space.', es: 'Experiencia en la venta de espacios para eventos y reuniones.' },
      { en: 'Bilingual Spanish/English.', es: 'Bilingüe español/inglés.' },
    ],
  },
  {
    id: 'financial-controller',
    active: true,
    title: { en: 'Financial Controller', es: 'Contralor Financiero' },
    department: { en: 'Finance & Administration', es: 'Finanzas y Administración' },
    location: { en: 'Heredia, Costa Rica', es: 'Heredia, Costa Rica' },
    summary: {
      en: 'Own financial planning, reporting, and controls for the hotel through pre-opening and into operation.',
      es: 'Responsable de la planificación financiera, reportes y controles del hotel durante la pre-apertura y la operación.',
    },
    requirements: [
      { en: 'CPA or equivalent; hospitality finance experience preferred.', es: 'CPA o equivalente; se prefiere experiencia en finanzas de hospitalidad.' },
      { en: 'Strong command of local tax and compliance requirements.', es: 'Sólido dominio de los requisitos fiscales y de cumplimiento locales.' },
      { en: 'Bilingual Spanish/English.', es: 'Bilingüe español/inglés.' },
    ],
  },
  {
    id: 'front-office-manager',
    active: true,
    title: { en: 'Front Office Manager', es: 'Jefe de Recepción' },
    department: { en: 'Operations', es: 'Operaciones' },
    location: { en: 'Heredia, Costa Rica', es: 'Heredia, Costa Rica' },
    summary: {
      en: 'Deliver a warm, seamless arrival experience and lead the front office team in the spirit of Costa Rican hospitality.',
      es: 'Ofrecer una experiencia de llegada cálida y fluida, y liderar al equipo de recepción con el espíritu de la hospitalidad costarricense.',
    },
    requirements: [
      { en: '3+ years in front office, with supervisory experience.', es: '3+ años en recepción, con experiencia de supervisión.' },
      { en: 'Guest-obsessed and detail-oriented.', es: 'Enfocado en el huésped y orientado al detalle.' },
      { en: 'Bilingual Spanish/English.', es: 'Bilingüe español/inglés.' },
    ],
  },
  {
    id: 'events-manager',
    active: true,
    title: { en: 'Events & Banquets Manager', es: 'Gerente de Eventos y Banquetes' },
    department: { en: 'Food & Beverage', es: 'Alimentos y Bebidas' },
    location: { en: 'Heredia, Costa Rica', es: 'Heredia, Costa Rica' },
    summary: {
      en: 'Plan and execute unforgettable events in the sixth-floor ballroom and social spaces.',
      es: 'Planificar y ejecutar eventos inolvidables en el salón del sexto piso y los espacios sociales.',
    },
    requirements: [
      { en: '4+ years managing events or banquets.', es: '4+ años gestionando eventos o banquetes.' },
      { en: 'Creative, organized, and calm under pressure.', es: 'Creativo, organizado y sereno bajo presión.' },
      { en: 'Bilingual Spanish/English.', es: 'Bilingüe español/inglés.' },
    ],
  },
]

export function getActiveJobs(): Job[] {
  return jobs.filter((job) => job.active)
}
