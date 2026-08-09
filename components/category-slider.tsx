'use client'

import { useEffect, useState, useCallback } from 'react'
import { CategoryCard } from './category-card'
import type { Category } from '@/lib/products'

const AUTO_SLIDE_MS = 30000

export function CategorySlider({ categories }: { categories: Category[] }) {
  const [page, setPage] = useState(0)
  const total = categories.length

  const next = useCallback(() => {
    setPage((p) => (p + 1) % total)
  }, [total])

  useEffect(() => {
    const id = setInterval(next, AUTO_SLIDE_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {categories.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === page ? 'bg-[#6b7c2a]' : 'bg-[#6b7c2a]/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
