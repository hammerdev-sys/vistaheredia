import Image from "next/image"

type FoodImage = {
  id: string
  name: string
  image: string
  span?: string
}

const foodImages: FoodImage[] = [
  {
    id: "risotto",
    name: "RISOTTO",
    image: "/images/Risotto C.jpg",
  },
  {
    id: "rodizzio-de-lomo",
    name: "RODIZZIO DE LOMO",
    image: "/images/RODIZZIO DE LOMO.jpg",
  },
  {
    id: "salmon",
    name: "SALMON",
    image: "/images/SALMON.jpg",
  },
  {
    id: "tataki-de-atun",
    name: "TATAKI DE ATÚN",
    image: "/images/tataki de atun.JPG",
  },
  {
    id: "tiradito-sansei",
    name: "TIRADITO SANSEI",
    image: "/images/tiradito sansei.JPG",
  },
  {
    id: "vaso-crema-de-lucuma",
    name: "VASO CREMA DE LÚCUMA",
    image: "/images/vaso crema de lúcuma.jpg",
  },
]

export default function FoodBeveragePage() {
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
      VISTAH HEREDIA
    </p>

          <h1 className="text-5xl font-light tracking-[0.15em] md:text-7xl">
            FOOD &amp;
            <br />
            BEVERAGE
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-white/60" />

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            A curated collection of culinary destinations shaped around
            atmosphere, gathering, hospitality, and the vibrant energy of
            the city.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/50">
            Culinary Collection
          </p>

          <h2 className="text-3xl font-light tracking-[0.08em] md:text-5xl">
            FOOD &amp; BEVERAGE
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {foodImages.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
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
                  {item.name}
                </h3>
              </div>
            </article>
          ))}

        </div>
      </section>

      {/* BOTTOM */}
      <section className="border-t border-black/10 bg-[#e9e4da] px-6 py-24 text-center">

        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/50">
          VISTAH HEREDIA
        </p>

        <h2 className="text-4xl font-light tracking-[0.1em] md:text-6xl">
          WHERE THE CITY
          <br />
          <span className="font-normal">GATHERS</span>
        </h2>

      </section>

    </main>
  )
}