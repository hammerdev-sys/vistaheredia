import { siteConfig } from "@/lib/content/site"
import { ok, fail } from "@/lib/server/api-response"
import { inquiryEmailHtml } from "@/lib/server/email-templates"
import { EmailConfigError, resolveRecipients, sendEmail } from "@/lib/server/mailer"
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit"
import { isLikelySpam } from "@/lib/server/spam-guard"
import { isValidEmail, str } from "@/lib/server/validate"

/**
 * Sales inquiry endpoint (room blocks + event space). Validates the
 * submission, applies basic spam protection, and emails the sales team via
 * Resend. No data is persisted — there is no admin panel to read it from yet.
 */

export const runtime = "nodejs"

type InquiryPayload = {
  type?: string
  name?: string
  company?: string
  email?: string
  phone?: string
  dates?: string
  rooms?: string
  eventDetails?: string
  guests?: string
  message?: string
  source?: string
  website?: string // honeypot
  ts?: string | number // time trap
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`inquiries:${ip}`, { windowMs: 60_000, max: 5 })
  if (!rateLimit.allowed) {
    return fail(429, "rate_limited", { retryAfterMs: rateLimit.retryAfterMs })
  }

  let data: InquiryPayload
  try {
    data = await request.json()
  } catch {
    return fail(400, "invalid_json")
  }

  if (isLikelySpam(data.website, data.ts)) {
    return ok()
  }

  const type = data.type === "event" ? "event" : "rooms"
  const name = str(data.name, 200)
  const company = str(data.company, 200)
  const email = str(data.email, 320)
  const phone = str(data.phone, 50)
  const dates = str(data.dates, 200)
  const rooms = str(data.rooms, 10)
  const guests = str(data.guests, 10)
  const eventDetails = str(data.eventDetails, 3000)
  const message = str(data.message, 3000)
  const source = str(data.source, 100)

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "required"
  if (!email || !isValidEmail(email)) fieldErrors.email = "invalid"

  if (Object.keys(fieldErrors).length > 0) {
    return fail(422, "validation", { fieldErrors })
  }

  const recipients = resolveRecipients(process.env.SALES_TO_EMAILS, siteConfig.salesEmail)

  try {
    await sendEmail({
      to: recipients,
      replyTo: email,
      subject: `New pre-booking inquiry: ${type === "event" ? "Event space" : "Room block"} — ${name}`,
      html: inquiryEmailHtml({ type, name, company, email, phone, dates, rooms, guests, eventDetails, message, source }),
    })
  } catch (error) {
    if (error instanceof EmailConfigError) {
      console.error("[inquiries] RESEND_API_KEY missing — submission was not emailed:", { name, email, type })
      return fail(500, "email_not_configured")
    }
    console.error("[inquiries] failed to send email:", error)
    return fail(502, "email_failed")
  }

  return ok()
}
