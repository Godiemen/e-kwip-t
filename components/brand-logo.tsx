import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({
  className,
  tone = 'light',
  home = false,
}: {
  className?: string
  tone?: 'light' | 'dark'
  home?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span
        className={cn(
          'shrink-0 overflow-hidden rounded-full ring-2 ring-white/20',
          home ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-14 w-14'
        )}
      >
        <Image
          src="/123690 (1).jpg"
          alt="E-kwip-t logo"
          width={96}
          height={96}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            home ? 'text-2xl sm:text-3xl' : 'text-lg',
            tone === 'light' ? 'text-[#f9f7f2]' : 'text-[#6b7c2a]'
          )}
        >
          E-kwip-t
        </span>
        <span
          className={cn(
            'mt-1 font-semibold uppercase tracking-[0.15em]',
            home ? 'text-[0.65rem] sm:text-xs' : 'text-[0.65rem]',
            tone === 'light' ? 'text-[#f9f7f2]/80' : 'text-[#6b7c2a]/70'
          )}
        >
          Sales &amp; Service (Pty) Ltd
        </span>
      </span>
    </span>
  )
}
