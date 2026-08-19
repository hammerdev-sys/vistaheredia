import Image from "next/image"
import Link from "next/link"

type FoodSection = {
  id: string
  title: string
  subtitle?: string
  image: string
  description?: string
  caption?: string
  position?: string
  overlay?: boolean
}

const foodSections: FoodSection[] = [
  {
    id: "skyroom",
    title: "SKYROOM",
    image: "/images/food/skyroom.jpg",
    position: "center",
    description:
      "The Skyroom is envisioned as an elevated gastronomic experience where atmosphere, views of the city, and sensory experience come together in a contemporary setting.",
  },

  {
    id: "skyroom-starters",
    title: "SKYROOM",
    subtitle: "moodboard (Starters)",
    image: "/images/food/skyroom-starters.jpg",
    position: "center",
  },

  {
    id: "skyroom-mains",
    title: "SKYROOM",
    subtitle: "moodboard (Mains)",
    image: "/images/food/skyroom-mains.jpg",
    position: "center",
  },

  {
    id: "skyroom-desserts",
    title: "SKYROOM",
    subtitle: "moodboard (Desserts)",
    image: "/images/food/skyroom-desserts.jpg",
    position: "center",
  },

  {
    id: "skyroom-menu",
    title: "SKYROOM",
    subtitle: "SAMPLE MENU",
    image: "/images/food/skyroom-menu.jpg",
    position: "center",
  },

  {
    id: "champions",
    title: "CHAMPIONS CORNER",
    image: "/images/food/champions-corner.jpg",
    position: "center",
    description:
      "Champions Corner is a contemporary social bar inspired by collective game-day gatherings and celebration.",
  },

  {
    id: "champions-moodboard",
    title: "CHAMPIONS CORNER",
    subtitle: "moodboard",
    image: "/images/food/champions-moodboard.jpg",
    position: "center",
  },

  {
    id: "champions-menu",
    title: "CHAMPIONS CORNER",
    subtitle: "SAMPLE MENU",
    image: "/images/food/champions-menu.jpg",
    position: "center",
  },

  {
    id: "coffee",
    title: "COFFEE SHOP",
    image: "/images/food/coffee-shop.jpg",
    position: "center",
    description:
      "The Coffee Shop is envisioned as a calm and welcoming space designed to accompany everyday life, casual encounters, and pauses within the rhythm of the day.",
  },

  {
    id: "ballroom",
    title: "BALLROOM",
    subtitle: "Moodboard",
    image: "/images/food/ballroom.jpg",
    position: "center",
  },
]

export default function FoodBeveragePage() {
  return (
    <main className="food-page bg-[#f4f1eb] text-[#191919]">
      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#171717]">
        <div className="absolute inset-0">
          <Image
            src="/images/food/food-hero.jpg"
            alt="VISTAH Food and Beverage"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 px-6 text-center text-white">
          <p className="mb-5 text-xs uppercase tracking-[0.45em]">
            VISTAH HEREDIA
          </p>

          <h1 className="text-5xl font-light tracking-[0.18em] md:text-7xl lg:text-8xl">
            FOOD &amp;
            <br />
            BEVERAGE
          </h1>

          <div className="mx-auto mt-8 h-px w-20 bg-white/70" />

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            A collection of culinary experiences shaped around
            atmosphere, gathering, hospitality, and the energy of
            the city.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 md:px-8 lg:px-12">
        <div className="space-y-8 md:space-y-12">
          {foodSections.map((section, index) => (
            <FoodImageSection
              key={section.id}
              section={section}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-black/10 bg-[#e9e4da] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-black/50">
            VISTAH HEREDIA
          </p>

          <h2 className="text-4xl font-light tracking-[0.12em] md:text-6xl">
            WHERE THE CITY
            <br />
            GATHERS
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
            From elevated dining to relaxed social spaces, every
            culinary destination at VISTAH is designed as part of
            the wider experience.
          </p>

          <div className="mt-10">
            <Link
              href="#top"
              className="
                inline-flex
                items-center
                border
                border-black/30
                px-7
                py-3
                text-xs
                uppercase
                tracking-[0.2em]
                transition
                hover:bg-black
                hover:text-white
              "
            >
              Back to Top
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

/* =========================================================
   IMAGE SECTION
========================================================= */

function FoodImageSection({
  section,
  index,
}: {
  section: FoodSection
  index: number
}) {
  return (
    <article
      id={section.id}
      className="group relative overflow-hidden bg-white"
    >
      {/* IMAGE */}

      <div className="relative aspect-[16/9] min-h-[480px] w-full overflow-hidden md:min-h-[620px] lg:min-h-[720px]">
        <Image
          src={section.image}
          alt={
            section.subtitle
              ? `${section.title} ${section.subtitle}`
              : section.title
          }
          fill
          sizes="(max-width: 768px) 100vw, 1500px"
          className={`
            object-cover
            transition-transform
            duration-700
            group-hover:scale-[1.015]
            object-${section.position || "center"}
          `}
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

        {/* TEXT */}

        <div className="absolute inset-0 p-7 md:p-12 lg:p-16">
          <div className="flex h-full flex-col justify-between">
            {/* TOP TITLE */}

            <div>
              <div className="flex flex-wrap items-end gap-x-6 gap-y-1">
                <h2
                  className="
                    text-4xl
                    font-semibold
                    tracking-[0.12em]
                    text-white
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
                    md:text-6xl
                    lg:text-7xl
                  "
                >
                  {section.title}
                </h2>

                {section.subtitle && (
                  <p
                    className="
                      pb-1
                      text-xl
                      font-light
                      tracking-[0.06em]
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
                      md:text-2xl
                      lg:text-3xl
                    "
                  >
                    {section.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}

            {section.description && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div />

                <div className="max-w-xl">
                  <p
                    className="
                      text-sm
                      leading-7
                      tracking-[0.04em]
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]
                      md:text-base
                      md:leading-8
                    "
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            )}

            {/* CAPTION */}

            {section.caption && (
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                {section.caption}
              </p>
            )}
          </div>
        </div>

        {/* SECTION NUMBER */}

        <div
          className="
            absolute
            bottom-6
            left-7
            text-xs
            tracking-[0.3em]
            text-white/70
            md:left-12
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </article>
  )
}