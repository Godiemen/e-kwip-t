import Link from 'next/link'
import Image from 'next/image'
import { Search, Tag } from 'lucide-react'

export function HomeHero() {
  return (
    <section className="relative min-h-[700px] overflow-hidden bg-[#202e12]">
      <Image
        src="/photo-1594771804886-a933bb2d609b.avif"
        alt="E-kwip-t heavy equipment on site"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/75 via-[#202e12]/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/70 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[700px] w-full max-w-7xl items-center px-4 md:px-6">
        <div className="w-full min-w-0 max-w-2xl py-24 md:py-28">
          <h1
            className="font-display text-5xl font-bold leading-[0.9] tracking-tight text-[#f9f7f2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            E-kwip-t
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#f9f7f2]/90 sm:text-base">
            SALES &amp; SERVICE (PTY) LTD.
          </p>
          <p
            className="mt-4 font-display text-2xl font-bold leading-tight text-[#f9f7f2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl"
          >
            Connecting Buyers &amp; Sellers.
          </p>
          <p
            className="font-display text-2xl font-bold leading-tight text-[#f9f7f2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl"
          >
            Creating Opportunities.
          </p>
          <h2 className="mt-6 font-display text-xl font-bold text-[#f9f7f2] sm:text-2xl">
            Your Independent Equipment Broker
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#f9f7f2]/70 sm:text-lg">
            Terrence and the team connect buyers and sellers of quality used and pre-owned equipment.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-8 py-4 font-display text-base font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22] sm:text-lg"
            >
              <Tag className="h-5 w-5" />
              SELL YOUR EQUIPMENT
            </Link>
            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#f9f7f2]/30 bg-[#202e12]/50 px-8 py-4 font-display text-base font-semibold text-[#f9f7f2] backdrop-blur-sm transition hover:bg-[#f9f7f2]/10 sm:text-lg"
            >
              <Search className="h-5 w-5" />
              FIND EQUIPMENT
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
