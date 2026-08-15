'use client'

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MachineCard } from './machine-card'
import type { Machine } from '@/lib/products'
import { cn } from '@/lib/utils'

const AUTO_SLIDE_MS = 6000

export function MachineSlider({ machines, variant = 'light' }: { machines: Machine[]; variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark'
  const [page, setPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = machines.length
  const maxPage = Math.max(0, total - itemsPerView)

  const next = useCallback(() => {
    setPage((p) => (p >= maxPage ? 0 : p + 1))
  }, [maxPage])

  const prev = useCallback(() => {
    setPage((p) => (p <= 0 ? maxPage : p - 1))
  }, [maxPage])

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4)
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
        aria-label="Previous machines"
        onClick={prev}
        className={cn(
          'absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full shadow-lg ring-1 border transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex',
          dark ? 'border-white/10 bg-white/10 text-[#f9f7f2]' : 'border-[#d7d4c9] bg-white text-[#202e12]'
        )}
        style={{ width: 44, height: 44 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next machines"
        onClick={next}
        className={cn(
          'absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full shadow-lg ring-1 border transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex',
          dark ? 'border-white/10 bg-white/10 text-[#f9f7f2]' : 'border-[#d7d4c9] bg-white text-[#202e12]'
        )}
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
          {machines.map((machine) => (
            <div
              key={machine.slug}
              className="shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <MachineCard machine={machine} variant={variant} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots + mobile arrows */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous machines"
          onClick={prev}
          className={cn(
            'inline-flex items-center justify-center rounded-full p-2 text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:hidden',
            dark ? 'bg-white/10' : 'bg-[#efede5]'
          )}
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
          aria-label="Next machines"
          onClick={next}
          className={cn(
            'inline-flex items-center justify-center rounded-full p-2 text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:hidden',
            dark ? 'bg-white/10' : 'bg-[#efede5]'
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
