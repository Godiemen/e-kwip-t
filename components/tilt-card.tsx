'use client'

import { useRef, useState, type ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees */
  max?: number
  /** Perspective in px */
  perspective?: number
  /** Scale on hover */
  scale?: number
}

/**
 * Wraps children in a 3D perspective container that tilts
 * toward the cursor on hover. Works with any content (images, cards).
 */
export function TiltCard({
  children,
  className = '',
  max = 12,
  perspective = 800,
  scale = 1.03,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({
    transformStyle: 'preserve-3d',
    transition: 'transform 0.3s ease-out',
  })

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    const tiltX = (0.5 - y) * max * 2 // invert Y for natural feel
    const tiltY = (x - 0.5) * max * 2
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
      transformStyle: 'preserve-3d',
      transition: 'transform 0.05s ease-out',
    })
  }

  function handleLeave() {
    setStyle({
      transform: 'perspective(0) rotateX(0deg) rotateY(0deg) scale(1)',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.4s ease-out',
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={style}
    >
      {children}
    </div>
  )
}
