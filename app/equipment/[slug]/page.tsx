import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { CategoryListing } from '@/components/category-listing'
import { ContactBand } from '@/components/contact-band'
import { getCategoryBySlug, getMachinesByCategory, getAllCategorySlugs, getCategories } from '@/lib/data'

export const revalidate = 0

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Equipment | E-KWIP-t' }
  return {
    title: `${category.name} For Sale | E-KWIP-t`,
    description: `${category.blurb} Inspected stock and straight pricing from E-KWIP-t across South Africa.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const machines = await getMachinesByCategory(category.slug)
  const allCats = await getCategories()

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Current Stock"
          title={category.name}
          description={category.blurb}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Equipment', href: '/equipment/yellow-equipment' },
            { label: category.shortName },
          ]}
          image={category.image}
        />
        <CategoryListing machines={machines} activeSlug={category.slug} categories={allCats} />
        <ContactBand />
      </main>
      <SiteFooter />
    </>
  )
}
