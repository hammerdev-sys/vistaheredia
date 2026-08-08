'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n/config'

const COPY: Record<Locale, { text: string; accept: string }> = {
  en: {
    text: 'We use cookies to remember your language preference and to understand site usage.',
    accept: 'Got it',
  },
  es: {
    text: 'Usamos cookies para recordar tu preferencia de idioma y comprender el uso del sitio.',
    accept: 'Entendido',
  },
}

export function CookieNotice({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!localStorage.getItem('vistah-cookie-consent'))
  }, [])

  if (!visible) return null
  const copy = COPY[locale]

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-xl border border-border bg-card p-4 shadow-lg md:flex md:items-center md:gap-4">
      <p className="text-sm text-muted-foreground text-pretty">{copy.text}</p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem('vistah-cookie-consent', '1')
          setVisible(false)
        }}
        className="mt-3 w-full shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:mt-0 md:w-auto"
      >
        {copy.accept}
      </button>
    </div>
  )
}
