import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  image?: string
}) {
  return (
    <section
      className={cn('relative overflow-hidden text-brand-foreground', image ? 'min-h-[300px]' : 'plate-texture')}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-brand-foreground/60">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {b.href ? (
                  <Link href={b.href} className="transition hover:text-primary">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-brand-foreground/85">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-2 w-6 bg-primary" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-brand-foreground/75">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
