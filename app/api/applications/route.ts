import { siteConfig } from "@/lib/content/site"
import { ok, fail } from "@/lib/server/api-response"
import { applicationEmailHtml } from "@/lib/server/email-templates"
import { EmailConfigError, resolveRecipients, sendEmail } from "@/lib/server/mailer"
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit"
import { isLikelySpam } from "@/lib/server/spam-guard"
import { isValidEmail, str } from "@/lib/server/validate"

/**
 * Careers application endpoint. Accepts multipart form data (including an
 * optional CV/resume PDF), validates it, and emails the applicant details
 * to the careers team via Resend with the resume attached directly to the
 * notification — nothing is stored server-side, since there's no admin
 * panel yet to read a stored file from.
 *
 * If persistence is added later (e.g. Vercel Blob + a database), upload the
 * file first and store its URL instead of/alongside attaching it inline.
 */

export const runtime = "nodejs"

const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5MB, matches the client-side hint

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`applications:${ip}`, { windowMs: 60_000, max: 5 })
  if (!rateLimit.allowed) {
    return fail(429, "rate_limited", { retryAfterMs: rateLimit.retryAfterMs })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return fail(400, "invalid_form")
  }

  const website = form.get("website")
  const ts = form.get("ts")
  if (isLikelySpam(website, ts as string | null)) {
    return ok()
  }

  const name = str(form.get("name"), 200)
  const email = str(form.get("email"), 320)
  const phone = str(form.get("phone"), 50)
  const position = str(form.get("position"), 200)
  const message = str(form.get("message"), 5000)
  const resume = form.get("resume")

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "required"
  if (!email || !isValidEmail(email)) fieldErrors.email = "invalid"
  if (!position) fieldErrors.position = "required"

  const hasResume = resume instanceof File && resume.size > 0
  if (hasResume) {
    const file = resume as File
    if (file.type !== "application/pdf") {
      fieldErrors.resume = "type"
    } else if (file.size > MAX_RESUME_BYTES) {
      fieldErrors.resume = "size"
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail(422, "validation", { fieldErrors })
  }

  const attachments: { filename: string; content: string }[] = []
  if (hasResume) {
    const file = resume as File
    const buffer = Buffer.from(await file.arrayBuffer())
    attachments.push({
      filename: file.name || `resume-${name.replace(/\s+/g, "-").toLowerCase()}.pdf`,
      content: buffer.toString("base64"),
    })
  }

  const recipients = resolveRecipients(process.env.CAREERS_TO_EMAILS, siteConfig.careersEmail)

  try {
    await sendEmail({
      to: recipients,
      replyTo: email,
      subject: `New application: ${position} — ${name}`,
      html: applicationEmailHtml({ name, email, phone, position, message, hasResume }),
      attachments,
    })
  } catch (error) {
    if (error instanceof EmailConfigError) {
      console.error("[applications] RESEND_API_KEY missing — submission was not emailed:", { name, email, position })
      return fail(500, "email_not_configured")
    }
    console.error("[applications] failed to send email:", error)
    return fail(502, "email_failed")
  }

  return ok()
}
