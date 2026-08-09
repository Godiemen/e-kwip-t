import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, MapPin, Clock, Calendar, Wrench, Check, Phone, ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MachineCard } from '@/components/machine-card'
import {
  machines,
  getMachine,
  getCategory,
  getMachinesByCategory,
  CONTACT,
  waLink,
} from '@/lib/products'

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const machine = getMachine(slug)
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
  const machine = getMachine(slug)
  if (!machine) notFound()

  const category = getCategory(machine.category)
  const related = getMachinesByCategory(machine.category)
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
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-muted-foreground md:px-6">
            <Link href="/" className="transition hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/equipment/${category?.slug}`} className="transition hover:text-primary">
              {category?.shortName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{machine.name}</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src={machine.image || '/placeholder.svg'}
                  alt={machine.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded bg-brand/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground backdrop-blur">
                  {category?.shortName}
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
                    className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-accent text-brand">
                      <f.icon className="h-4 w-4" />
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
              <div className="mt-8 rounded-lg border border-border bg-brand p-5 text-brand-foreground">
                <p className="text-sm text-brand-foreground/80">
                  Contact {CONTACT.name} via WhatsApp to book a viewing or ask for more pictures.
                </p>
                <a
                  href={waLink(machine.name)}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-lg font-bold text-primary-foreground transition hover:brightness-95"
                >
                  <Phone className="h-5 w-5" />
                  {CONTACT.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Full spec table */}
          <div className="mt-14 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-foreground">Specifications</h2>
            <dl className="mt-5 overflow-hidden rounded-lg border border-border">
              {machine.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    i % 2 === 0
                      ? 'flex justify-between gap-4 bg-card px-5 py-3.5'
                      : 'flex justify-between gap-4 bg-secondary px-5 py-3.5'
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
          <section className="border-t border-border bg-secondary py-14">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                More {category?.shortName} stock
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
