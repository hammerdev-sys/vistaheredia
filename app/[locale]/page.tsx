import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";

import { HotelStructuredData } from "@/components/structured-data";
import { Hero } from "@/components/home/hero";

import {
  Intro,
  Pillars,
  FeaturedSpaces,
  ProgressTeaser,
  DualCta,
} from "@/components/home/sections";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const l = locale as Locale;
  const dict = getDictionary(l);

  return buildMetadata({
    locale: l,
    path: "",
    title: `VISTAH Heredia — ${dict.home.heroTitle}`,
    description: dict.home.heroSubtitle,
  });
}

/* =========================================================
   HOME PAGE
========================================================= */

export default async function HomePage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      {/* Structured SEO data */}
      <HotelStructuredData locale={l} />

      {/* Hero */}
      <Hero
        dict={dict}
        locale={l}
      />

      {/* Intro */}
      <Intro
        dict={dict}
      />

      {/* Main pillars */}
      <Pillars
        dict={dict}
      />

      {/* Featured spaces */}
      <FeaturedSpaces
        dict={dict}
        locale={l}
      />

      {/* Progress / development teaser */}
      <ProgressTeaser
        dict={dict}
        locale={l}
      />

      {/* Bottom CTA */}
      <DualCta
        dict={dict}
        locale={l}
      />
    </>
  );
}