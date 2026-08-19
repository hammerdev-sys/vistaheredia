import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"

import { PageHero } from "@/components/page-hero"
import { Container, Kicker } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { CTALink } from "@/components/brand/cta-link"
import { SiteFooter } from "@/components/site-footer"


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) return {}

  return buildMetadata({
    locale,
    path: "/food-beverage",
    title: "Food & Beverage — VISTAH Heredia",
    description:
      "Discover the food, beverage and social spaces of VISTAH Heredia.",
    image: "/images/skyroom.png",
  })
}


/* =========================================================
   PAGE
========================================================= */

export default async function FoodBeveragePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const l = locale as Locale
  const dict = getDictionary(l)

  const base = `/${l}`

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        kicker="Food & Beverage"
        title="Where the City Gathers"
        intro="A collection of dining, social and gathering spaces shaped by food, culture and the energy of Heredia."
        image="/images/skyroom.png"
        imageAlt="VISTAH Skyroom and food and beverage experience"
      />


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="bg-background py-20 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

            <Reveal>
              <Kicker>Food & Beverage</Kicker>

              <h2 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Gastronomic Concepts
              </h2>
            </Reveal>


            <Reveal delay={100}>
              <div className="max-w-xl">

                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                  VISTAH brings together a collection of food and beverage
                  experiences, each with its own atmosphere, identity and
                  relationship to the surrounding city.
                </p>

                <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  From elevated dining and rooftop experiences to relaxed
                  coffee moments and sports-inspired gatherings, every space
                  is designed to create a distinct experience throughout the
                  day.
                </p>

              </div>
            </Reveal>

          </div>
        </Container>
      </section>


      {/* =====================================================
          SKYROOM
      ===================================================== */}

      <section className="py-16 md:py-24">
        <Container>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-2xl">

              <Image
                src="/images/skyroom.png"
                alt="VISTAH Skyroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            </Reveal>


            <Reveal delay={100}>

              <Kicker>01 — Elevated Dining</Kicker>

              <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Skyroom
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Skyroom brings together dining, atmosphere and views in an
                elevated setting designed for contemporary hospitality.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The space can move naturally from relaxed daytime moments
                into a more energetic evening experience, creating a setting
                for dining, drinks and conversation.
              </p>

              <div className="mt-8">
                <CTALink
                  href={`${base}/spaces/skyroom`}
                  variant="primary"
                  className="rounded-xl px-6 py-3"
                >
                  Explore Skyroom
                  <ArrowRight className="h-4 w-4" />
                </CTALink>
              </div>

            </Reveal>

          </div>

        </Container>
      </section>


      {/* =====================================================
          CHAMPIONS CORNER
      ===================================================== */}

      <section className="bg-secondary py-16 md:py-24">
        <Container>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <Reveal
              delay={100}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2"
            >

              <Image
                src="/images/champion.png"
                alt="VISTAH Champions Corner"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            </Reveal>


            <Reveal className="lg:order-1">

              <Kicker>02 — Social Bar</Kicker>

              <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Champions Corner
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Champions Corner is a contemporary social destination
                inspired by sport, celebration and the collective energy
                surrounding the stadium.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                It is designed for shared moments, casual dining, drinks,
                live sporting experiences and gatherings with friends.
              </p>

              <div className="mt-8">
                <CTALink
                  href={`${base}/spaces/champions`}
                  variant="primary"
                  className="rounded-xl px-6 py-3"
                >
                  Explore Champions Corner
                  <ArrowRight className="h-4 w-4" />
                </CTALink>
              </div>

            </Reveal>

          </div>

        </Container>
      </section>


      {/* =====================================================
          COFFEE SHOP
      ===================================================== */}

      <section className="py-16 md:py-24">
        <Container>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-2xl">

              <Image
                src="/images/lobby.png"
                alt="VISTAH Coffee Shop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            </Reveal>


            <Reveal delay={100}>

              <Kicker>03 — Coffee & Everyday Life</Kicker>

              <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Coffee Shop
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A relaxed and welcoming space designed for specialty coffee,
                casual encounters and everyday moments within the rhythm of
                VISTAH.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The experience is intentionally informal, creating a natural
                place to pause, meet, work or simply enjoy the atmosphere.
              </p>

              <div className="mt-8">
                <CTALink
                  href={`${base}/spaces/lobby`}
                  variant="primary"
                  className="rounded-xl px-6 py-3"
                >
                  Explore Coffee Shop
                  <ArrowRight className="h-4 w-4" />
                </CTALink>
              </div>

            </Reveal>

          </div>

        </Container>
      </section>


      {/* =====================================================
          BALLROOM
      ===================================================== */}

      <section className="bg-secondary py-16 md:py-24">
        <Container>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <Reveal
              delay={100}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2"
            >

              <Image
                src="/images/ballroom3.png"
                alt="VISTAH Ballroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

            </Reveal>


            <Reveal className="lg:order-1">

              <Kicker>04 — Events & Gatherings</Kicker>

              <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Ballroom
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A flexible space designed for celebrations, gatherings,
                corporate occasions and memorable events.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Its adaptable layout allows each event to develop its own
                atmosphere while remaining connected to the wider VISTAH
                experience.
              </p>

              <div className="mt-8">
                <CTALink
                  href={`${base}/spaces/ballroom`}
                  variant="primary"
                  className="rounded-xl px-6 py-3"
                >
                  Explore Ballroom
                  <ArrowRight className="h-4 w-4" />
                </CTALink>
              </div>

            </Reveal>

          </div>

        </Container>
      </section>


      {/* =====================================================
          FOOD GALLERY
      ===================================================== */}

      <section className="bg-background py-20 md:py-32">
        <Container>

          <div className="mb-12 max-w-3xl">
            <Kicker>Gastronomic Moodboard</Kicker>

            <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
              A Taste of VISTAH
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Food, textures, ingredients and atmosphere come together to
              express the culinary identity of VISTAH Heredia.
            </p>
          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* Image 1 */}
            <Reveal className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/food-1.png"
                alt="VISTAH food experience"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </Reveal>


            {/* Image 2 */}
            <Reveal
              delay={80}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/food-2.png"
                alt="VISTAH culinary experience"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </Reveal>


            {/* Image 3 */}
            <Reveal
              delay={160}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/food-3.png"
                alt="VISTAH dining experience"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </Reveal>

          </div>


          {/* Wide image */}

          <Reveal
            delay={220}
            className="group relative mt-5 aspect-[16/7] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/food-beverage-hero.png"
              alt="VISTAH food and beverage"
              fill
              sizes="100vw"
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          </Reveal>

        </Container>
      </section>


      {/* =====================================================
          SPACES GALLERY
      ===================================================== */}

      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <Container>

          <div className="mb-12 text-center">
            <Kicker>VISTAH Spaces</Kicker>

            <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
              More Places to Gather
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Explore the spaces that connect food, hospitality, culture
              and everyday life at VISTAH.
            </p>
          </div>


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                src: "/images/rooftop.png",
                title: "Rooftop",
              },
              {
                src: "/images/skyroom.png",
                title: "Skyroom",
              },
              {
                src: "/images/champion.png",
                title: "Champions Corner",
              },
              {
                src: "/images/lobby.png",
                title: "Lobby",
              },
              {
                src: "/images/ballroom3.png",
                title: "Ballroom",
              },
              {
                src: "/images/guest-room.png",
                title: "Guest Experience",
              },
            ].map((image, index) => (

              <Reveal
                key={image.src}
                delay={index * 70}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">

                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="font-serif text-2xl text-white">
                      {image.title}
                    </p>
                  </div>

                </div>
              </Reveal>

            ))}

          </div>

        </Container>
      </section>


      {/* =====================================================
          CULINARY EXPERIENCE
      ===================================================== */}

      <section className="bg-background py-20 md:py-28">
        <Container>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-2xl">

              <Image
                src="/images/rooftop.png"
                alt="VISTAH culinary experience"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

            </Reveal>


            <Reveal delay={100}>

              <Kicker>Culinary Experience</Kicker>

              <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-6xl">
                Food, Drinks & Gathering
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Each VISTAH food and beverage concept is designed around
                a distinct social experience. From casual coffee moments
                to elevated dining and sports-inspired gatherings, the
                spaces evolve throughout the day.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The culinary program combines contemporary presentation,
                local character and an atmosphere that connects guests
                with the wider energy of Heredia.
              </p>

              <div className="mt-8">
                <CTALink
                  href={`${base}/spaces`}
                  variant="primary"
                  className="group rounded-xl px-6 py-3"
                >
                  Explore Spaces

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </CTALink>
              </div>

            </Reveal>

          </div>

        </Container>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-charcoal py-20 text-cream md:py-32">
        <Container>

          <div className="mx-auto max-w-3xl text-center">

            <Kicker className="text-champagne">
              VISTAH Heredia
            </Kicker>

            <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-6xl">
              Where the City Gathers
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              Discover dining, social spaces and experiences created for
              everyday moments, celebrations and everything in between.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <CTALink
                href={`${base}/pre-booking`}
                variant="primary"
                className="rounded-xl px-6 py-3"
              >
                Make an Enquiry
              </CTALink>

              <CTALink
                href={`${base}/spaces`}
                variant="outline"
                className="
                  rounded-xl
                  border-white/20
                  px-6
                  py-3
                  text-cream
                  hover:bg-white
                  hover:text-charcoal
                "
              >
                Explore Spaces
              </CTALink>

            </div>

          </div>

        </Container>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <SiteFooter
        locale={l}
        dict={dict}
      />

    </>
  )
}