'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({
  currentLocale,
  tone = 'dark',
}: {
  currentLocale: Locale
  tone?: 'light' | 'dark'
}) {
  const pathname = usePathname()
  const router = useRouter()

  function switchTo(locale: Locale) {
    if (locale === currentLocale) return
    // Persist preference for one year
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/') || `/${locale}`)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border p-0.5 text-xs font-medium',
        tone === 'light' ? 'border-cream/30' : 'border-border',
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === currentLocale
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-pressed={active}
            className={cn(
              'rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : tone === 'light'
                  ? 'text-cream/80 hover:text-cream'
                  : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {locale}
          </button>
        )
      })}
    </div>
  )
}
