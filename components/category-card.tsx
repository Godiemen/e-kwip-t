import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/products'
import { categoryCount } from '@/lib/products'

export function CategoryCard({ category }: { category: Category }) {
  const count = categoryCount(category.slug)
  return (
    <Link
      href={`/equipment/${category.slug}`}
      className="group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-lg border border-border"
    >
      <Image
        src={category.image || '/placeholder.svg'}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-transparent" />
      <div className="relative p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {count} in stock
        </span>
        <h3 className="mt-1 font-display text-xl font-bold text-brand-foreground">
          {category.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-brand-foreground/75">{category.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Browse stock
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
