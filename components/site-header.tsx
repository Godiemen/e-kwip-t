'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, Home, Users, Search, User, Phone } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { cn } from '@/lib/utils'

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
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
          {navLinks.map((l) => (
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
          ))}
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
