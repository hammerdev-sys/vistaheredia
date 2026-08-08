/**
 * Two lightweight, dependency-free spam signals used alongside rate limiting:
 *  - Honeypot: a field real users never see or fill; bots that auto-fill every
 *    input trip it.
 *  - Time trap: the form records a client-side render timestamp; submissions
 *    that arrive faster than a human could plausibly fill the form are almost
 *    always scripted.
 *
 * Both are advisory, not authoritative — treat a "tripped" submission as spam
 * and return a normal success response (so bots don't learn to adapt) without
 * sending an email.
 */

const MIN_HUMAN_SUBMIT_MS = 1500

export function isHoneypotTripped(value: FormDataEntryValue | string | null | undefined): boolean {
  if (typeof value === "string") return value.trim().length > 0
  return Boolean(value)
}

export function isSubmittedTooFast(startedAt: FormDataEntryValue | string | number | null | undefined): boolean {
  const ts = Number(startedAt)
  if (!Number.isFinite(ts) || ts <= 0) return false
  return Date.now() - ts < MIN_HUMAN_SUBMIT_MS
}

export function isLikelySpam(
  honeypot: FormDataEntryValue | string | null | undefined,
  startedAt: FormDataEntryValue | string | number | null | undefined,
): boolean {
  return isHoneypotTripped(honeypot) || isSubmittedTooFast(startedAt)
}
