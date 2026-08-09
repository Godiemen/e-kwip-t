import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  tone = 'light',
}: {
  className?: string
  /** light = for dark backgrounds, dark = for light backgrounds */
  tone?: 'light' | 'dark'
}) {
  const wordColor = tone === 'light' ? 'text-brand-foreground' : 'text-brand'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 48 32"
        className="h-8 w-12 shrink-0"
        role="img"
        aria-label="E-kwip-T excavator logo"
      >
        {/* excavator silhouette in amber */}
        <g fill="var(--primary)">
          <rect x="2" y="22" width="26" height="6" rx="1.5" />
          <circle cx="7" cy="28" r="3" />
          <circle cx="15" cy="28" r="3" />
          <circle cx="23" cy="28" r="3" />
          <rect x="9" y="13" width="14" height="9" rx="1.5" />
          <path d="M22 15 L34 6 L37 8 L27 18 Z" />
          <path d="M34 6 L44 12 L42 15 L33 10 Z" />
          <path d="M41 14 l5 3 -1.5 3.5 -5 -2.5 z" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-xl font-bold tracking-tight', wordColor)}>
          E-KWIP-T
        </span>
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Sales &amp; Service
        </span>
      </span>
    </span>
  )
}
