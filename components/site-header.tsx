"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  ChevronDown,
  Compass,
  Sparkles,
  BedDouble,
  Calendar,
  BookOpen,
  Building2,
  FileText,
  Mail,
  UtensilsCrossed,
} from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { CTALink } from "@/components/brand/cta-link"
import { LanguageSwitcher } from "@/components/language-switcher"

import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"

import { cn } from "@/lib/utils"

export function SiteHeader({
  locale,
  nav,
}: {
  locale: Locale
  nav: Dictionary["nav"]
}) {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()
  const moreRef = useRef<HTMLDivElement>(null)

  const base = `/${locale}`

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
    }

    onScroll()

    window.addEventListener("scroll", onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])


  /* =========================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [pathname])


  /* =========================================================
     CLOSE MORE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    if (!moreOpen) return

    const onClick = (e: MouseEvent) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target as Node)
      ) {
        setMoreOpen(false)
      }
    }

    window.addEventListener("mousedown", onClick)

    return () => {
      window.removeEventListener("mousedown", onClick)
    }
  }, [moreOpen])


  /* =========================================================
     PRIMARY NAVIGATION
  ========================================================= */
const primaryLinks = [
  {
    href: `${base}/story`,
    label: nav.story,
    icon: BookOpen,
  },
  {
    href: `${base}/experience`,
    label: nav.experience,
    icon: Compass,
  },
  {
    href: `${base}/spaces`,
    label: nav.spaces,
    icon: Sparkles,
  },
  {
    href: `${base}/rooms`,
    label: nav.rooms,
    icon: BedDouble,
  },
  {
    href: `${base}/events`,
    label: nav.events,
    icon: Calendar,
  },
]

