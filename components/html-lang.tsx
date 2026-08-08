'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n/config'

/**
 * Keeps <html lang> in sync with the active locale.
 * The root layout must render a static <html lang> (App Router requirement),
 * so this client helper updates it on the client for correct a11y/SEO.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
