import Image from "next/image"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

const dishImages: Record<string, string> = {
  risotto: "/images/Risotto%20C.jpg",
  "rodizzio-de-lomo": "/images/RODIZZIO%20DE%20LOMO.jpg",
  salmon: "/images/SALMON.jpg",
  "tataki-de-atun": "/images/tataki%20de%20atun.JPG",
  "tiradito-sansei": "/images/tiradito%20sansei.JPG",
  "vaso-crema-de-lucuma": "/images/vaso%20crema%20de%20lúcuma.jpg",
}

export default async function FoodBeveragePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale as Locale)
  const t = dict.foodBeverage

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#191919]">

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
        <Image
    src="/images/food-beverage.png"
    alt="VISTAH Food and Beverage"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />

  <div className="absolute inset-0 bg-black/45" />

  <div className="relative z-10 px-6 text-center text-white">
    <p className="mb-6 text-xs uppercase tracking-[0.4em]">
      {t.heroKicker}
    </p>

          <h1 className="text-5xl font-light tracking-[0.15em] md:text-7xl">
            {t.heroTitle.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-white/60" />

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            {t.heroIntro}
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/50">
            {t.galleryKicker}
          </p>

          <h2 className="text-3xl font-light tracking-[0.08em] md:text-5xl">
            {t.galleryTitle}
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {t.dishes.map((dish, index) => (
            <article
              key={dish.id}
              className="group overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={dishImages[dish.id] || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="px-6 py-5">
                <div className="mb-2 text-[10px] tracking-[0.25em] text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#191919]">
                  {dish.name}
                </h3>
              </div>
            </article>
          ))}

        </div>
      </section>

      {/* BOTTOM */}
      <section className="border-t border-black/10 bg-[#e9e4da] px-6 py-24 text-center">

        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/50">
          {t.bottomKicker}
        </p>

        <h2 className="text-4xl font-light tracking-[0.1em] md:text-6xl">
          {t.bottomTitle.split("\n").map((line, i) => (
            <span key={i} className={i > 0 ? "font-normal" : undefined}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>

      </section>

    </main>
  )
}
