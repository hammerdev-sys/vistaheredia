"use client"

import { useState } from "react"
import { MapPin, Briefcase, ChevronDown } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import type { Locale } from "@/lib/i18n/config"
import type { Job } from "@/lib/content/jobs"
import { Container, SectionHeading } from "@/components/section"
import { ApplicationForm } from "@/components/forms/application-form"
import { cn } from "@/lib/utils"

export function JobsSection({
  dict,
  locale,
  jobs,
}: {
  dict: Dictionary
  locale: Locale
  jobs: Job[]
}) {
  const t = dict.careers
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedPosition, setSelectedPosition] = useState("")

  function apply(title: string) {
    setSelectedPosition(title)
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section id="open-roles" className="scroll-mt-24 bg-background py-20 md:py-28">
        <Container>
          <SectionHeading kicker={t.kicker} title={t.openRolesTitle} />
          <ul className="mt-10 flex flex-col gap-4">
            {jobs.map((job) => {
              const open = openId === job.id
              return (
                <li
                  key={job.id}
                  id={job.id}
                  className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : job.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <div>
                      <h3 className="font-serif text-xl text-card-foreground md:text-2xl">
                        {job.title[locale]}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          {job.department[locale]}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.location[locale]}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-border px-6 pb-6 pt-5">
                      <p className="text-pretty leading-relaxed text-muted-foreground">
                        {job.summary[locale]}
                      </p>
                      <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                        {t.requirementsTitle}
                      </h4>
                      <ul className="mt-3 flex flex-col gap-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {req[locale]}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => apply(job.title[locale])}
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {t.applyNow}
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 rounded-lg border border-dashed border-border bg-secondary p-7">
            <h3 className="font-serif text-xl text-foreground">{t.generalTitle}</h3>
            <p className="text-pretty leading-relaxed text-muted-foreground">{t.generalBody}</p>
            <button
              type="button"
              onClick={() => apply("")}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-full border border-primary px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              {t.generalApply}
            </button>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-20 bg-secondary py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-7 md:p-10">
            <h2 className="font-serif text-2xl text-card-foreground md:text-3xl">{t.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.formSubtitle}</p>
            <div className="mt-8">
              <ApplicationForm
                key={selectedPosition}
                dict={dict}
                defaultPosition={selectedPosition}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
