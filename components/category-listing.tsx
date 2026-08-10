'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MachineCard } from './machine-card'
import { type Machine, type CategorySlug, type Category } from '@/lib/products'

type SortKey = 'featured' | 'price-asc' | 'price-desc'

function priceValue(price: string): number {
  if (price.toUpperCase() === 'POA') return Number.POSITIVE_INFINITY
  const n = Number.parseInt(price.replace(/[^0-9]/g, ''), 10)
  return Number.isNaN(n) ? Number.POSITIVE_INFINITY : n
}

export function CategoryListing({
  machines,
  activeSlug,
  categories,
}: {
  machines: Machine[]
  activeSlug: CategorySlug
  categories: Category[]
}) {
  const [sort, setSort] = useState<SortKey>('featured')

  const sorted = useMemo(() => {
    const list = [...machines]
    if (sort === 'price-asc') list.sort((a, b) => priceValue(a.price) - priceValue(b.price))
    else if (sort === 'price-desc') list.sort((a, b) => priceValue(b.price) - priceValue(a.price))
    else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return list
  }, [machines, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      {/* Category switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 hidden text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:inline">Filter:</span>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/equipment/${c.slug}`}
            className={
              c.slug === activeSlug
                ? 'rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm'
                : 'rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:bg-accent hover:text-foreground'
            }
          >
            {c.shortName}
          </Link>
        ))}
      </div>

      {/* Sort bar */}
      <div className="mt-8 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{sorted.length}</span>{' '}
          {sorted.length === 1 ? 'machine' : 'machines'} available
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {sorted.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((m) => (
            <MachineCard key={m.slug} machine={m} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
          <p className="font-display text-xl font-semibold text-foreground">
            Nothing on the sheet here right now
          </p>
          <p className="mt-2 text-muted-foreground">
            New stock lands often. Send us what you are after and we will keep an eye out.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110"
          >
            Tell us what you need
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
