'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'
import type { Machine } from '@/lib/products'
import { getCategory, waOrderLink } from '@/lib/products'
import { cn } from '@/lib/utils'

export function MachineCard({ machine, variant = 'light' }: { machine: Machine; variant?: 'light' | 'dark' }) {
  const category = getCategory(machine.category)
  const dark = variant === 'dark'
  return (
    <div className={cn(
      'group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-2xl',
      dark
        ? 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#6b7c2a]'
        : 'border-border bg-card hover:border-primary'
    )}>
      <Link href={`/stock/${machine.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={machine.image || '/placeholder.svg'}
            alt={machine.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <span className="absolute left-3 top-3 rounded-full bg-brand/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-foreground shadow-md backdrop-blur-sm">
            {category?.shortName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/stock/${machine.slug}`}>
          <h3 className={cn(
            'font-display text-lg font-semibold leading-tight transition group-hover:text-primary',
            dark ? 'text-[#f9f7f2]' : 'text-card-foreground'
          )}>
            {machine.name}
          </h3>
        </Link>

        <div className={cn(
          'mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs',
          dark ? 'text-[#f9f7f2]/50' : 'text-muted-foreground'
        )}>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {machine.hours === 'N/A' ? machine.year : `${machine.hours} hrs`}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {machine.location}
          </span>
        </div>

        <div className={cn(
          'mt-4 flex items-end justify-between border-t pt-4',
          dark ? 'border-white/10' : 'border-border'
        )}>
          <div>
            <span className={cn(
              'font-display text-xl font-bold',
              dark ? 'text-[#f9f7f2]' : 'text-foreground'
            )}>{machine.price}</span>
            {machine.vat && (
              <span className={cn(
                'ml-1 text-xs',
                dark ? 'text-[#f9f7f2]/50' : 'text-muted-foreground'
              )}>{machine.vat}</span>
            )}
          </div>
          <Link
            href={`/stock/${machine.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:text-primary"
          >
            View
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <a
          href={waOrderLink(machine)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1da851]"
        >
          <MessageCircle className="h-4 w-4" />
          Order via WhatsApp
        </a>
      </div>
    </div>
  )
}
