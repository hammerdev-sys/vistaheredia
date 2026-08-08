"use client"

import { useRef, useState } from "react"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import { Field, TextInput, TextArea, Select, Honeypot } from "@/components/forms/fields"
import { SuccessMessage, ErrorBanner } from "@/components/forms/form-status"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

export function InquiryForm({ dict }: { dict: Dictionary }) {
  const t = dict.sales
  const c = dict.common
  const [type, setType] = useState<"rooms" | "event">("rooms")
  const [status, setStatus] = useState<Status>("idle")
  const startedAt = useRef(Date.now()).current

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type }),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return <SuccessMessage title={t.successTitle} body={t.successBody} />
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <Honeypot startedAt={startedAt} />
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-sm font-medium text-foreground">{t.inquiryTypeLabel}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { key: "rooms", label: t.inquiryTypeRooms },
              { key: "event", label: t.inquiryTypeEvent },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setType(opt.key)}
              aria-pressed={type === opt.key}
              className={cn(
                "rounded-md border px-4 py-3 text-sm font-medium transition-colors",
                type === opt.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:border-primary/40",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.fields.name} htmlFor="name" required>
          <TextInput id="name" name="name" autoComplete="name" required />
        </Field>
        <Field label={t.fields.company} htmlFor="company" optionalLabel={c.optional}>
          <TextInput id="company" name="company" autoComplete="organization" />
        </Field>
        <Field label={t.fields.email} htmlFor="email" required>
          <TextInput id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label={t.fields.phone} htmlFor="phone" optionalLabel={c.optional}>
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label={t.fields.dates} htmlFor="dates" optionalLabel={c.optional}>
          <TextInput id="dates" name="dates" placeholder="—" />
        </Field>
        {type === "rooms" ? (
          <Field label={t.fields.rooms} htmlFor="rooms" optionalLabel={c.optional}>
            <TextInput id="rooms" name="rooms" type="number" min="0" inputMode="numeric" />
          </Field>
        ) : (
          <Field label={t.fields.guests} htmlFor="guests" optionalLabel={c.optional}>
            <TextInput id="guests" name="guests" type="number" min="0" inputMode="numeric" />
          </Field>
        )}
      </div>

      {type === "event" && (
        <Field label={t.fields.eventDetails} htmlFor="eventDetails" optionalLabel={c.optional}>
          <TextArea id="eventDetails" name="eventDetails" />
        </Field>
      )}

      <Field label={t.fields.message} htmlFor="message" optionalLabel={c.optional}>
        <TextArea id="message" name="message" />
      </Field>

      <Field label={t.fields.source} htmlFor="source" optionalLabel={c.optional}>
        <Select id="source" name="source" defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.sourceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </Field>

      {status === "error" && <ErrorBanner title={t.errorTitle} body={t.errorBody} />}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  )
}
