import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { MachineCard } from '@/components/machine-card'
import { ContactBand } from '@/components/contact-band'
import { getCategories, getAllMachines } from '@/lib/data'

export const metadata: Metadata = {
  title: 'All Equipment For Sale | E-kwip-T Sales and Service',
  description:
    'Browse all agricultural, forestry, yellow equipment, mining plant and support machinery for sale from E-kwip-T.',
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

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/equipment"
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

          <p className="mt-8 text-sm text-[#5c6b52]">
            <span className="font-semibold text-[#202e12]">{machines.length}</span>{' '}
            {machines.length === 1 ? 'machine' : 'machines'} available
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
