import Link from 'next/link'
import Image from 'next/image'

export function HomeHero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#3a4d45]">
      <Image
        src="/machines/construction-site-hero.png"
        alt="Tractor ploughing a field at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />

      <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-4 md:px-6">
        <div className="max-w-2xl py-24">
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-[#f9f7f2] md:text-6xl lg:text-7xl">
            Heavy equipment, bought and sold straight.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#f9f7f2]/90">
            E-kwip-T sources and sells agricultural, forestry, yellow equipment, mining plant and
            site support gear across South Africa. Every listing is priced, specced and ready for an
            on-site inspection — no back-and-forth required.
          </p>
          <Link
            href="/equipment"
            className="mt-8 inline-flex items-center rounded-md bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] transition hover:bg-[#5a6a22]"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </section>
  )
}
