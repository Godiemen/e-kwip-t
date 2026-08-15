'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight, Tractor, Trees, HardHat, Settings, Truck, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

const equipmentBoxes = [
  { title: 'Agricultural', slug: 'agricultural', blurb: 'Tractors, implements and agricultural equipment.', image: '/machines/jd-6155r-tractor.png', icon: <Tractor className="h-4 w-4 sm:h-6 sm:w-6" /> },
  { title: 'Forestry', slug: 'forestry', blurb: 'Forestry machinery and related equipment.', image: '/machines/forestry-harvester.png', icon: <Trees className="h-4 w-4 sm:h-6 sm:w-6" /> },
  { title: 'Construction', slug: 'yellow-equipment', blurb: 'Earthmoving, construction and related machinery.', image: '/machines/bell-b40e-adt.png', icon: <HardHat className="h-4 w-4 sm:h-6 sm:w-6" /> },
  { title: 'Industrial', slug: 'mining', blurb: 'Industrial and specialised equipment.', image: '/machines/rigid-dump-truck.png', icon: <Settings className="h-4 w-4 sm:h-6 sm:w-6" /> },
  { title: 'Transport & Freight', slug: 'commercial-vehicles', blurb: 'Trucks, trailers and transport-related equipment.', image: '/images.jpeg', icon: <Truck className="h-4 w-4 sm:h-6 sm:w-6" /> },
  { title: 'Attachments & Related', slug: 'support', blurb: 'Attachments, accessories and related equipment.', image: '/machines/diesel-generator.png', icon: <Wrench className="h-4 w-4 sm:h-6 sm:w-6" /> },
]

const AUTO_SLIDE_MS = 5000

export function EquipmentSection() {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const itemsPerView = 3
  const maxPage = Math.max(0, equipmentBoxes.length - itemsPerView)

  const next = useCallback(() => {
    setPage((p) => (p >= maxPage ? 0 : p + 1))
  }, [maxPage])

  const prev = useCallback(() => {
    setPage((p) => (p <= 0 ? maxPage : p - 1))
  }, [maxPage])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTO_SLIDE_MS)
    return () => clearInterval(id)
  }, [next, paused])

  return (
    <section className="bg-[#202e12] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#6b7c2a]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">What We Do</span>
            <span className="h-px w-12 bg-[#6b7c2a]" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold text-[#f9f7f2] md:text-5xl">
            Equipment We Assist With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#f9f7f2]/60">
            Six categories covering the full spectrum of heavy machinery — from farm to mine to site.
          </p>
        </div>

        {/* Mobile slider */}
        <div
          className="relative mt-8 sm:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${page * (100 / itemsPerView)}%)` }}
            >
              {equipmentBoxes.map((box) => (
                <div
                  key={box.slug}
                  className="shrink-0 px-1"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group overflow-hidden rounded-xl border border-white/10 bg-[#f9f7f2] shadow-lg transition hover:shadow-2xl">
                    <Link href={`/equipment/${box.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={box.image}
                          alt={box.title}
                          fill
                          sizes="33vw"
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/40 via-transparent to-transparent" />
                      </div>
                    </Link>
                    <div className="relative -mt-3 flex flex-col items-center px-1 pb-3 text-center">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f9f7f2] bg-[#6b7c2a] text-[#f9f7f2] shadow-lg">
                        {box.icon}
                      </div>
                      <h3 className="mt-1 break-words font-display text-[8px] font-bold leading-tight text-[#202e12]">
                        {box.title.toUpperCase()} {box.slug === 'agricultural' || box.slug === 'mining' ? 'MACHINERY' : 'EQUIPMENT'}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrows + dots */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous categories"
              onClick={prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#f9f7f2] transition hover:bg-[#6b7c2a]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === page ? 'w-5 bg-[#6b7c2a]' : 'w-2 bg-[#6b7c2a]/30'
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next categories"
              onClick={next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#f9f7f2] transition hover:bg-[#6b7c2a]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-8 hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4 lg:gap-5">
          {equipmentBoxes.map((box) => (
            <div
              key={box.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#f9f7f2] shadow-lg transition hover:shadow-2xl"
            >
              <Link href={`/equipment/${box.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    sizes="(max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/40 via-transparent to-transparent" />
                </div>
              </Link>
              <div className="relative -mt-6 flex flex-col items-center px-4 pb-4 text-center lg:-mt-8 lg:px-5 lg:pb-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f9f7f2] bg-[#6b7c2a] text-[#f9f7f2] shadow-lg lg:h-14 lg:w-14">
                  {box.icon}
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-[#202e12] lg:mt-4 lg:text-base">
                  {box.title.toUpperCase()} {box.slug === 'agricultural' || box.slug === 'mining' ? 'MACHINERY' : 'EQUIPMENT'}
                </h3>
                <p className="mt-1 hidden text-xs leading-snug text-[#5c6b52] lg:mt-2 lg:block lg:text-sm">
                  {box.blurb}
                </p>
                <Link
                  href={`/equipment/${box.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b7c2a] transition hover:text-[#5a6a22]"
                >
                  Browse stock
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#f9f7f2]/60">
          Looking for something not listed? <Link href="/contact" className="font-semibold text-[#6b7c2a] hover:underline">Contact us</Link>. We&apos;re always open to new opportunities.
        </p>
      </div>
    </section>
  )
}
