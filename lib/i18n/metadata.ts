import type { Metadata } from 'next'
import type { Locale } from './config'

/**
 * Builds bilingual metadata with hreflang alternates and Open Graph.
 * `path` is the route without the locale prefix, e.g. '/spaces' or '' for home.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image = '/images/hero-stadium.png',
}: {
  locale: Locale
  path?: string
  title: string
  description: string
  image?: string
}): Metadata {
  const cleanPath = path.startsWith('/') || path === '' ? path : `/${path}`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${cleanPath}`,
      languages: {
        en: `/en${cleanPath}`,
        es: `/es${cleanPath}`,
        'x-default': `/en${cleanPath}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === 'es' ? 'es_CR' : 'en_US',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
