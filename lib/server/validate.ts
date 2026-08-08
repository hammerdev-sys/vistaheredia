export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Trim a form value and cap its length. Non-string input becomes an empty string. */
export function str(value: FormDataEntryValue | string | null | undefined, maxLength = 2000): string {
  const s = typeof value === "string" ? value : ""
  return s.trim().slice(0, maxLength)
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 320
}
