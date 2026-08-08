import { cn } from '@/lib/utils'

/**
 * VISTAH brand lockup (placeholder treatment).
 *
 * Replace with the official SVG logo files from the VISTAH Branding Book when
 * available. Keep the geometric "V" symbol proportions unchanged — never
 * stretch or distort. Use `tone="light"` on dark/hero imagery and
 * `tone="dark"` on light backgrounds, per the brand guidelines.
 */
export function Logo({
  tone = 'dark',
  showTapestry = true,
  className,
}: {
  tone?: 'light' | 'dark'
  showTapestry?: boolean
  className?: string
}) {
  const color = tone === 'light' ? 'text-cream' : 'text-charcoal'

  return (
    <span className={cn('flex items-center gap-2.5', color, className)}>
      <VSymbol className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-[0.18em]">VISTAH</span>
        {showTapestry && (
          <span
            className={cn(
              'mt-1 text-[0.5rem] font-medium uppercase tracking-[0.2em]',
              tone === 'light' ? 'text-cream/70' : 'text-muted-foreground',
            )}
          >
            Tapestry Collection by Hilton&trade;
          </span>
        )}
      </span>
    </span>
  )
}

export function VSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15 16.5L24 31.5L33 16.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
