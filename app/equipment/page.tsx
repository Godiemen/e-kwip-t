import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { MachineCard } from '@/components/machine-card'
import { ContactBand } from '@/components/contact-band'
import { getCategories, getAllMachines } from '@/lib/data'

export const metadata: Metadata = {
  title: 'All Equipment For Sale | E-KWIP-t Sales and Service',
  description:
    'Browse all agricultural, forestry, yellow equipment, mining plant and support machinery for sale from E-KWIP-t.',
}

export const revalidate = 0

export default async function AllEquipmentPage() {
  const [cats, machines] = await Promise.all([
    getCategories(),
    getAllMachines(),
  ])
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Current Stock"
          title="All Equipment"
          description="Every machine currently on the yard sheet, across all categories."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'All Equipment' },
          ]}
          image="/machines/komatsu-d41-dozer.png"
        />

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#5c6b52] sm:inline">Filter:</span>
            <Link
              href="/equipment"
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

          <p className="mt-8 text-sm text-[#5c6b52]">
            <span className="font-semibold text-[#202e12]">{machines.length}</span>{' '}
            {machines.length === 1 ? 'machine' : 'machines'} available
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((m) => (
              <MachineCard key={m.slug} machine={m} />
            ))}
          </div>
        </section>

        <ContactBand />
      </main>
      <SiteFooter />
    </>
  )
}
