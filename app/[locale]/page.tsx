import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { HotelStructuredData } from "@/components/structured-data"
import { Hero } from "@/components/home/hero"
import {
  Intro,
  Pillars,
  FeaturedSpaces,
  ProgressTeaser,
  DualCta,
} from "@/components/home/sections"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return buildMetadata({
    locale,
    path: "",
    title: `VISTAH Heredia — ${dict.home.heroTitle}`,
    description: dict.home.heroSubtitle,
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDictionary(l)

  return (
    <>
      <HotelStructuredData locale={l} />
      <Hero dict={dict} locale={l} />
      <Intro dict={dict} />
      <Pillars dict={dict} />
      <FeaturedSpaces dict={dict} locale={l} />
      <ProgressTeaser dict={dict} locale={l} />
      <DualCta dict={dict} locale={l} />
    </>
  )
}
