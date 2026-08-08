import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from './lib/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

function getPreferredLocale(request: NextRequest): string {
  // Respect an existing preference cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale
  }
  // Fall back to Accept-Language
  const accept = request.headers.get('accept-language')
  if (accept) {
    const preferred = accept.split(',')[0]?.split('-')[0]?.toLowerCase()
    if (preferred && locales.includes(preferred as (typeof locales)[number])) {
      return preferred
    }
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore Next internals, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Already has a supported locale prefix
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) {
    return NextResponse.next()
  }

  // Redirect to the preferred locale
  const locale = getPreferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|images|.*\\..*).*)'],
}
