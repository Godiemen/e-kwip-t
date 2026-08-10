import { Phone } from 'lucide-react'
import { CONTACT, waLink } from '@/lib/products'

export function ContactBand({ machineName }: { machineName?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary py-14 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-primary-foreground/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Get In Touch</span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
            Book a viewing or ask a question
          </h2>
          <p className="mt-2 text-primary-foreground/70">
            Contact {CONTACT.name} via WhatsApp — we&apos;ll get back to you fast.
          </p>
        </div>
        <a
          href={waLink(machineName)}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-3 rounded-lg bg-brand px-7 py-4 font-display text-lg font-bold text-brand-foreground shadow-lg transition hover:brightness-110"
        >
          <Phone className="h-5 w-5 text-primary" />
          {CONTACT.displayPhone}
        </a>
      </div>
    </section>
  )
}
