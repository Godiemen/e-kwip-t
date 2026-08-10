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
      className={cn('relative overflow-hidden text-brand-foreground', image ? 'min-h-[440px]' : 'plate-texture')}
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/90 via-[#202e12]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 via-transparent to-transparent" />
        </>
      )}
      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-4 py-16 md:px-6 md:py-28">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-brand-foreground/50">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {b.href ? (
                  <Link href={b.href} className="transition hover:text-primary">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-brand-foreground/80">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-primary" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
          </div>
        )}
        <h1 className="mt-5 max-w-3xl break-words text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-brand-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-foreground/70">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
