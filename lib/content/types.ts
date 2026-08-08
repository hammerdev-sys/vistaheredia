import type { Locale } from "@/lib/i18n/config"

/**
 * Shared content primitives for the in-repo (Git-based) content workflow.
 *
 * All editable content lives in `lib/content/*.ts` as plain typed data so the
 * client can update copy, imagery, menus, events, rooms, and journal posts by
 * editing these files (via GitHub) — no developer or CMS account required.
 *
 * Every piece of human-facing text uses `LocalizedText` so the site stays
 * fully bilingual (English + Spanish). When the project migrates to a headless
 * CMS later, these arrays are replaced by CMS queries returning the same shape.
 */
export type LocalizedText = Record<Locale, string>

/** A single media slide used by carousels across Spaces, Rooms, and Experience. */
export type MediaItem = {
  type: "image" | "video"
  /** Path under /public, e.g. "/images/skyroom.png" */
  src: string
  /** Poster image for video slides. */
  poster?: string
  alt: LocalizedText
}

/** Convenience helper to read localized text with an English fallback. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en
}
