import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const ctaVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm',
        outline: 'border border-border bg-transparent text-foreground hover:bg-secondary',
        light: 'bg-cream text-charcoal hover:bg-cream/90 shadow-sm',
        'light-outline': 'border border-cream/40 bg-transparent text-cream hover:bg-cream/10',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        default: 'h-12 px-7 text-sm',
        lg: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type CTALinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof ctaVariants>

export function CTALink({ className, variant, size, ...props }: CTALinkProps) {
  return <Link className={cn(ctaVariants({ variant, size }), className)} {...props} />
}
