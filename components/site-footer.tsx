import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { categories, CONTACT, waLink } from '@/lib/products'

export function SiteFooter() {
  return (
    <footer className="plate-texture text-brand-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <BrandLogo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-foreground/70">
            Buying and selling agricultural, forestry, yellow equipment, mining plant and site
            support machinery across South Africa.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Equipment
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/equipment/${c.slug}`}
                  className="text-brand-foreground/75 transition hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/sell-with-us" className="text-brand-foreground/75 transition hover:text-primary">
                Sell With Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-brand-foreground/75 transition hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Get In Touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-foreground/75">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={waLink()} target="_blank" rel="noopener" className="hover:text-primary">
                {CONTACT.name} · {CONTACT.displayPhone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:sales@ekwipt.co.za" className="hover:text-primary">
                sales@ekwipt.co.za
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>KwaZulu-Natal · Nationwide delivery</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-brand-foreground/55 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {CONTACT.company}. All rights reserved.</p>
          <p>Inspected stock · Straight pricing · Nationwide delivery</p>
        </div>
      </div>
    </footer>
  )
}
