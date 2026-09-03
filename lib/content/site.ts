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
  phone: '+506 2222 0000',
  addressLine1: 'Estadio Eladio Rosabal Cordero',
  addressLine2: 'Heredia, Costa Rica',
  lat: 10.0022,
  lng: -84.1165,
  sisterSiteUrl: 'https://www.hammerhre.com',
  hiltonTapestryUrl: 'https://www.hilton.com/en/tapestry/',
  // Coordinates are approximate to Heredia; update with the exact site location.
  mapEmbedSrc:
    'https://www.openstreetmap.org/export/embed.html?bbox=-84.13%2C9.99%2C-84.09%2C10.01&layer=mapnik&marker=10.0022%2C-84.1165',
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
