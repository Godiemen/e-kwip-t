'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'
import type { Machine } from '@/lib/products'
import { getCategory, waOrderLink } from '@/lib/products'

export function MachineCard({ machine }: { machine: Machine }) {
  const category = getCategory(machine.category)
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:border-primary hover:shadow-lg">
      <Link href={`/stock/${machine.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={machine.image || '/placeholder.svg'}
            alt={machine.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-brand/90 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-foreground backdrop-blur">
            {category?.shortName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/stock/${machine.slug}`}>
          <h3 className="font-display text-lg font-semibold leading-tight text-card-foreground transition group-hover:text-primary">
            {machine.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {machine.hours === 'N/A' ? machine.year : `${machine.hours} hrs`}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {machine.location}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
          <div>
            <span className="font-display text-xl font-bold text-foreground">{machine.price}</span>
            {machine.vat && (
              <span className="ml-1 text-xs text-muted-foreground">{machine.vat}</span>
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
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle className="h-4 w-4" />
          Order via WhatsApp
        </a>
      </div>
    </div>
  )
}
