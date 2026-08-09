import { Phone } from 'lucide-react'
import { CONTACT, waLink } from '@/lib/products'

export function ContactBand({ machineName }: { machineName?: string }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
            Book a viewing or ask a question
          </h2>
          <p className="mt-1 text-primary-foreground/80">
            Contact {CONTACT.name} via WhatsApp — we&apos;ll get back to you fast.
          </p>
        </div>
        <a
          href={waLink(machineName)}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-3 rounded-md bg-brand px-6 py-4 font-display text-lg font-bold text-brand-foreground transition hover:brightness-110"
        >
          <Phone className="h-5 w-5 text-primary" />
          {CONTACT.displayPhone}
        </a>
      </div>
    </section>
  )
}
