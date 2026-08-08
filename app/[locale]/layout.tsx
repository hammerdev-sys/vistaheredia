import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HtmlLang } from '@/components/html-lang'
import { CookieNotice } from '@/components/cookie-notice'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, locales } from '@/lib/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)

  return (
    <>
      <HtmlLang locale={locale} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader locale={locale} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </div>
      <CookieNotice locale={locale} />
    </>
  )
}
