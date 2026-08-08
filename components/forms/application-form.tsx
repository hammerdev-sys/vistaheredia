"use client"

import { useRef, useState } from "react"
import { Upload, FileText } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries/en"
import { Field, TextInput, TextArea, Honeypot } from "@/components/forms/fields"
import { SuccessMessage, ErrorBanner } from "@/components/forms/form-status"

type Status = "idle" | "submitting" | "success" | "error"

export function ApplicationForm({
  dict,
  defaultPosition = "",
}: {
  dict: Dictionary
  defaultPosition?: string
}) {
  const t = dict.careers
  const [status, setStatus] = useState<Status>("idle")
  const [fileName, setFileName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(Date.now()).current

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/applications", { method: "POST", body: formData })
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
        <Field label={t.fields.phone} htmlFor="phone">
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label={t.fields.position} htmlFor="position" required>
          <TextInput id="position" name="position" defaultValue={defaultPosition} required />
        </Field>
      </div>

      <Field label={t.fields.message} htmlFor="message">
        <TextArea id="message" name="message" />
      </Field>

      <Field label={t.fields.resume} htmlFor="resume">
        <div className="flex flex-col gap-2">
          <input
            ref={fileRef}
            id="resume"
            name="resume"
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 self-start rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
          >
            <Upload className="h-4 w-4" />
            {t.chooseFile}
          </button>
          {fileName && (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              {fileName}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{t.resumeHint}</span>
        </div>
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
