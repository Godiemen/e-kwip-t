import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { waLink } from '@/lib/products'

const stats = [
  { num: '20+', label: 'Machines Listed' },
  { num: '5', label: 'Equipment Categories' },
  { num: '9', label: 'Provinces Covered' },
  { num: '48h', label: 'Avg Enquiry Response' },
]

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <Image
        src="/machines/construction-site-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/85 to-brand/40" />

      <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-16 md:px-6 md:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-brand-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Equipment &amp; Machinery Sales · South Africa
        </span>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Heavy equipment, <span className="text-primary">bought and sold straight.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-foreground/80">
          E-kwip-T sources and sells agricultural, forestry, yellow equipment, mining plant and
          site support gear across South Africa. Every listing is priced, specced and ready for an
          on-site inspection — no back-and-forth required.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#stock"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95"
          >
            Browse Current Stock
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md border border-brand-foreground/25 px-6 py-3 font-semibold text-brand-foreground transition hover:border-primary hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-t-lg border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-brand px-5 py-6">
              <dt className="font-display text-3xl font-bold text-primary">{s.num}</dt>
              <dd className="mt-1 text-sm text-brand-foreground/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
