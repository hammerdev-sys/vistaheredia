import { siteConfig } from "@/lib/content/site"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vistaheredia.com"

// JSON-LD structured data for the hotel. Uses schema.org "Hotel" which
// extends LocalBusiness — future-proofed for Hilton integration (add
// aggregateRating, priceRange, makesOffer, and starRating closer to opening).
export function HotelStructuredData({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "VISTAH Heredia, Tapestry Collection by Hilton",
    description:
      "A contemporary social hotel integrated with the Estadio Eladio Rosabal Cordero in Heredia, Costa Rica. Opening Q4 2027.",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/hero-stadium.png`,
    brand: {
      "@type": "Brand",
      name: "Tapestry Collection by Hilton",
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine1,
      addressLocality: "Heredia",
      addressRegion: "Heredia",
      addressCountry: "CR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.lat,
      longitude: siteConfig.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "Opening Q4 2027",
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
