import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 lg:px-8', className)}>{children}</div>
  )
}

export function Kicker({
  className,
  children,
  tone = 'primary',
}: {
  className?: string
  children: React.ReactNode
  tone?: 'primary' | 'muted' | 'light'
}) {
  return (
    <p
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.24em]',
        tone === 'primary' && 'text-primary',
        tone === 'muted' && 'text-muted-foreground',
        tone === 'light' && 'text-champagne',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
}: {
  kicker?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {kicker && <Kicker tone={tone === 'light' ? 'light' : 'primary'}>{kicker}</Kicker>}
      <h2
        className={cn(
          'max-w-3xl text-balance font-serif text-3xl leading-tight md:text-4xl lg:text-[2.75rem]',
          tone === 'light' ? 'text-cream' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed md:text-lg',
            tone === 'light' ? 'text-cream/75' : 'text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
