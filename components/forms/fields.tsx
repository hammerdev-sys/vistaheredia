import { cn } from "@/lib/utils"

const baseField =
  "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"

export function Field({
  label,
  htmlFor,
  required,
  optionalLabel,
  children,
  className,
}: {
  label: string
  htmlFor: string
  required?: boolean
  optionalLabel?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-1 text-xs font-normal text-muted-foreground">({optionalLabel})</span>
        ) : null}
      </label>
      {children}
    </div>
  )
}

export function TextInput({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(baseField, className)} {...props} />
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(baseField, "min-h-28 resize-y", className)} {...props} />
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select className={cn(baseField, "appearance-none bg-[right_1rem_center]", className)} {...props}>
      {children}
    </select>
  )
}

/**
 * Invisible spam trap: a field real users never see, tab to, or fill, plus a
 * render timestamp used to reject submissions faster than a human could
 * plausibly complete the form. Positioned off-screen (not `display: none`)
 * since some bots skip fields hidden that way. Purely additive — it takes no
 * space in the visible layout.
 */
export function Honeypot({ startedAt }: { startedAt: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="ts" value={startedAt} />
    </div>
  )
}
