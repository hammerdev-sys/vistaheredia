/**
 * Thin wrapper around the Resend HTTP API (https://resend.com/docs/api-reference/emails/send-email).
 * Uses `fetch` directly instead of the `resend` SDK so no extra dependency is
 * required — this repo already targets the Node runtime for API routes.
 */

const RESEND_API_URL = "https://api.resend.com/emails"

export class EmailConfigError extends Error {
  constructor() {
    super("RESEND_API_KEY is not configured")
    this.name = "EmailConfigError"
  }
}

export type EmailAttachment = {
  filename: string
  /** Base64-encoded file content. */
  content: string
}

export type SendEmailInput = {
  to: string[]
  subject: string
  html: string
  replyTo?: string
  attachments?: EmailAttachment[]
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new EmailConfigError()
  }

  const from = process.env.EMAIL_FROM ?? "VISTAH Heredia <onboarding@resend.dev>"

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo,
      attachments: input.attachments,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Resend API error (${res.status}): ${body}`)
  }
}

/**
 * Reads a comma-separated list of recipients from an env var, falling back
 * to a single default address if the var is unset or empty. Lets each form
 * notify multiple people (e.g. "sales@vistaheredia.com,gm@vistaheredia.com")
 * purely via environment configuration.
 */
export function resolveRecipients(envValue: string | undefined, fallback: string): string[] {
  const list = (envValue ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)
  return list.length > 0 ? list : [fallback]
}
