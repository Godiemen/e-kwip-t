'use client'

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CategoryCard } from './category-card'
import type { Category } from '@/lib/products'

const AUTO_SLIDE_MS = 6000

export function CategorySlider({ categories }: { categories: Category[] }) {
  const [page, setPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = categories.length
  const maxPage = Math.max(0, total - itemsPerView)

  const next = useCallback(() => {
    setPage((p) => (p >= maxPage ? 0 : p + 1))
  }, [maxPage])

  const prev = useCallback(() => {
    setPage((p) => (p <= 0 ? maxPage : p - 1))
  }, [maxPage])

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3)
      else if (window.innerWidth >= 640) setItemsPerView(2)
      else setItemsPerView(1)
    }
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  useEffect(() => {
    setPage(0)
  }, [itemsPerView])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTO_SLIDE_MS)
    return () => clearInterval(id)
  }, [next, paused])

  const dotCount = maxPage + 1

  return (
    <div
      className="relative mx-auto max-w-7xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous categories"
        onClick={prev}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-[#d7d4c9] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next categories"
        onClick={next}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-[#d7d4c9] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slider track */}
      <div className="overflow-hidden px-1">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * (100 / itemsPerView)}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              className="shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots + mobile arrows */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous categories"
          onClick={prev}
          className="inline-flex items-center justify-center rounded-full bg-[#efede5] p-2 text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === page ? 'w-8 bg-[#6b7c2a]' : 'w-2.5 bg-[#6b7c2a]/30'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next categories"
          onClick={next}
          className="inline-flex items-center justify-center rounded-full bg-[#efede5] p-2 text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
