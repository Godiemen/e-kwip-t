'use client'

import { useEffect, useState, useCallback } from 'react'
import { ShieldCheck, Tag, Truck, Handshake, ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_SLIDE_MS = 6000

const trust = [
  {
    icon: ShieldCheck,
    title: 'Inspected Stock',
    body: 'Every listing is checked and specced before it goes on the sheet, so what you see is what you are quoted on.',
  },
  {
    icon: Tag,
    title: 'Straight Pricing',
    body: 'Listed prices or POA on request — no inflated "negotiable" numbers to wade through.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    body: 'We arrange transport to any province, quoted separately based on machine and distance.',
  },
  {
    icon: Handshake,
    title: 'Trade-Ins Considered',
    body: 'Selling to upgrade? We will value your current machine against your next purchase.',
  },
]

export function TrustSlider() {
  const [page, setPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = trust.length
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
        aria-label="Previous"
        onClick={prev}
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#d7d4c9] bg-white shadow-lg transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#d7d4c9] bg-white shadow-lg transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slider track */}
      <div className="overflow-hidden px-1">
        <div
          className="flex items-stretch transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * (100 / itemsPerView)}%)` }}
        >
          {trust.map((t) => (
            <div
              key={t.title}
              className="shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="group flex h-full flex-col rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#efede5] text-[#6b7c2a] transition group-hover:bg-[#6b7c2a] group-hover:text-[#f9f7f2]">
                  <t.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c6b52]">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots + mobile arrows */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous"
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
          aria-label="Next"
          onClick={next}
          className="inline-flex items-center justify-center rounded-full bg-[#efede5] p-2 text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2] md:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
