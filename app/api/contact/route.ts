import { siteConfig } from "@/lib/content/site"
import { ok, fail } from "@/lib/server/api-response"
import { contactEmailHtml } from "@/lib/server/email-templates"
import { EmailConfigError, resolveRecipients, sendEmail } from "@/lib/server/mailer"
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit"
import { isLikelySpam } from "@/lib/server/spam-guard"
import { isValidEmail, str } from "@/lib/server/validate"

/**
 * General contact endpoint. Validates the submission, applies basic spam
 * protection (honeypot + time trap + IP rate limit), and emails the
 * message to the configured recipients via Resend. No data is persisted —
 * there is no admin panel to read it from yet.
 */

export const runtime = "nodejs"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string // honeypot — real users never see or fill this
  ts?: string | number // client render timestamp, used as a time trap
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`contact:${ip}`, { windowMs: 60_000, max: 5 })
  if (!rateLimit.allowed) {
    return fail(429, "rate_limited", { retryAfterMs: rateLimit.retryAfterMs })
  }

  let data: ContactPayload
  try {
    data = await request.json()
  } catch {
    return fail(400, "invalid_json")
  }

  // Bot-shaped submissions get a normal success response (so scripts don't
  // learn to adapt) but are never emailed.
  if (isLikelySpam(data.website, data.ts)) {
    return ok()
  }

  const name = str(data.name, 200)
  const email = str(data.email, 320)
  const subject = str(data.subject, 200)
  const message = str(data.message, 5000)

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "required"
  if (!email || !isValidEmail(email)) fieldErrors.email = "invalid"
  if (!message) fieldErrors.message = "required"

  if (Object.keys(fieldErrors).length > 0) {
    return fail(422, "validation", { fieldErrors })
  }

  const recipients = resolveRecipients(process.env.CONTACT_TO_EMAILS, siteConfig.email)

  try {
    await sendEmail({
      to: recipients,
      replyTo: email,
      subject: `New contact message${subject ? `: ${subject}` : ""}`,
      html: contactEmailHtml({ name, email, subject, message }),
    })
  } catch (error) {
    if (error instanceof EmailConfigError) {
      console.error("[contact] RESEND_API_KEY missing — submission was not emailed:", { name, email, subject })
      return fail(500, "email_not_configured")
    }
    console.error("[contact] failed to send email:", error)
    return fail(502, "email_failed")
  }

  return ok()
}
