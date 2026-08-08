'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { CTALink } from '@/components/brand/cta-link'
import { LanguageSwitcher } from '@/components/language-switcher'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

export function SiteHeader({
  locale,
  nav,
}: {
  locale: Locale
  nav: Dictionary['nav']
}) {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const moreRef = useRef<HTMLDivElement>(null)
  const base = `/${locale}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [moreOpen])

  // Primary links shown inline on desktop.
  const primaryLinks = [
    { href: `${base}/experience`, label: nav.experience },
    { href: `${base}/spaces`, label: nav.spaces },
    { href: `${base}/rooms`, label: nav.rooms },
    { href: `${base}/events`, label: nav.events },
  ]

  // Secondary links tucked into the "More" dropdown on desktop.
  // Careers intentionally omitted here — it lives in the "Join Our Team" CTA.
  const moreLinks = [
    { href: `${base}/story`, label: nav.story },
    { href: `${base}/construction`, label: nav.construction },
    { href: `${base}/journal`, label: nav.journal },
    { href: `${base}/contact`, label: nav.contact },
  ]

  // Mobile shows every destination in one list.
  const mobileLinks = [...primaryLinks, ...moreLinks]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'border-b border-transparent bg-background/60 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href={base} aria-label={siteAria(locale)} className="shrink-0">
          <Logo tone="dark" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors hover:text-primary',
                  active ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={cn(
                'inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary',
                moreLinks.some((l) => l.href === pathname)
                  ? 'text-primary'
                  : 'text-foreground/80',
              )}
            >
              {nav.more}
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', moreOpen && 'rotate-180')}
              />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-lg border border-border bg-popover py-2 shadow-lg">
                {moreLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary',
                        active ? 'text-primary' : 'text-popover-foreground/80',
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher currentLocale={locale} />
          <CTALink href={`${base}/careers#open-roles`} variant="outline" size="sm">
            {nav.joinTeam}
          </CTALink>
          <CTALink href={`${base}/pre-booking`} variant="primary" size="sm">
            {nav.prebook}
          </CTALink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Mobile">
            <Link
              href={base}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
            >
              {nav.home}
            </Link>
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <CTALink href={`${base}/pre-booking`} variant="primary">
                {nav.prebook}
              </CTALink>
              <CTALink href={`${base}/careers#open-roles`} variant="outline">
                {nav.joinTeam}
              </CTALink>
              <div className="pt-2">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function siteAria(locale: Locale) {
  return locale === 'es' ? 'VISTAH Heredia — Inicio' : 'VISTAH Heredia — Home'
}
