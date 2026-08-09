'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { categories, CONTACT, waLink } from '@/lib/products'
import { cn } from '@/lib/utils'

const primaryLinks = [
  { href: '/sell-with-us', label: 'Sell With Us' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [stockOpen, setStockOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand text-brand-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="E-kwip-T home" className="shrink-0">
          <BrandLogo tone="light" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setStockOpen(true)}
            onMouseLeave={() => setStockOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-foreground/85 transition hover:text-primary"
              aria-expanded={stockOpen}
            >
              Equipment <ChevronDown className="h-4 w-4" />
            </button>
            {stockOpen && (
              <div className="absolute left-0 top-full w-64 rounded-md border border-white/10 bg-brand-muted p-1.5 shadow-xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/equipment/${c.slug}`}
                    className="block rounded px-3 py-2 text-sm text-brand-foreground/85 transition hover:bg-white/10 hover:text-primary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition hover:text-primary',
                pathname === l.href ? 'text-primary' : 'text-brand-foreground/85',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.displayPhone}
          </a>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-brand-muted lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Equipment
            </p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/equipment/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded px-1 py-2.5 text-brand-foreground/90 transition hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
            <div className="my-3 h-px bg-white/10" />
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded px-1 py-2.5 text-brand-foreground/90 transition hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              WhatsApp {CONTACT.displayPhone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
