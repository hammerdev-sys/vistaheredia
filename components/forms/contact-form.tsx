"use client"

import { useRef, useState } from "react"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import { Field, TextInput, TextArea, Honeypot } from "@/components/forms/fields"
import { SuccessMessage, ErrorBanner } from "@/components/forms/form-status"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact
  const [status, setStatus] = useState<Status>("idle")
  const startedAt = useRef(Date.now()).current

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.fields.name} htmlFor="name" required>
          <TextInput id="name" name="name" autoComplete="name" required />
        </Field>
        <Field label={t.fields.email} htmlFor="email" required>
          <TextInput id="email" name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <Field label={t.fields.subject} htmlFor="subject">
        <TextInput id="subject" name="subject" />
      </Field>
      <Field label={t.fields.message} htmlFor="message" required>
        <TextArea id="message" name="message" required />
      </Field>

      {status === "error" && <ErrorBanner title={t.errorTitle} body={t.errorBody} />}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center self-start rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  )
}
