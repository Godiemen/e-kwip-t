import Link from 'next/link'
import Image from 'next/image'

export function HomeHero() {
  return (
    <section className="relative min-h-[640px] overflow-hidden bg-[#3a4d45]">
      <Image
        src="/123752.jpg"
        alt="E-kwip-T heavy equipment on site"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/90 via-[#202e12]/65 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[640px] w-full max-w-7xl items-center px-4 md:px-6">
        <div className="w-full min-w-0 max-w-2xl py-24 md:py-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[#6b7c2a]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/60">E-kwip-T (Pty) Ltd Sales &amp; Service</span>
          </div>
          <h1 className="mt-6 break-words font-display text-4xl font-bold leading-[1.08] text-[#f9f7f2] sm:text-5xl md:text-6xl lg:text-7xl">
            Heavy equipment/Machinery, bought and sold straight.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#f9f7f2]/70">
            E-kwip-T sources and sells agricultural, forestry, yellow equipment, mining plant and
            site support gear across South Africa. Every listing is priced, specced and ready for an
            on-site inspection — no back-and-forth required.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Link
              href="/equipment"
              className="inline-flex items-center justify-center rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
            >
              Browse Shop
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#f9f7f2]/30 px-7 py-3.5 font-display font-semibold text-[#f9f7f2] backdrop-blur-sm transition hover:bg-[#f9f7f2]/10"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
