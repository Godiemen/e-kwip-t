import Link from 'next/link'
import { ShieldCheck, Tag, Truck, Handshake, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeHero } from '@/components/home-hero'
import { SectionHeading } from '@/components/section-heading'
import { CategoryCard } from '@/components/category-card'
import { MachineCard } from '@/components/machine-card'
import { categories, getFeatured } from '@/lib/products'

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

export default function HomePage() {
  const featured = getFeatured(8)
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />

        {/* Categories */}
        <section id="stock" className="scroll-mt-20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading
              tag="Shop By Category"
              title="Find your next machine"
              description="Five categories, one yard sheet. Pick a category to see current stock, specs and asking prices."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured stock */}
        <section className="plate-texture py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                tone="light"
                tag="Featured Stock"
                title="Currently on the yard sheet"
                description="A cross-section of what is available right now. Full category listings have more."
              />
              <Link
                href="/equipment/yellow-equipment"
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-brand-foreground/25 px-5 py-2.5 text-sm font-semibold text-brand-foreground transition hover:border-primary hover:text-primary"
              >
                View All Categories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((m) => (
                <MachineCard key={m.slug} machine={m} />
              ))}
            </div>
          </div>
        </section>

        {/* Why E-kwip-T */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading tag="Why E-kwip-T" title="Buying equipment shouldn't be a gamble" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t) => (
                <div
                  key={t.title}
                  className="rounded-lg border border-border bg-card p-6 transition hover:border-primary"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent text-brand">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-card-foreground">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sell band */}
        <section className="hazard-stripe">
          <div className="bg-brand/95">
            <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-bold text-brand-foreground">
                  Got equipment standing idle?
                </h2>
                <p className="mt-2 text-brand-foreground/75">
                  List it with E-kwip-T. We handle the enquiries, the viewings and the paperwork —
                  you get a fair number, faster.
                </p>
              </div>
              <Link
                href="/sell-with-us"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95"
              >
                Sell With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
