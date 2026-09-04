/**
 * Central site configuration.
 * Non-technical edits (contact details, social links) can be made here safely.
 * When migrating to a CMS, these values can be sourced from CMS singletons.
 */
export const siteConfig = {
  name: 'VISTAH Heredia',
  legalName: 'VISTAH Heredia, Tapestry Collection by Hilton',
  domain: 'www.vistaheredia.com',
  openingYear: 2027,
  email: 'info@vistaheredia.com',
  salesEmail: 'sales@vistaheredia.com',
  careersEmail: 'careers@vistaheredia.com',
  phone: 'Coming Soon',
  addressLine1: 'Estadio Eladio Rosabal Cordero',
  addressLine2: 'Heredia, Costa Rica',
  lat: 10.0022,
  lng: -84.1165,
  sisterSiteUrl: 'https://www.hammerhre.com',
  hiltonTapestryUrl: 'https://www.hilton.com/en/tapestry/',
  // Coordinates are approximate to Heredia; update with the exact site location.
  mapEmbedSrc:
    'https://www.google.com/maps?q=10.0022,-84.1165+(VISTAH+Heredia)&z=15&output=embed',
  social: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
  ],
} as const

export const spaceImages: Record<string, string> = {
  rooms: '/images/guest-room.png',
  lobby: '/images/lobby-cafe.png',
  champions: '/images/champions-corner.png',
  ballroom: '/images/ballroom.png',
  skyroom: '/images/skyroom.png',
  rooftop: '/images/rooftop.png',
}
