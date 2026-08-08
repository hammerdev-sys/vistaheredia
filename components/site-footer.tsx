import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { siteConfig } from '@/lib/content/site'
import { faqs } from '@/lib/content/faq'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const base = `/${locale}`
  const { footer, nav, faq } = dict

  const exploreLinks = [
    { href: `${base}/experience`, label: nav.experience },
    { href: `${base}/spaces`, label: nav.spaces },
    { href: `${base}/rooms`, label: nav.rooms },
    { href: `${base}/journal`, label: nav.journal },
    { href: `${base}/events`, label: nav.events },
    { href: `${base}/story`, label: nav.story },
    { href: `${base}/construction`, label: nav.construction },
    { href: `${base}/careers`, label: nav.careers },
    { href: `${base}/contact`, label: nav.contact },
  ]

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-6 text-sm leading-relaxed text-cream/70 text-pretty">
              {footer.statement}
            </p>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-champagne">
              {footer.opening}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              {footer.explore}
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              {footer.connect}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-cream/80 transition-colors hover:text-cream"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-sm text-cream/80 transition-colors hover:text-cream"
                >
                  {siteConfig.phone}
                </a>
              </li>
              {siteConfig.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              {footer.legal}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`${base}/privacy`}
                  className="text-sm text-cream/80 transition-colors hover:text-cream"
                >
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/terms`}
                  className="text-sm text-cream/80 transition-colors hover:text-cream"
                >
                  {footer.terms}
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.sisterSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/80 transition-colors hover:text-cream"
                >
                  {footer.sisterSite}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-2xl text-cream">{faq.footerTitle}</h2>
            <Link
              href={`${base}/faq`}
              className="text-sm font-medium text-champagne transition-colors hover:text-cream"
            >
              {faq.viewAll}
            </Link>
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
            {faqs.map((item) => (
              <details
                key={item.id}
                className="group border-b border-cream/10 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-cream/90 transition-colors hover:text-cream [&::-webkit-details-marker]:hidden">
                  {item.question[locale]}
                  <span className="shrink-0 text-champagne transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-cream/65 text-pretty">
                  {item.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-pretty">{footer.tapestryNote}</p>
          <div className="flex flex-col gap-1 md:items-end">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.legalName}.{' '}
              {footer.rights}
            </p>
            <p>{footer.sisterSiteNote}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
