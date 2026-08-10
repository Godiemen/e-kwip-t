import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactBand } from '@/components/contact-band'
import { getCategories, getAllMachines } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Gallery | E-kwip-T Sales and Service',
  description:
    'Photo gallery of current and past stock from E-kwip-T Sales and Service — tractors, dozers, ADTs, harvesters and more.',
}

export const revalidate = 0

export default async function GalleryPage() {
  const [cats, machines] = await Promise.all([
    getCategories(),
    getAllMachines(),
  ])
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[440px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/machines/construction-site-hero.png"
            alt="Heavy equipment gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/90 via-[#202e12]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[440px] max-w-7xl items-center px-4 md:px-6">
            <div className="max-w-2xl py-20">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/60">Our Yard</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-[#f9f7f2] md:text-6xl lg:text-7xl">
                Gallery
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f9f7f2]/70 md:text-lg">
                A look at current and past stock. Click any machine to see full specs and pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6b52] sm:inline">Filter:</span>
              <Link
                href="/gallery"
                className="rounded-lg bg-[#6b7c2a] px-5 py-2.5 text-sm font-semibold text-[#f9f7f2] shadow-sm transition hover:bg-[#5a6a22]"
              >
                All
              </Link>
              {cats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/equipment/${c.slug}`}
                  className="rounded-lg border border-[#d7d4c9] bg-white px-5 py-2.5 text-sm font-medium text-[#5c6b52] transition hover:border-[#6b7c2a] hover:bg-[#efede5] hover:text-[#6b7c2a]"
                >
                  {c.shortName}
                </Link>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
              {machines.map((m) => {
                const cat = cats.find((c) => c.slug === m.category)
                return (
                  <Link
                    key={m.slug}
                    href={`/equipment/${m.category}#${m.slug}`}
                    className="group mb-6 block break-inside-avoid overflow-hidden rounded-2xl border border-[#d7d4c9] bg-white shadow-sm transition hover:border-[#6b7c2a] hover:shadow-2xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      {/* Category badge */}
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex rounded-full bg-[#6b7c2a] px-3 py-1 text-xs font-semibold text-[#f9f7f2] shadow-md backdrop-blur-sm">
                          {cat?.shortName ?? 'Equipment'}
                        </span>
                      </div>
                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="font-display text-xl font-bold text-[#f9f7f2] drop-shadow-md">
                          {m.name}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="font-display text-base font-bold text-[#f9f7f2]">{m.price}</span>
                          {m.vat && <span className="text-xs text-[#f9f7f2]/70">· {m.vat}</span>}
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#f9f7f2]/0 transition group-hover:text-[#f9f7f2]/80">
                          <span>View details</span>
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <ContactBand />
      </main>
      <SiteFooter />
    </>
  )
}
