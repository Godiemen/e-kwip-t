import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image
        src="/123690 (1).jpg"
        alt="E-kwip-T logo"
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/20"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-bold tracking-tight', tone === 'light' ? 'text-[#f9f7f2]' : 'text-[#6b7c2a]')}>
          E-KWIP-T
        </span>
        <span className={cn('text-[0.65rem] font-semibold uppercase tracking-[0.2em]', tone === 'light' ? 'text-[#f9f7f2]/80' : 'text-[#6b7c2a]/70')}>
          Sales &amp; Service
        </span>
      </span>
    </span>
  )
}
