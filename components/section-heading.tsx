import { cn } from '@/lib/utils'

export function SectionHeading({
  tag,
  title,
  description,
  tone = 'dark',
  className,
}: {
  tag?: string
  title: string
  description?: string
  /** dark = dark text on light bg, light = light text on dark bg */
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {tag && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-2 w-6 bg-primary" aria-hidden />
          {tag}
        </span>
      )}
      <h2
        className={cn(
          'mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl',
          tone === 'light' ? 'text-brand-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 text-pretty leading-relaxed',
            tone === 'light' ? 'text-brand-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
