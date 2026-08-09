'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight, Tractor, Trees, Truck, HardHat, Wrench } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { cn } from '@/lib/utils'
import { categories } from '@/lib/products'

const categoryIcons: Record<string, React.ReactNode> = {
  agricultural: <Tractor className="h-5 w-5" />,
  forestry: <Trees className="h-5 w-5" />,
  'yellow-equipment': <Truck className="h-5 w-5" />,
  mining: <HardHat className="h-5 w-5" />,
  support: <Wrench className="h-5 w-5" />,
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#6b7c2a]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="E-kwip-T home" className="shrink-0">
          <BrandLogo tone="light" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition hover:text-[#f9f7f2]',
                pathname === l.href ? 'text-[#f9f7f2]' : 'text-[#f9f7f2]/80',
              )}
            >
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className={cn(
                'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition',
                shopOpen ? 'text-[#f9f7f2]' : 'text-[#f9f7f2]/80 hover:text-[#f9f7f2]',
              )}
              aria-expanded={shopOpen}
            >
              Shop <ChevronDown className="h-4 w-4" />
            </button>
            {shopOpen && (
              <div className="absolute right-0 top-full w-[520px] pt-2">
              <div className="overflow-hidden rounded-2xl border border-[#d7d4c9] bg-[#f9f7f2] p-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#d7d4c9] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#6b7c2a]/10 text-[#6b7c2a]">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <span className="font-display text-lg font-bold text-[#202e12]">Our Stock</span>
                  </div>
                  <Link
                    href="/equipment"
                    className="inline-flex items-center gap-1 rounded-full bg-[#efede5] px-3 py-1.5 text-sm font-semibold text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
                  >
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Category grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/equipment/${c.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-[#d7d4c9] bg-white p-3 transition hover:border-[#6b7c2a]"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#efede5] text-[#6b7c2a]">
                        {categoryIcons[c.slug] ?? <Truck className="h-5 w-5" />}
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-[#202e12] group-hover:text-[#6b7c2a]">
                          {c.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-snug text-[#5c6b52]">{c.blurb}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Featured banner */}
                <Link
                  href="/equipment/yellow-equipment"
                  className="relative mt-4 block aspect-[3/1] overflow-hidden rounded-xl"
                >
                  <Image
                    src="/machines/bell-b40e-adt.png"
                    alt="Bell B40E ADT for sale"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                  <div className="relative flex h-full flex-col justify-center px-5">
                    <p className="font-display text-lg font-bold text-[#f9f7f2]">
                      Featured Category
                    </p>
                    <p className="mt-1 text-sm text-[#f9f7f2]/85">Yellow Equipment · ADTs, dozers and more</p>
                  </div>
                </Link>
              </div>
              </div>
            )}
          </div>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-[#f9f7f2] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#5a6a22] lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded px-1 py-2.5 text-[#f9f7f2]/90 transition hover:text-[#f9f7f2]',
                  pathname === l.href && 'font-semibold text-[#f9f7f2]',
                )}
              >
                {l.label}
              </Link>
            ))}
            <p className="mt-3 px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-[#f9f7f2]/60">
              Shop
            </p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/equipment/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded px-1 py-2.5 text-[#f9f7f2]/85 transition hover:text-[#f9f7f2]"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
