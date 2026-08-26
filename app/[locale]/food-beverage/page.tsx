import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type VenueImage = {
  src: string;
  alt: string;
};

type VenueSection = {
  id: string;
  title: string;
  mainImage: VenueImage;
  images: VenueImage[];
};

const venueSections: VenueSection[] = [
  {
    id: "skyroom",
    title: "SKYROOM",

    mainImage: {
      src: "/images/food/skyroom-main.png",
      alt: "Skyroom lounge at dusk",
    },

    images: [
      {
        src: "/images/food/skyroom-main.png",
        alt: "Skyroom lounge at dusk",
      },
      {
        src: "/images/food/entrehojas.png",
        alt: "Skyroom bar and seating",
      },
      {
        src: "/images/food/Chupe-c.jpg",
        alt: "Views from the Skyroom",
      },
      {
        src: "/images/food/camembert-crocante.jpg",
        alt: "Skyroom at golden hour",
      },
      {
        src: "/images/food/bouillabaise-chalaca.jpg",
        alt: "Skyroom dining experience",
      },
      {
        src: "/images/food/Arroz-con-pato.jpg",
        alt: "Skyroom dining experience",
      },
    ],
  },

  {
    id: "coffee",
    title: "COFFEE SHOP",

    mainImage: {
      src: "/images/food/coffee.png",
      alt: "Lobby coffee shop",
    },

    images: [
       {
        src: "/images/food/Golden-Hour-Latte.png",
        alt: "Champions Corner sports bar terrace",
      },
       {
        src: "/images/food/piqueo-3-amigoes.png",
        alt: "Champions Corner sports bar terrace",
      },
        {
        src: "/images/food/Sunrise-Café-Platter.png",
        alt: "Champions Corner sports bar terrace",
      },
        {
        src: "/images/food/Pasta.png",
        alt: "Champions Corner sports bar terrace",
      },
         {
        src: "/images/food/Avacado-dish.png",
        alt: "Champions Corner sports bar terrace",
      },
        {
        src: "/images/food/Forest-Focaccia.png",
        alt: "Champions Corner sports bar terrace",
      },
    ],
  },

  {
    id: "champions",
    title: "CHAMPIONS CORNER",

    mainImage: {
      src: "/images/food/champion-main.png",
      alt: "Champions Corner main space",
    },

    images: [
      {
        src: "/images/food/ponderaciones.jpg",
        alt: "Champions Corner social bar",
      },
      {
        src: "/images/food/rodizzio-de-lomo.jpg",
        alt: "Champions Corner on match day",
      },
      {
        src: "/images/food/piqueo-3-amigoes.png",
        alt: "Champions Corner sports bar terrace",
      },
        {
        src: "/images/food/Pasta.png",
        alt: "Champions Corner sports bar terrace",
      },
         {
        src: "/images/food/Avacado-dish.png",
        alt: "Champions Corner sports bar terrace",
      },
        {
        src: "/images/food/Forest-Focaccia.png",
        alt: "Champions Corner sports bar terrace",
      },
    ],
  },

  {
    id: "ballroom",
    title: "BALLROOM",

    mainImage: {
      src: "/images/food/ballroom-main.png",
      alt: "Ballroom set for an event",
    },

    images: [
      {
        src: "/images/food/cup-cake-arandano.png",
        alt: "Blueberry cupcake",
      },
      {
        src: "/images/food/Copia-de-Risotto-C.png",
        alt: "Risotto",
      },
      {
        src: "/images/food/rodizzio-de-lomo.jpg",
        alt: "Churros",
      },
      {
        src: "/images/food/ceviche.jpg",
        alt: "Ceviche",
      },
      {
        src: "/images/food/vaso-crema-de-lúcuma.jpg",
        alt: "Lúcuma cream glass",
      },
    ],
  },
];

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function FoodBeveragePage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);
  const t = dict.foodBeverage;

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#191919] selection:bg-neutral-300">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
        <Image
          src="/images/food/skyroom-main.png"
          alt="VISTAH Food and Beverage"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 px-6 text-center text-white">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/70">
            {t.heroKicker}
          </p>

          <h1 className="text-5xl font-light tracking-[0.15em] md:text-7xl">
            {t.heroTitle.split("\n").map(
              (line: string, index: number) => (
                <span key={index}>
                  {index > 0 && <br />}
                  {line}
                </span>
              )
            )}
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-white/60" />

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            {t.heroIntro}
          </p>
        </div>
      </section>

      {/* =========================================================
          VENUE SECTIONS
      ========================================================= */}
      <section className="bg-[#f4f1eb]">
        {venueSections.map((venue, venueIndex) => {
          const venueText = t.venues.find((v) => v.id === venue.id);

          return (
          <section
            key={venue.id}
            id={venue.id}
            className="border-t border-black/10 py-16 md:py-24"
          >
            {/* =================================================
                MAIN IMAGE LEFT + CONTENT RIGHT
            ================================================= */}
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">

                {/* LEFT - MAIN VENUE IMAGE */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={venue.mainImage.src}
                    alt={venue.mainImage.alt}
                    fill
                    priority={venueIndex === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* RIGHT - VENUE CONTENT */}
                <div className="max-w-xl">

                 

                  <h2 className="text-4xl font-light tracking-[0.12em] md:text-5xl lg:text-6xl">
                    {venue.title}
                  </h2>

                  <div className="my-7 h-px w-16 bg-black/30" />

                  {venueText?.description && (
                    <p className="max-w-md text-sm leading-7 text-black/60 md:text-base">
                      {venueText.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                VENUE IMAGE SLIDER
            ================================================= */}
            <div className="venue-slider-wrapper mt-12 md:mt-16">
              <div className="venue-slider">

                {/* ORIGINAL IMAGES */}
                {venue.images.map((image, index) => (
                  <div
                    key={`${venue.id}-image-${index}`}
                    className="venue-slide"
                  >
                    <div className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="360px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}

                {/* DUPLICATE IMAGES
                    Required for continuous slider */}
                {venue.images.map((image, index) => (
                  <div
                    key={`${venue.id}-duplicate-${index}`}
                    className="venue-slide"
                    aria-hidden="true"
                  >
                    <div className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="360px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </section>
          );
        })}
      </section>

      {/* =========================================================
          BOTTOM
      ========================================================= */}
      <section className="border-t border-black/10 bg-[#e9e4da] px-6 py-24 text-center">

        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/50">
          {t.bottomKicker}
        </p>

        <h2 className="text-4xl font-light tracking-[0.1em] md:text-6xl">
          {t.bottomTitle.split("\n").map(
            (line: string, index: number) => (
              <span
                key={index}
                className={index > 0 ? "font-normal" : undefined}
              >
                {index > 0 && <br />}
                {line}
              </span>
            )
          )}
        </h2>

      </section>

      {/* =========================================================
          SLIDER CSS
      ========================================================= */}
      <style>{`
        .venue-slider-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .venue-slider {
          display: flex;
          width: max-content;
          gap: 24px;
          animation: venueScroll 18s linear infinite;
          will-change: transform;
        }

        .venue-slider:hover {
          animation-play-state: paused;
        }

        .venue-slide {
          width: 360px;
          flex: 0 0 360px;
        }

        @keyframes venueScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        @media (max-width: 1024px) {
          .venue-slide {
            width: 320px;
            flex-basis: 320px;
          }

          .venue-slider {
            gap: 20px;
            animation-duration: 16s;
          }
        }

        @media (max-width: 640px) {
          .venue-slide {
            width: 78vw;
            flex-basis: 78vw;
          }

          .venue-slider {
            gap: 16px;
            animation-duration: 14s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .venue-slider {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}