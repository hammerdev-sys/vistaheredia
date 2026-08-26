import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/content/site";
import { faqs } from "@/lib/content/faq";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Real social brand icons
function getSocialIcon(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("instagram")) {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="instagram-gradient"
            x1="2"
            y1="22"
            x2="22"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="45%" stopColor="#DD2A7B" />
            <stop offset="75%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>

        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="url(#instagram-gradient)"
          strokeWidth="2"
        />

        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="url(#instagram-gradient)"
          strokeWidth="2"
        />

        <circle cx="17.5" cy="6.5" r="1" fill="#DD2A7B" />
      </svg>
    );
  }

  if (normalized.includes("facebook")) {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill="#1877F2"
          d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.003 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.687 4.533-4.687 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.93-1.956 1.885v2.253h3.328l-.532 3.49h-2.796V24C19.612 23.076 24 18.092 24 12.073Z"
        />
      </svg>
    );
  }

  if (normalized.includes("twitter") || normalized === "x") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
      </svg>
    );
  }

  if (normalized.includes("linkedin")) {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill="#0A66C2"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z"
        />
      </svg>
    );
  }

  // Generic fallback icon
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.41368L11.2071 14.2071L9.79289 12.7929L17.5858 5H13V3H21Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;
  const { footer, nav, faq } = dict;

  const exploreLinks = [
    { href: `${base}/experience`, label: nav.experience },
    { href: `${base}/spaces`, label: nav.spaces },
    { href: `${base}/rooms`, label: nav.rooms },
    { href: `${base}/food-beverage`, label: nav.foodBeverage },
    { href: `${base}/journal`, label: nav.journal },
    { href: `${base}/events`, label: nav.events },
    { href: `${base}/story`, label: nav.story },
    { href: `${base}/construction`, label: nav.construction },
    { href: `${base}/careers`, label: nav.careers },
    { href: `${base}/contact`, label: nav.contact },
  ];

  return (
    <footer className="relative bg-charcoal text-cream overflow-hidden border-t border-white/10">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Info */}
          <div className="flex max-w-sm flex-col justify-between">
            <div>
              <img
                src="/images/logo-footer.png"
                alt="VISTAH"
                className="h-24 w-auto object-contain"
              />
              <p className="mt-6 text-sm leading-relaxed text-cream/70 text-pretty">
                {footer.statement}
              </p>

              <span className="mt-6 inline-block rounded-full border border-champagne/20 bg-champagne/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-champagne">
                {footer.opening}
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
              {footer.explore}
            </h2>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block cursor-pointer text-sm text-cream/75 transition-all duration-200 hover:!text-[var(--primary)] hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
              {footer.connect}
            </h2>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-cream/75 transition-colors hover:text-cream block"
                >
                  {siteConfig.email}
                </a>
              </li>

              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-sm text-cream/75 transition-colors hover:text-cream block"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {siteConfig.social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 shadow-sm"
                >
                  {getSocialIcon(s.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
              {footer.legal}
            </h2>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={`${base}/privacy`}
                  className="text-sm text-cream/75 transition-all duration-200 hover:!text-[var(--primary)] block"
                >
                  {footer.privacy}
                </Link>
              </li>

              <li>
                <Link
                  href={`${base}/terms`}
                  className="text-sm text-cream/75 transition-all duration-200 hover:!text-[var(--primary)] block"
                >
                  {footer.terms}
                </Link>
              </li>

              <li>
                <a
                  href={siteConfig.sisterSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/75 transition-colors hover:text-cream flex items-center gap-1.5"
                >
                  {footer.sisterSite}
                  <span className="text-xs text-champagne">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-2xl text-cream tracking-tight">
              {faq.footerTitle}
            </h2>

            <Link
              href={`${base}/faq`}
              className="text-sm font-medium text-champagne transition-all duration-200 hover:!text-[var(--primary)] flex items-center gap-1 group"
            >
              {faq.viewAll}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 grid gap-x-12 gap-y-2 md:grid-cols-2">
            {faqs.map((item) => (
              <details
                key={item.id}
                className="group border-b border-white/10 py-4 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-cream/90 transition-colors hover:text-cream [&::-webkit-details-marker]:hidden">
                  <span>{item.question[locale]}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-champagne transition-transform duration-300 group-open:rotate-45 group-open:bg-white/10">
                    +
                  </span>
                </summary>

                <p className="mt-3 text-sm leading-relaxed text-cream/65 text-pretty pl-1">
                  {item.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-pretty leading-relaxed">
            {footer.tapestryNote}
          </p>

          <div className="flex flex-col gap-1.5 md:items-end">
            <p className="text-cream/60">
              &copy; {new Date().getFullYear()} {siteConfig.legalName}.{" "}
              {footer.rights}
            </p>

            <p className="text-cream/40">{footer.sisterSiteNote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
