import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BrandLogo } from './brand-logo'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/sell', label: 'Sell Equipment' },
  { href: '/equipment', label: 'Find Equipment' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const equipmentCategories = [
  { slug: 'agricultural', name: 'Agricultural Machinery' },
  { slug: 'forestry', name: 'Forestry Equipment' },
  { slug: 'yellow-equipment', name: 'Construction Equipment' },
  { slug: 'mining', name: 'Industrial Machinery' },
  { slug: 'commercial-vehicles', name: 'Transport & Freight Equipment' },
  { slug: 'support', name: 'Attachments & Related Equipment' },
]

const contactInfo = [
  { icon: <Phone className="h-4 w-4" />, text: '082 636 5471' },
  { icon: <Mail className="h-4 w-4" />, text: 'sales@ekwipt.co.za' },
  { icon: <MapPin className="h-4 w-4" />, text: 'based in KwaZulu-Natal' },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#202e12] text-[#f9f7f2]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand/tagline */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <BrandLogo tone="light" />
            <p className="mt-4 font-display text-lg font-bold text-[#f97316] sm:text-xl">
              Connecting Buyers &amp; Sellers.
            </p>
            <p className="font-display text-lg font-bold text-[#f97316] sm:text-xl">
              Creating Opportunities.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#f9f7f2] sm:text-base">
              Your Independent<br />Equipment Broker
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#f97316]">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-[#f9f7f2]/80">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition hover:text-[#f9f7f2]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#f97316]">
              Equipment
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-[#f9f7f2]/80">
              {equipmentCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/equipment/${c.slug}`}
                    className="transition hover:text-[#f9f7f2]"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#f97316]">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[#f9f7f2]/80">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-[#f97316]">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[#f9f7f2]/80">
              Serving Buyers &amp; Sellers Nationwide
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-xs text-[#f9f7f2]/55 md:flex-row md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} E-KWIP-t Sales &amp; Service (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/cookies" className="transition hover:text-[#f9f7f2]">Cookie Policy</Link>
            <Link href="/terms" className="transition hover:text-[#f9f7f2]">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
