# VISTAH Heredia — Tapestry Collection by Hilton

Bilingual (EN/ES) pre-opening marketing, sales, and recruitment website for **VISTAH Heredia**, a contemporary social hotel integrated with the new Estadio Eladio Rosabal Cordero in Heredia, Costa Rica. Opening **Q4 2027**.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4, optimized for Vercel.

---

## Table of contents

1. [Local development](#local-development)
2. [Project structure](#project-structure)
3. [Content update process](#content-update-process)
4. [Adding / editing job listings](#adding--editing-job-listings)
5. [Adding construction updates](#adding-construction-updates)
6. [Forms & backend wiring](#forms--backend-wiring)
7. [Internationalization](#internationalization)
8. [Brand system](#brand-system)
9. [Environment variables](#environment-variables)
10. [Future Hilton integration notes](#future-hilton-integration-notes)
11. [Deployment checklist](#deployment-checklist)

---

## Local development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` — you'll be redirected to `/en` (or `/es` based on the `Accept-Language` header / stored preference).

Build & lint:

```bash
pnpm build
pnpm lint
```

---

## Project structure

```
app/
  layout.tsx                 # Root layout: fonts, metadata, analytics
  [locale]/                  # All localized pages live under /en and /es
    layout.tsx               # Header, footer, cookie notice, <html lang> sync
    page.tsx                 # Home
    story/                   # Our Story / Identity
    spaces/                  # Spaces & Amenities
    construction/            # Design & Construction Progress
    pre-booking/             # Sales tool (room blocks + event space inquiries)
    careers/                 # Job listings + application form
    contact/                 # Contact + location + map
  api/                       # Route handlers (form submissions)
    inquiries/               # Sales/event inquiries
    applications/            # Job applications + resume upload
    contact/                 # General contact
  sitemap.ts, robots.ts      # SEO
components/                   # Reusable UI (Hero, SpaceCard, forms, header, footer...)
lib/
  i18n/                      # Locale config, dictionaries (en.ts / es.ts), metadata helper
  content/                   # EDITABLE DATA: site.ts, jobs.ts, construction.ts
public/images/               # Renders, construction photos, atmosphere shots
```

---

## Content update process

Most copy lives in the bilingual dictionaries so non-developers can find and edit text in one place:

- **`lib/i18n/dictionaries/en.ts`** — English source of truth (also defines the `Dictionary` type).
- **`lib/i18n/dictionaries/es.ts`** — Spanish translations (must match the English shape).

Editing rules:

- Keep the two files structurally identical. If you add a key to `en.ts`, add the same key to `es.ts` or the build will fail (TypeScript enforces this).
- Contact details, social links, sister-site URL, and map coordinates live in **`lib/content/site.ts`**.

> When you're ready for non-technical editing without code changes, migrate `lib/content/*` and the dictionaries into a headless CMS (Sanity/Contentful). The data shapes were designed to map cleanly to CMS documents.

---

## Adding / editing job listings

Edit **`lib/content/jobs.ts`**. Each job is bilingual:

```ts
{
  id: "front-office-manager",     // unique slug, used in the URL/anchor
  department: "operations",       // "operations" | "finance"
  status: "open",                 // "open" | "archived" — archived jobs are hidden
  location: { en: "Heredia, Costa Rica", es: "Heredia, Costa Rica" },
  type: { en: "Full-time", es: "Tiempo completo" },
  title: { en: "...", es: "..." },
  summary: { en: "...", es: "..." },
  requirements: {
    en: ["...", "..."],
    es: ["...", "..."],
  },
}
```

- **Add a job:** append a new object to the array.
- **Archive a job:** set `status: "archived"` (keeps history, removes it from the site).
- The careers page groups jobs by department automatically and wires each "Apply" button to the application form with the position pre-selected.

---

## Adding construction updates

Edit **`lib/content/construction.ts`**:

- `progressGallery` — array of `{ image, date, caption: { en, es } }`. Add new entries at the top for newest-first ordering. Drop the image into `public/images/` first.
- `renders` — the design render grid.

The timeline milestones live in the dictionaries under `construction.timeline`.

> Construction is the section updated most often. It's the highest-priority candidate for CMS migration so the marketing team can post progress photos without a deploy.

---

## Forms & backend wiring

The UI, validation, loading, and success/error states (bilingual) are complete. The three route handlers in `app/api/*` (`contact`, `inquiries`, `applications`) are fully wired:

- **Server-side validation** mirrors the client (required fields, email format, PDF type/size for resumes) and returns `422` with a `fieldErrors` map on failure.
- **Spam protection:** an invisible honeypot field + a render-timestamp time trap (see `Honeypot` in `components/forms/fields.tsx` and `lib/server/spam-guard.ts`) reject bot submissions, and `lib/server/rate-limit.ts` applies a per-IP, in-memory rate limit (5 requests/minute/route). The rate limiter is single-instance only — swap it for Upstash Redis if abuse becomes a problem at scale.
- **Email notifications** go out via the Resend HTTP API (`lib/server/mailer.ts`, no SDK dependency needed) to one or more recipients per form, configured via env vars with a sensible fallback to `lib/content/site.ts`:
  - Contact → `CONTACT_TO_EMAILS` (fallback `siteConfig.email`)
  - Pre-booking inquiries → `SALES_TO_EMAILS` (fallback `siteConfig.salesEmail`)
  - Applications → `CAREERS_TO_EMAILS` (fallback `siteConfig.careersEmail`)

  Each var accepts a comma-separated list to notify multiple people, e.g. `SALES_TO_EMAILS=sales@vistaheredia.com,gm@vistaheredia.com`.
- **Resume handling (careers form):** the PDF is validated (type + ≤5MB) and attached directly to the notification email as base64 — it is **not** stored anywhere. There's no admin panel yet to read a stored file from, so persistence was intentionally skipped. If that changes, add the Vercel Blob integration and upload the file in `app/api/applications/route.ts` instead of (or in addition to) attaching it.

No database is used — submissions are emailed only, not persisted. See `.env.local.example` for the required variables.

### Suggested frontend improvements (not applied — UI kept as-is)

Reviewed the three form components; validation and structure are solid and consistent. A few optional follow-ups that don't require any visual change, left for a deliberate follow-up rather than bundled here:

- The `ErrorBanner` shown on failure is generic ("Something went wrong") for every failure mode, including per-field validation errors the API now returns (`fieldErrors`) and rate-limit (`429`) responses. Surfacing field-level messages would need small additions to each form component.
- The resume file's 5MB/PDF-only rule is only enforced on submit (via the `accept="application/pdf"` hint + the server). Checking `file.size`/`file.type` in the `onChange` handler in `application-form.tsx` would catch it before the network round-trip.

---

## Internationalization

- Route-based: every page is under `/[locale]`. Supported locales are in `lib/i18n/config.ts`.
- `middleware.ts` handles locale detection (cookie → `Accept-Language` → default) and redirects `/` to the resolved locale.
- The language switcher (header) preserves the current path and stores the preference in a cookie.
- Metadata is bilingual with `hreflang` alternates via `lib/i18n/metadata.ts`.

**Adding a new page:** create `app/[locale]/<route>/page.tsx`, add a `generateMetadata` using `buildMetadata`, add nav labels to both dictionaries, and add the route to `app/sitemap.ts` and the header/footer nav.

---

## Brand system

- **Colors, radius, and fonts** are defined as tokens in `app/globals.css` (`@theme`). Derived from the VISTAH Branding Book: terracotta/brick red, ceramic green, warm wood/cognac, earth beige/cream, charcoal, and champagne-gold accents.
- **Fonts:** Playfair Display (serif headlines) + Inter (sans body/UI), loaded via `next/font` in `app/layout.tsx`.
- **Logo:** `components/brand/logo.tsx` renders the geometric "V" symbol + wordmark + "Tapestry Collection by Hilton" lockup. Use `tone="light"` on dark imagery and `tone="dark"` on light backgrounds. **Replace with the official SVG logo files** when available (swap the symbol + wordmark markup; keep the API).
- **Images** in `public/images/` are AI-generated placeholders. Replace with official renders, real construction photography, and stadium views. All use `next/image` with proper `sizes`.

---

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (sitemap, robots, structured data, OG). Set to the production domain. |
| `RESEND_API_KEY` | Transactional email for form notifications. Required — without it, the API routes return `500 email_not_configured`. |
| `EMAIL_FROM` | Verified Resend sender, e.g. `VISTAH Heredia <notifications@vistaheredia.com>`. Falls back to Resend's shared test sender. |
| `CONTACT_TO_EMAILS` | Comma-separated recipients for the contact form. Falls back to `siteConfig.email`. |
| `SALES_TO_EMAILS` | Comma-separated recipients for pre-booking inquiries. Falls back to `siteConfig.salesEmail`. |
| `CAREERS_TO_EMAILS` | Comma-separated recipients for job applications. Falls back to `siteConfig.careersEmail`. |

> When persistence is added later (database + resume storage), reintroduce `DATABASE_URL` (Neon) and `BLOB_READ_WRITE_TOKEN` (Vercel Blob).

---

## Future Hilton integration notes

This site is intentionally structured to convert into a full operating hotel site in 2027 with minimal refactor:

- **Booking engine:** add a `book` route (or embed Hilton's engine) alongside the existing pages. The pre-booking page copy already sets the expectation that live booking opens closer to 2027 and can link out to the Hilton system.
- **Hilton Honors:** add auth/account links in the header CTAs (the header is data-driven — extend the nav/CTA config).
- **Rates & availability:** the `SpaceCard` and spaces data can be extended with rate/availability fields.
- **Structured data:** `components/structured-data.tsx` uses schema.org `Hotel`. Add `priceRange`, `starRating`, `aggregateRating`, and `makesOffer` near opening.
- Keep the `Tapestry Collection by Hilton™` lockup and follow Hilton brand governance for the co-branded logo and any deep links into Hilton systems.

---

## Deployment checklist

- [ ] Connect the GitHub repo to a Vercel project (preview deployments per PR).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Add the Resend integration (or set `RESEND_API_KEY` manually), verify the sender domain, and set `EMAIL_FROM` + the `*_TO_EMAILS` vars.
- [ ] Send a real test submission through each of the three forms in production and confirm the notification email arrives.
- [ ] Replace placeholder logo with official SVG files.
- [ ] Replace placeholder imagery with official renders and construction photos.
- [ ] Verify EN/ES translations with a native reviewer.
- [ ] Confirm the exact site coordinates in `lib/content/site.ts` and the map embed.
- [ ] Run Lighthouse; confirm LCP on the hero and mobile performance.
- [ ] Confirm Vercel Analytics + Speed Insights are reporting.
- [ ] Attach the production domain (e.g. `vistahheredia.com`).
