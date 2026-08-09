'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent')
    if (!accepted) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="relative">
        <Image
          src="/machines/construction-site-hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#202e12]/90 via-[#3a4d45]/85 to-[#202e12]/90" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 md:flex-row md:justify-between md:px-6">
          <p className="text-sm text-[#f9f7f2]/90">
            We use cookies to improve your experience. By using this site you agree to our{' '}
            <Link href="/cookies" className="font-semibold text-[#f9f7f2] underline decoration-1 underline-offset-4 hover:text-white">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="font-semibold text-[#f9f7f2] underline decoration-1 underline-offset-4 hover:text-white">
              Terms &amp; Conditions
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={decline}
              className="rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-[#f9f7f2] backdrop-blur-sm transition hover:bg-white/20"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="rounded-md bg-[#6b7c2a] px-5 py-2 text-sm font-semibold text-[#f9f7f2] transition hover:bg-[#5a6a22]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
