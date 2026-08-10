import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Tag, Truck, Handshake, ArrowRight } from 'lucide-react'
import { HomeHero } from '@/components/home-hero'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MachineCard } from '@/components/machine-card'
import { CategorySlider } from '@/components/category-slider'
import { getCategories, getFeaturedMachines } from '@/lib/data'

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

export const revalidate = 0

export default async function HomePage() {
  const [cats, featured] = await Promise.all([
    getCategories(),
    getFeaturedMachines(8),
  ])
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />

        {/* Welcome / About */}
        <section className="bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-[#6b7c2a]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">Welcome to E-kwip-T</span>
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#5a6a22] md:text-5xl">
                  Equipment &amp; Machinery Sales · South Africa
                </h2>
                <p className="mt-6 leading-relaxed text-foreground/80">
                  Welcome to E-kwip-T Sales and Service. We are an owner-managed business sourcing
                  and selling agricultural, forestry, yellow equipment, mining plant and site
                  support gear across South Africa. Whether you are looking for a single tine ripper
                  or a rigid dump truck, we will find the best solution for you. We trade in new and
                  used goods, big or small. Every listing is priced, specced and ready for an
                  on-site inspection — no back-and-forth required.{' '}
                  <Link
                    href="/equipment"
                    className="font-semibold text-[#6b7c2a] underline decoration-1 underline-offset-4 hover:text-[#4b6572]"
                  >
                    Browse our stock online
                  </Link>
                  .
                </p>
                <Link
                  href="/equipment"
                  className="mt-8 inline-flex items-center rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-md transition hover:bg-[#5a6a22] hover:shadow-lg"
                >
                  Browse Shop
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                  <Image
                    src="/machines/combine-harvester.png"
                    alt="Combine harvester for sale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-2xl sm:mt-10">
                  <Image
                    src="/machines/jcb-3cx-backhoe.png"
                    alt="JCB backhoe loader for sale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="stock" className="scroll-mt-20 bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">Browse by Type</span>
                <span className="h-px w-12 bg-[#6b7c2a]" />
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                Popular Categories
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#5c6b52]">
                Five categories, one yard sheet. Pick a category to see current stock, specs and
                asking prices.
              </p>
            </div>
            <div className="mt-12">
              <CategorySlider categories={cats} />
            </div>
          </div>
        </section>

        {/* Featured stock */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-[#6b7c2a]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">Featured Stock</span>
                </div>
                <h2 className="mt-4 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                  Currently on the yard sheet
                </h2>
              </div>
              <Link
                href="/equipment"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-[#6b7c2a] px-5 py-2.5 text-sm font-semibold text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
              >
                View All Stock
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((m) => (
                <MachineCard key={m.slug} machine={m} />
              ))}
            </div>
          </div>
        </section>

        {/* Why E-kwip-T */}
        <section className="bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">Why E-kwip-T</span>
                <span className="h-px w-12 bg-[#6b7c2a]" />
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                Buying equipment shouldn&apos;t be a gamble
              </h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t) => (
                <div
                  key={t.title}
                  className="group rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#efede5] text-[#6b7c2a] transition group-hover:bg-[#6b7c2a] group-hover:text-[#f9f7f2]">
                    <t.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6b52]">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sell band */}
        <section className="bg-[#4b6572] py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#f9f7f2]/30" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/50">Sell With Us</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold text-[#f9f7f2] md:text-4xl">
                Got equipment standing idle?
              </h2>
              <p className="mt-3 text-[#f9f7f2]/80">
                List it with E-kwip-T. We handle the enquiries, the viewings and the paperwork —
                you get a fair number, faster.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#4b6572] py-24 text-center md:py-32">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/machines/wheel-loader.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 to-transparent" />
          <div className="relative mx-auto max-w-3xl px-4 md:px-6">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#f9f7f2]/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/50">Get Started</span>
              <span className="h-px w-12 bg-[#f9f7f2]/30" />
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold text-[#f9f7f2] md:text-5xl">
              Ready To Get Started?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-lg bg-[#6b7c2a] px-8 py-4 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