const moreLinks = [
  {
    href: `${base}/food-beverage`,
    label: nav.foodBeverage,
    icon: UtensilsCrossed,
  },
  {
    href: `${base}/construction`,
    label: nav.construction,
    icon: Building2,
  },
  {
    href: `${base}/journal`,
    label: nav.journal,
    icon: FileText,
  },
  {
    href: `${base}/contact`,
    label: nav.contact,
    icon: Mail,
  },
]

  /* =========================================================
     MOBILE LINKS
  ========================================================= */

  const mobileLinks = [
    ...primaryLinks,
    ...moreLinks,
  ]


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",

        scrolled
          ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-md",
      )}
    >

      {/* =====================================================
          HEADER CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-5
          lg:px-8
        "
      >

        {/* ===================================================
            LOGO
        =================================================== */}

        <Link
          href={`${base}/story`}
          className="flex shrink-0 items-center"
          aria-label="VISTAH Our Story"
        >
          <img
            src="/images/logo.png"
            alt="VISTAH"
            className="h-18 w-auto"
          />
        </Link>


        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-6
            lg:flex
          "
          aria-label="Primary"
        >

          {/* Primary Links */}

          {primaryLinks.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  `
                    text-sm
                    font-medium
                    tracking-wide
                    transition-colors
                    hover:text-primary
                  `,

                  active
                    ? "font-semibold text-primary"
                    : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            )
          })}


          {/* =================================================
              MORE DROPDOWN
          ================================================= */}

          <div
            className="relative"
            ref={moreRef}
          >

            <button
              type="button"
              onClick={() =>
                setMoreOpen((v) => !v)
              }
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={cn(
                `
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  tracking-wide
                  transition-colors
                  hover:text-primary
                `,

                moreLinks.some(
                  (l) =>
                    pathname === l.href ||
                    pathname.startsWith(`${l.href}/`),
                )
                  ? "font-semibold text-primary"
                  : "text-foreground/80",
              )}
            >

              {nav.more}

              <ChevronDown
                className={cn(
                  `
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:text-primary
                  `,

                  moreOpen &&
                    "rotate-180 text-primary",
                )}
              />

            </button>


            {/* Dropdown */}

            {moreOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-64
                  origin-top-right
                  overflow-hidden
                  rounded-2xl
                  border
                  border-border/80
                  bg-popover/95
                  p-2
                  shadow-2xl
                  backdrop-blur-2xl
                  animate-in
                  fade-in
                  zoom-in-95
                  duration-150
                "
              >

                <div
                  className="
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-muted-foreground/70
                  "
                >
                  Discover More
                </div>


                <div className="space-y-1">

                  {moreLinks.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(
                        `${link.href}/`,
                      )

                    const IconComponent =
                      link.icon

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          `
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            transition-all
                            duration-150
                          `,

                          active
                            ? `
                              bg-primary/10
                              font-semibold
                              text-primary
                            `
                            : `
                              text-popover-foreground/80
                              hover:bg-secondary/80
                              hover:text-foreground
                            `,
                        )}
                      >

                        <div
                          className={cn(
                            `
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              border
                              shadow-xs
                              transition-colors
                            `,

                            active
                              ? `
                                border-[var(--primary)]
                                bg-[var(--primary)]
                                text-white
                              `
                              : `
                                border-[var(--primary)]/30
                                bg-[var(--primary)]/10
                                text-[var(--primary)]
                              `,
                          )}
                        >
                          <IconComponent
                            className="h-4 w-4"
                          />
                        </div>

                        <span>
                          {link.label}
                        </span>

                      </Link>
                    )
                  })}

                </div>

              </div>
            )}

          </div>

        </nav>


        {/* ===================================================
            DESKTOP ACTIONS
        =================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            lg:flex
          "
        >

          <LanguageSwitcher
            currentLocale={locale}
          />

          <CTALink
            href={`${base}/careers#open-roles`}
            variant="outline"
            size="sm"
          >
            {nav.joinTeam}
          </CTALink>

          <CTALink
            href={`${base}/pre-booking`}
            variant="primary"
            size="sm"
          >
            {nav.prebook}
          </CTALink>

        </div>


        {/* ===================================================
            MOBILE MENU BUTTON
        =================================================== */}

        <button
          type="button"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-border/40
            bg-secondary/50
            p-2.5
            text-foreground
            transition-colors
            hover:bg-secondary
            lg:hidden
          "
          aria-label="Menu"
          aria-expanded={open}
          onClick={() =>
            setOpen((v) => !v)
          }
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {open && (
        <div
          className="
            border-t
            border-border/60
            bg-background/95
            whitespace-nowrap
            backdrop-blur-2xl
            lg:hidden
            animate-in
            slide-in-from-top-2
            duration-200
          "
        >

          <nav
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col
              gap-1
              px-6
              py-6
            "
            aria-label="Mobile"
          >

            {/* Home */}

            <Link
              href={base}
              className="
                rounded-xl
                px-3
                py-3
                text-base
                font-medium
                whitespace-nowrap
                text-foreground/90
                transition-colors
                hover:bg-secondary
              "
            >
              {nav.home}
            </Link>


            {/* All Mobile Links */}

            {mobileLinks.map((link) => {
              const IconComponent =
                link.icon

              const active =
                pathname === link.href ||
                pathname.startsWith(
                  `${link.href}/`,
                )

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    `
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      whitespace-nowrap
                      py-3
                      text-base
                      font-medium
                      transition-colors
                      hover:bg-secondary
                    `,

                    active &&
                      "bg-primary/10 text-primary",
                  )}
                >

                  <IconComponent
                    className={cn(
                      "h-5 w-5",

                      active
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />

                  <span>
                    {link.label}
                  </span>

                </Link>
              )
            })}


            {/* =================================================
                MOBILE ACTIONS
            ================================================= */}

            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
                border-t
                border-border/60
                pt-4
              "
            >

              <CTALink
                href={`${base}/pre-booking`}
                variant="primary"
                className="w-full justify-center"
              >
                {nav.prebook}
              </CTALink>


              <CTALink
                href={`${base}/careers#open-roles`}
                variant="outline"
                className="w-full justify-center"
              >
                {nav.joinTeam}
              </CTALink>


              <div className="flex justify-center pt-2">
                <LanguageSwitcher
                  currentLocale={locale}
                />
              </div>

            </div>

          </nav>

        </div>
      )}

    </header>
  )
}


/* =========================================================
   ACCESSIBILITY LABEL
========================================================= */

function siteAria(locale: Locale) {
  return locale === "es"
    ? "VISTAH Heredia — Inicio"
    : "VISTAH Heredia — Home"
}