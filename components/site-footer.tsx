import Link from 'next/link'
import { BrandLogo } from './brand-logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sell-with-us', label: 'Sell With Us' },
  { href: '/equipment', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const shopCategories = [
  { slug: 'yellow-machines', name: 'Yellow Machines' },
  { slug: 'animal-feed-equipment', name: 'Animal Feed Equipment' },
  { slug: 'harvesting-equipment', name: 'Harvesting Equipment' },
  { slug: 'hay-equipment', name: 'Hay Equipment' },
  { slug: 'used-parts', name: 'Used Parts' },
  { slug: 'planting-equipment', name: 'Planting Equipment' },
  { slug: 'land-preparation-equipment', name: 'Land Preparation Equipment' },
  { slug: 'spreaders-and-sprayers', name: 'Spreaders and Sprayers' },
  { slug: 'tractors', name: 'Tractors' },
  { slug: 'trailers', name: 'Trailers' },
  { slug: 'vehicles', name: 'Vehicles' },
  { slug: 'miscellaneous-equipment', name: 'Miscellaneous Equipment' },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/butchpikesales',
    color: '#1877f2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/butchpikesales/',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/butch-pike-sales/',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Google',
    href: 'https://goo.gl/maps/6te9czox2uL43G4B9',
    color: '#DB4437',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.48 10.12v3.04h5.05c-.24 1.39-1.77 4.08-5.05 4.08-3.04 0-5.52-2.52-5.52-5.62 0-3.1 2.48-5.62 5.52-5.62 1.73 0 2.89.74 3.56 1.37l2.43-2.34C16.71 3.78 14.8 3 12.48 3 7.52 3 3.5 7.02 3.5 12s4.02 9 8.98 9c5.18 0 8.6-3.64 8.6-8.77 0-.59-.06-1.04-.14-1.49h-8.46z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=270823801749',
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
