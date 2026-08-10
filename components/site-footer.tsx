import Link from 'next/link'
import { BrandLogo } from './brand-logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/equipment', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const shopCategories = [
  { slug: 'yellow-equipment', name: 'Yellow Equipment' },
  { slug: 'agricultural', name: 'Agricultural Equipment' },
  { slug: 'forestry', name: 'Forestry Equipment' },
  { slug: 'mining', name: 'Mining Plant' },
  { slug: 'support', name: 'Support Machinery' },
  { slug: 'commercial-vehicles', name: 'Commercial Vehicles' },
]

const socials = [
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=27000000000',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

function SocialIcon({ label, href, color, icon }: { label: string; href: string; color: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:scale-110"
      style={{ backgroundColor: color }}
    >
      {icon}
    </a>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#6b7c2a] text-[#f9f7f2]">
      {/* CTA band already on page, so this is the true footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div className="text-center md:text-left">
          <BrandLogo tone="light" className="justify-center md:justify-start" />
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-semibold text-[#f9f7f2]/90 transition hover:text-[#f9f7f2]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <ul className="space-y-2 text-sm text-[#f9f7f2]/75">
            {shopCategories.map((c) => (
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

        <div className="text-center md:text-right">
          <h4 className="font-display text-2xl font-bold text-[#f9f7f2]">Let&apos;s Get Social</h4>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-end">
            {socials.map((s) => (
              <SocialIcon key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-xs text-[#f9f7f2]/55 md:flex-row md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} E-kwip-T Sales &amp; Service. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/cookies" className="transition hover:text-[#f9f7f2]">Cookie Policy</Link>
            <Link href="/terms" className="transition hover:text-[#f9f7f2]">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
