function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return ""
  return `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(
    label,
  )}</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
}

function wrap(heading: string, bodyHtml: string): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
      <h2 style="margin:0 0 16px;font-size:18px;">${escapeHtml(heading)}</h2>
      ${bodyHtml}
    </div>
  `
}

export function contactEmailHtml(data: { name: string; email: string; subject?: string; message: string }): string {
  const table = `
    <table cellpadding="0" cellspacing="0">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Subject", data.subject)}
    </table>
    <p style="margin-top:16px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `
  return wrap("New contact message", table)
}

export function inquiryEmailHtml(data: {
  type: string
  name: string
  company?: string
  email: string
  phone?: string
  dates?: string
  rooms?: string
  guests?: string
  eventDetails?: string
  message?: string
  source?: string
}): string {
  const table = `
    <table cellpadding="0" cellspacing="0">
      ${row("Inquiry type", data.type === "event" ? "Event space / ballroom" : "Room block / group")}
      ${row("Name", data.name)}
      ${row("Company", data.company)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Preferred dates", data.dates)}
      ${row("Number of rooms", data.rooms)}
      ${row("Estimated guests", data.guests)}
      ${row("How they heard about us", data.source)}
    </table>
    ${data.eventDetails ? `<p style="margin-top:16px;"><strong>Event details</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.eventDetails)}</p>` : ""}
    ${data.message ? `<p style="margin-top:16px;"><strong>Message</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : ""}
  `
  return wrap("New pre-booking inquiry", table)
}

export function applicationEmailHtml(data: {
  name: string
  email: string
  phone?: string
  position: string
  message?: string
  hasResume: boolean
}): string {
  const table = `
    <table cellpadding="0" cellspacing="0">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Position", data.position)}
      ${row("Resume attached", data.hasResume ? "Yes (see attachment)" : "No")}
    </table>
    ${data.message ? `<p style="margin-top:16px;"><strong>Message</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>` : ""}
  `
  return wrap("New job application", table)
}
