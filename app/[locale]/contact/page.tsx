import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Mail, Phone, Briefcase, Handshake } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata } from "@/lib/i18n/metadata";
import { siteConfig } from "@/lib/content/site";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/section";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/contact",
    title: `${dict.contact.title} — VISTAH Heredia`,
    description: dict.contact.intro,
    image: "/images/exterior-day.png",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const t = dict.contact;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PageHero
        kicker={t.kicker}
        title={t.title}
        intro={t.intro}
        image="/images/exterior-day.png"
        imageAlt="Exterior of VISTAH Heredia beside the stadium"
      />

      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Info Cards, Directions & Map */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              {/* Info Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Email */}
                <Reveal delay={60} className="h-full">
                  <InfoCard
                    icon={<Mail className="h-5 w-5" />}
                    title={t.emailTitle}
                  >
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="break-words underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                    >
                      {siteConfig.email}
                    </a>
                  </InfoCard>
                </Reveal>

                {/* Phone */}
                <Reveal delay={120} className="h-full">
                  <InfoCard
                    icon={<Phone className="h-5 w-5" />}
                    title={t.phoneTitle}
                  >
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="break-words underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>
                  </InfoCard>
                </Reveal>

                {/* Address - wider */}
                <Reveal delay={0} className="h-full sm:col-span-2">
                  <InfoCard
                    icon={<MapPin className="h-5 w-5" />}
                    title={t.addressTitle}
                  >
                    {t.address}
                  </InfoCard>
                </Reveal>
              </div>

              {/* Directions Box */}
              <Reveal delay={300}>
                <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm">
                  <h2 className="font-serif text-xl text-card-foreground tracking-tight">
                    {t.directionsTitle}
                  </h2>
                  <dl className="mt-5 divide-y divide-border/60">
                    {t.directions.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between gap-6 py-3.5 first:pt-0 last:pb-0"
                      >
                        <dt className="text-sm text-muted-foreground">
                          {d.label}
                        </dt>
                        <dd className="text-right text-sm font-medium text-card-foreground">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              {/* Map Box */}
              <Reveal delay={360}>
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
                  <iframe
                    src={siteConfig.mapEmbedSrc}
                    title={t.addressTitle}
                    loading="lazy"
                    className="h-72 w-full grayscale contrast-125 opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <Reveal className="h-full">
                <div className="rounded-2xl border border-border/80 bg-card p-8 md:p-10 shadow-sm">
                  <h2 className="font-serif text-2xl md:text-3xl text-card-foreground tracking-tight">
                    {t.formTitle}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.formSubtitle}
                  </p>

                  <div className="mt-8">
                    <ContactForm dict={dict} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h3>
      <div className="text-pretty text-sm leading-relaxed text-card-foreground">
        {children}
      </div>
    </div>
  );
}
