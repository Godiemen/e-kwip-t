'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, ChevronDown, Home, Users, Search, User, Phone } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { categories } from '@/lib/products'
import { cn } from '@/lib/utils'

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const [eqOpen, setEqOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/sell', label: 'SELL EQUIPMENT' },
    { href: '/equipment', label: 'FIND EQUIPMENT' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <header className={cn(
      'sticky top-0 z-50',
      home ? 'bg-[#202e12]' : 'bg-[#6b7c2a]'
    )}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="E-KWIP-t home" className="shrink-0">
          <BrandLogo tone="light" home={home} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => {
            if (l.href === '/equipment') {
              return (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setEqOpen(true)}
                  onMouseLeave={() => setEqOpen(false)}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-semibold tracking-[0.05em] transition',
                      pathname === l.href || pathname.startsWith('/equipment/')
                        ? 'text-[#f9f7f2]'
                        : 'text-[#f9f7f2]/70 hover:text-[#f9f7f2]'
                    )}
                  >
                    {l.label}
                    <ChevronDown className="h-3 w-3" />
                  </Link>
                  {eqOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[220px] pt-2">
                      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#202e12] shadow-2xl">
                        <Link
                          href="/equipment"
                          className="block px-4 py-2.5 text-xs font-semibold text-[#f9f7f2] transition hover:bg-[#6b7c2a]"
                        >
                          All Equipment
                        </Link>
                        <div className="border-t border-white/10" />
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/equipment/${c.slug}`}
                            className="block px-4 py-2.5 text-xs font-medium text-[#f9f7f2]/80 transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'text-xs font-semibold tracking-[0.05em] transition',
                  pathname === l.href
                    ? 'text-[#f9f7f2]'
                    : 'text-[#f9f7f2]/70 hover:text-[#f9f7f2]'
                )}
              >
                {l.label}
              </Link>
            )
          })}
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
        <div className="border-t border-white/10 bg-[#202e12] lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4">
            {navLinks.map((l) => {
              const icon = l.href === '/' ? <Home className="h-4 w-4" />
                : l.href === '/sell' ? <Users className="h-4 w-4" />
                : l.href === '/equipment' ? <Search className="h-4 w-4" />
                : l.href === '/about' ? <User className="h-4 w-4" />
                : <Phone className="h-4 w-4" />
              if (l.href === '/equipment') {
                return (
                  <div key={l.href}>
                    <button
                      onClick={() => setEqOpen((v) => !v)}
                      className="flex w-full items-center justify-between border-b border-white/10 py-3 text-sm font-semibold text-[#f9f7f2]/90 transition hover:text-[#f9f7f2]"
                    >
                      <span className="flex items-center gap-3">
                        {icon}
                        {l.label}
                      </span>
                      <ChevronDown className={cn('h-4 w-4 text-[#6b7c2a] transition', eqOpen && 'rotate-180')} />
                    </button>
                    {eqOpen && (
                      <div className="bg-[#202e12]/50">
                        <Link
                          href="/equipment"
                          onClick={() => { setOpen(false); setEqOpen(false) }}
                          className="flex items-center justify-between border-b border-white/5 py-2.5 pl-7 pr-4 text-xs font-semibold text-[#f9f7f2] transition hover:text-[#f9f7f2]"
                        >
                          All Equipment
                          <ChevronRight className="h-3 w-3 text-[#6b7c2a]" />
                        </Link>
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/equipment/${c.slug}`}
                            onClick={() => { setOpen(false); setEqOpen(false) }}
                            className="flex items-center justify-between border-b border-white/5 py-2.5 pl-7 pr-4 text-xs font-medium text-[#f9f7f2]/80 transition hover:text-[#f9f7f2]"
                          >
                            {c.name}
                            <ChevronRight className="h-3 w-3 text-[#6b7c2a]" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center justify-between border-b border-white/10 py-3 text-sm font-semibold text-[#f9f7f2]/90 transition last:border-0 hover:text-[#f9f7f2]',
                    pathname === l.href && 'text-[#f9f7f2]'
                  )}
                >
                  <span className="flex items-center gap-3">
                    {icon}
                    {l.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#6b7c2a]" />
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
