import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Mail, Phone, Briefcase, Handshake } from "lucide-react"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { buildMetadata } from "@/lib/i18n/metadata"
import { siteConfig } from "@/lib/content/site"
import { PageHero } from "@/components/page-hero"
import { Container } from "@/components/section"
import { ContactForm } from "@/components/forms/contact-form"

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
    path: "/contact",
    title: `${dict.contact.title} — VISTAH Heredia`,
    description: dict.contact.intro,
    image: "/images/exterior-day.png",
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale as Locale)
  const t = dict.contact

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/exterior-day.png"
        imageAlt="Exterior of VISTAH Heredia beside the stadium"
      />

      <section className="bg-background py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Info */}
            <div className="flex flex-col gap-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoCard icon={<MapPin className="h-5 w-5" />} title={t.addressTitle}>
                  {t.address}
                </InfoCard>
                <InfoCard icon={<Mail className="h-5 w-5" />} title={t.emailTitle}>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                    {siteConfig.email}
                  </a>
                </InfoCard>
                <InfoCard icon={<Phone className="h-5 w-5" />} title={t.phoneTitle}>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </InfoCard>
                <InfoCard icon={<Handshake className="h-5 w-5" />} title={t.salesTitle}>
                  <a href={`mailto:${siteConfig.salesEmail}`} className="hover:text-primary">
                    {siteConfig.salesEmail}
                  </a>
                </InfoCard>
                <InfoCard icon={<Briefcase className="h-5 w-5" />} title={t.careersTitle}>
                  <a href={`mailto:${siteConfig.careersEmail}`} className="hover:text-primary">
                    {siteConfig.careersEmail}
                  </a>
                </InfoCard>
              </div>

              {/* Directions */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-serif text-xl text-card-foreground">{t.directionsTitle}</h2>
                <dl className="mt-4 divide-y divide-border">
                  {t.directions.map((d) => (
                    <div key={d.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">{d.label}</dt>
                      <dd className="text-right text-sm font-medium text-card-foreground">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-lg border border-border">
                <iframe
                  src={siteConfig.mapEmbedSrc}
                  title={t.addressTitle}
                  loading="lazy"
                  className="h-72 w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="rounded-lg border border-border bg-card p-7 md:p-9">
              <h2 className="font-serif text-2xl text-card-foreground">{t.formTitle}</h2>
              <div className="mt-8">
                <ContactForm dict={dict} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h3>
      <p className="text-pretty text-sm leading-relaxed text-card-foreground">{children}</p>
    </div>
  )
}
