import type { Metadata } from 'next'
import Image from 'next/image'
import { ShieldCheck, Heart, Eye, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'About Us | E-kwip-T Sales and Service',
  description:
    'E-Kwip-T Sales and Services (Pty) Ltd — humble beginnings, honest dealing. We pride ourselves on Honesty, Integrity, Transparency and a service second to none.',
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Honesty',
    body: 'Straight talk on every machine — what you see is what you get, no hidden surprises.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    body: 'We stand behind every listing. If something is not right, we say so before you spend a cent.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    body: 'Priced, specced and inspected. Every detail is on the sheet for you to check before you buy.',
  },
  {
    icon: Sparkles,
    title: 'Service Second to None',
    body: 'From first enquiry to delivery, we go further than anyone else to get you the right machine.',
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[400px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/machines/forestry-mulcher.png"
            alt="Forestry mulcher on site"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative mx-auto flex min-h-[400px] max-w-7xl items-center px-4 md:px-6">
            <div className="max-w-2xl py-16">
              <h1 className="font-display text-5xl font-bold leading-tight text-[#f9f7f2] md:text-6xl">
                About Us
              </h1>
              <p className="mt-4 text-lg text-[#f9f7f2]/90">
                E-Kwip-T Sales and Services (Pty) Ltd
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[#f9f7f2] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl font-bold leading-tight text-[#5a6a22] md:text-5xl">
                  Our Story
                </h2>
                <p className="mt-6 leading-relaxed text-foreground/80">
                  E-Kwip-T Sales and Services (Pty) Ltd had a very humble beginning. We started the
                  business on a whim. I was asked by our tenant to find him a decent tractor. I did
                  exactly that and we currently own that very same tractor 5 years later. We have
                  been growing the business ever since.
                </p>
                <p className="mt-4 leading-relaxed text-foreground/80">
                  We pride ourselves on these values: Honesty, Integrity, Transparency and above all
                  a service second to none.
                </p>
                <p className="mt-4 text-lg font-semibold text-[#5a6a22]">
                  Be secure in the knowledge that if you use our services we will give you the best
                  possible.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-white shadow-lg">
                  <Image
                    src="/machines/forestry-harvester.png"
                    alt="Forestry harvester"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-white shadow-lg">
                  <Image
                    src="/machines/rigid-dump-truck.png"
                    alt="Rigid dump truck"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#6b7c2a]">
                What We Stand For
              </span>
              <h2 className="mt-2 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                Our Values
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-lg border border-[#d7d4c9] bg-[#f9f7f2] p-6 transition hover:border-[#6b7c2a]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#efede5] text-[#6b7c2a]">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#202e12]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6b52]">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
