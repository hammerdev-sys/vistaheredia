import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n/config"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vistaheredia.com"

const routes = ["", "/story", "/spaces", "/construction", "/pre-booking", "/careers", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/construction" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            es: `${BASE_URL}/es${route}`,
          },
        },
      })
    }
  }

  return entries
}
