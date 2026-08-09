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
        <section className="relative min-h-[320px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/machines/construction-site-hero.png"
            alt="Heavy equipment gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <div className="relative mx-auto flex min-h-[320px] max-w-7xl items-center px-4 md:px-6">
            <div className="max-w-2xl py-14">
              <h1 className="font-display text-5xl font-bold leading-tight text-[#f9f7f2] md:text-6xl">
                Gallery
              </h1>
              <p className="mt-4 text-lg text-[#f9f7f2]/90">
                A look at current and past stock. Click any machine to see full specs and pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="bg-[#f9f7f2] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/gallery"
                className="rounded-md bg-[#6b7c2a] px-4 py-2 text-sm font-semibold text-[#f9f7f2]"
              >
                All
              </Link>
              {cats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/equipment/${c.slug}`}
                  className="rounded-md border border-[#d7d4c9] bg-white px-4 py-2 text-sm font-medium text-[#5c6b52] transition hover:border-[#6b7c2a] hover:text-[#6b7c2a]"
                >
                  {c.shortName}
                </Link>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {machines.map((m) => {
                const cat = cats.find((c) => c.slug === m.category)
                return (
                  <Link
                    key={m.slug}
                    href={`/equipment/${m.category}#${m.slug}`}
                    className="group mb-5 block break-inside-avoid overflow-hidden rounded-xl border border-[#d7d4c9] bg-white shadow-sm transition hover:border-[#6b7c2a] hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-flex rounded-full bg-[#6b7c2a] px-2.5 py-1 text-xs font-semibold text-[#f9f7f2]">
                          {cat?.shortName ?? 'Equipment'}
                        </span>
                        <p className="mt-2 font-display text-lg font-bold text-[#f9f7f2]">
                          {m.name}
                        </p>
                        <p className="text-sm text-[#f9f7f2]/80">
                          {m.price}
                          {m.vat ? ` · ${m.vat}` : ''}
                        </p>
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
