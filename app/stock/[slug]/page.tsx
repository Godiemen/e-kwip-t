import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, MapPin, Clock, Calendar, Wrench, Check, Phone, ArrowLeft, MessageCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MachineCard } from '@/components/machine-card'
import {
  CONTACT,
  waOrderLink,
} from '@/lib/products'
import { getMachineBySlug, getCategoryBySlug, getMachinesByCategory, getAllSlugs } from '@/lib/data'

export const revalidate = 0

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const machine = await getMachineBySlug(slug)
  if (!machine) return { title: 'Machine | E-kwip-T' }
  return {
    title: `${machine.name} For Sale | E-kwip-T`,
    description: machine.description,
  }
}

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const machine = await getMachineBySlug(slug)
  if (!machine) notFound()

  const category = await getCategoryBySlug(machine.category)
  const related = (await getMachinesByCategory(machine.category))
    .filter((m) => m.slug !== machine.slug)
    .slice(0, 3)

  const quickFacts = [
    { icon: Calendar, label: 'Year', value: machine.year },
    { icon: Clock, label: 'Hours', value: machine.hours },
    { icon: Wrench, label: 'Make', value: machine.make },
    { icon: MapPin, label: 'Location', value: machine.location },
  ]

  return (
    <>
      <SiteHeader />
      <main>
        {/* Breadcrumb bar */}
        <div className="border-b border-border bg-secondary">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3.5 text-sm text-muted-foreground md:px-6">
            <Link href="/" className="transition hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/equipment/${category?.slug}`} className="transition hover:text-primary">
              {category?.shortName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{machine.name}</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
                <Image
                  src={machine.image || '/placeholder.svg'}
                  alt={machine.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground shadow-md backdrop-blur-sm">
                  {category?.shortName}
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{category?.shortName}</span>
              </div>
              <h1 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {machine.name}
              </h1>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-foreground">
                  {machine.price}
                </span>
                {machine.vat && <span className="pb-1.5 text-muted-foreground">{machine.vat}</span>}
              </div>

              <p className="mt-5 leading-relaxed text-muted-foreground">{machine.description}</p>

              {/* Quick facts */}
              <dl className="mt-6 grid grid-cols-2 gap-3">
                {quickFacts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-brand">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="truncate font-semibold text-foreground">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* Highlights */}
              <ul className="mt-6 space-y-2">
                {machine.condition.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 rounded-2xl border border-border bg-brand p-6 text-brand-foreground shadow-lg">
                <p className="text-sm text-brand-foreground/80">
                  Ready to buy? Send {CONTACT.name} a WhatsApp order with the machine details pre-filled.
                </p>
                <a
                  href={waOrderLink(machine)}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25d366] px-6 py-3.5 font-display text-lg font-bold text-white shadow-md transition hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT.displayPhone.replace(/\s/g, '')}`}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-foreground/20 px-6 py-3 font-display text-sm font-semibold text-brand-foreground transition hover:bg-brand-foreground/10"
                >
                  <Phone className="h-4 w-4" />
                  Or call {CONTACT.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Full spec table */}
          <div className="mt-16 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tech Sheet</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">Specifications</h2>
            <dl className="mt-6 overflow-hidden rounded-2xl border border-border shadow-sm">
              {machine.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    i % 2 === 0
                      ? 'flex justify-between gap-4 bg-card px-6 py-4'
                      : 'flex justify-between gap-4 bg-secondary px-6 py-4'
                  }
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Link
            href={`/equipment/${category?.slug}`}
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {category?.name}
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">More Stock</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                More {category?.shortName} stock
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((m) => (
                  <MachineCard key={m.slug} machine={m} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
