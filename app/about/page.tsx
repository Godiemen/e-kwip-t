import type { Metadata } from 'next'
import Image from 'next/image'
import { ShieldCheck, Heart, Eye, Sparkles, ArrowRight, MapPin, Truck, Wrench, Users } from 'lucide-react'
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

const services = [
  { icon: Truck, title: 'Nationwide Delivery', body: 'Transport arranged to any province, quoted separately based on machine and distance.' },
  { icon: Wrench, title: 'Inspected Stock', body: 'Every machine is checked and specced before it goes on the sheet — what you see is what you get.' },
  { icon: Users, title: 'Trade-Ins Considered', body: 'Selling to upgrade? We value your current machine against your next purchase.' },
  { icon: MapPin, title: 'Based in South Africa', body: 'Owner-managed, servicing the agricultural, forestry, mining, and construction sectors.' },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[600px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/123752.jpg"
            alt="E-kwip-T heavy equipment on site"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/90 via-[#202e12]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/70 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[600px] w-full max-w-7xl items-center px-4 md:px-6">
            <div className="w-full min-w-0 max-w-2xl py-24 md:py-28">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/60">About E-kwip-T</span>
              </div>
              <h1 className="mt-6 break-words font-display text-4xl font-bold leading-[1.08] text-[#f9f7f2] sm:text-5xl md:text-6xl lg:text-7xl">
                About Us
              </h1>
              <p className="mt-5 text-xl font-semibold text-[#f9f7f2]/95 md:text-2xl">
                E-KWIP-T Sales &amp; Service (Pty) Ltd
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#f9f7f2]/70 md:text-lg">
                Humble beginnings, honest dealing — sourcing and selling equipment across South Africa.
              </p>
              <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <a
                  href="/equipment"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
                >
                  Browse Our Stock
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#f9f7f2]/30 px-7 py-3.5 font-display font-semibold text-[#f9f7f2] backdrop-blur-sm transition hover:bg-[#f9f7f2]/10"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Story — enhanced layout */}
        <section className="bg-[#f9f7f2] py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              {/* Left: images */}
              <div className="relative order-2 lg:order-1">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                    <Image
                      src="/machines/forestry-harvester.png"
                      alt="Forestry harvester"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-2xl sm:mt-10">
                    <Image
                      src="/machines/rigid-dump-truck.png"
                      alt="Rigid dump truck"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-3xl bg-[#6b7c2a]/10" />
                <div className="absolute -right-3 -top-3 -z-10 h-24 w-24 rounded-full bg-[#4b6572]/10" />
              </div>

              {/* Right: story text */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-[#6b7c2a]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">How It All Started</span>
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-[#5a6a22] md:text-5xl">
                  Our Story
                </h2>

                <div className="mt-8 space-y-6">
                  <p className="text-lg leading-relaxed text-foreground/80">
                    E-KWIP-T Sales &amp; Service (Pty) Ltd didn&apos;t start with a business plan or a
                    boardroom pitch — it started with a simple favour. A tenant of ours mentioned he
                    was looking for a decent tractor, and asked if we could help him find one. We took
                    it seriously, did the legwork, and found him exactly what he needed.
                  </p>

                  <p className="leading-relaxed text-foreground/80">
                    That one small task turned out to be the seed of something much bigger. Five years
                    later, that very same tractor is still part of our fleet — a quiet reminder of
                    where it all began. What started as a one-off favour has since grown, step by step,
                    into a business built on trust, hard work, and a genuine care for getting our
                    customers the right equipment.
                  </p>

                  <p className="leading-relaxed text-foreground/80">
                    We&apos;ve never lost sight of that original spirit. Every piece of equipment we
                    sell and every service we provide is handled with the same care we gave that very
                    first request.
                  </p>

                  {/* Quote highlight */}
                  <blockquote className="relative border-l-4 border-[#6b7c2a] bg-white px-7 py-6 shadow-md">
                    <span className="absolute -top-3 left-4 font-display text-5xl font-bold text-[#6b7c2a]/20">&ldquo;</span>
                    <p className="relative text-lg font-semibold leading-relaxed text-[#5a6a22]">
                      Be secure in the knowledge that if you use our services, we will give you the best
                      possible.
                    </p>
                  </blockquote>

                  <p className="leading-relaxed text-foreground/80">
                    At the heart of everything we do are four simple values: Honesty, Integrity,
                    Transparency, and a standard of service second to none. These aren&apos;t just
                    words to us — they&apos;re the foundation the business was built on, and
                    they&apos;re what continue to guide how we treat every customer who walks through
                    our door.
                  </p>

                  <p className="text-lg font-semibold leading-relaxed text-[#5a6a22]">
                    Be secure in the knowledge that if you use our services, we will give you the best
                    possible.
                  </p>
                </div>

                <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                  <a
                    href="/equipment"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-md transition hover:bg-[#5a6a22] hover:shadow-lg"
                  >
                    Browse Our Stock
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Founder */}
        <section className="relative overflow-hidden bg-[#202e12] py-20 md:py-32">
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full bg-gradient-to-br from-[#6b7c2a] to-transparent" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: founder photo with floating badge */}
              <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <Image
                    src="/123744.jpg"
                    alt="Terrence Carey, Co-Founder of E-Kwip-T Sales & Services (Pty) Ltd"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/40 via-transparent to-transparent" />
                </div>
                {/* Floating experience badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-[#6b7c2a] px-6 py-3 shadow-xl lg:left-auto lg:right-4 lg:translate-x-0">
                  <p className="font-display text-3xl font-bold text-[#f9f7f2]">30+</p>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#f9f7f2]/80">Years Experience</p>
                </div>
                {/* Decorative accents */}
                <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-[#6b7c2a]/15" />
                <div className="absolute -bottom-8 -left-4 -z-10 h-36 w-36 rounded-3xl bg-[#4b6572]/15" />
              </div>

              {/* Right: founder bio */}
              <div className="order-1 min-w-0 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-[#6b7c2a]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">About the Founder</span>
                </div>
                <h2 className="mt-5 break-words font-display text-3xl font-bold leading-tight text-[#f9f7f2] sm:text-4xl md:text-5xl">
                  Terrence Carey
                </h2>
                <p className="mt-3 text-base font-semibold text-[#f9f7f2]/70 sm:text-lg">
                  Co-Founder of E-Kwip-T Sales &amp; Services (Pty) Ltd
                </p>

                <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                  <p className="text-sm leading-relaxed text-[#f9f7f2]/70 sm:text-base">
                    Born in Zambia, Terrence Carey relocated to KwaZulu-Natal at a very young age when
                    his mother moved the family to South Africa. KZN has been his home ever since,
                    shaping his connection to the people, rural communities, and industries that form
                    the foundation of his journey.
                  </p>
                  <p className="text-sm leading-relaxed text-[#f9f7f2]/70 sm:text-base">
                    Growing up in the Upper Highway area, Terrence&apos;s family later moved and
                    eventually settled on a family-owned property in the Makabathini area near
                    Camperdown. With his mother&apos;s passion and involvement in the equestrian world,
                    Terrence developed an early appreciation for rural life, agriculture, and the
                    importance of dependable equipment and machinery.
                  </p>
                  <p className="text-sm leading-relaxed text-[#f9f7f2]/70 sm:text-base">
                    With over 30 years of experience in both mechanical and marine engineering
                    environments, Terrence has developed extensive technical knowledge and hands-on
                    expertise across a variety of industries. His experience includes working with
                    large diesel marine engines, process engineering, and industrial applications,
                    providing him with a strong understanding of heavy machinery, equipment
                    performance, and operational requirements.
                  </p>
                  <p className="text-sm leading-relaxed text-[#f9f7f2]/70 sm:text-base">
                    Terrence is the Co-Founder of E-Kwip-T Sales &amp; Services (Pty) Ltd, established
                    in 2021, specialising in the buying, selling, and sourcing of quality agricultural,
                    industrial, forestry, mining, and construction equipment.
                  </p>
                  <p className="text-sm leading-relaxed text-[#f9f7f2]/70 sm:text-base">
                    Driven by integrity, experience, and a lifelong passion for machinery, Terrence is
                    committed to connecting businesses with the right equipment solutions to enhance
                    productivity, efficiency, and long-term success.
                  </p>
                </div>

                {/* Tagline */}
                <div className="mt-6 rounded-xl border-l-4 border-[#6b7c2a] bg-white/5 px-5 py-4 backdrop-blur-sm sm:mt-8 sm:px-7 sm:py-5">
                  <p className="text-base font-semibold leading-relaxed text-[#6b7c2a] sm:text-lg">
                    E-KWIP-T Sales &amp; Service (Pty) Ltd — Powering Your Productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values — enhanced cards */}
        <section className="bg-[#f9f7f2] py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">What We Stand For</span>
                <span className="h-px w-12 bg-[#6b7c2a]" />
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                Our Values
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#5c6b52]">
                Four principles that guide every transaction, every conversation, and every machine
                that leaves our yard.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#d7d4c9] bg-white p-8 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl"
                >
                  <span className="absolute -right-4 -top-4 font-display text-8xl font-bold text-[#6b7c2a]/5 transition group-hover:text-[#6b7c2a]/10">
                    {i + 1}
                  </span>
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6b7c2a] to-[#5a6a22] text-[#f9f7f2] shadow-lg">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-6 font-display text-xl font-semibold text-[#202e12]">
                    {v.title}
                  </h3>
                  <div className="relative mt-3 h-0.5 w-10 rounded-full bg-[#6b7c2a]/20 transition group-hover:w-full group-hover:bg-[#6b7c2a]" />
                  <p className="relative mt-4 text-sm leading-relaxed text-[#5c6b52]">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="bg-white py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">What We Do</span>
                <span className="h-px w-12 bg-[#6b7c2a]" />
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold text-[#5a6a22] md:text-5xl">
                Services &amp; Capability
              </h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group rounded-2xl border border-[#d7d4c9] bg-[#f9f7f2] p-7 transition hover:border-[#6b7c2a] hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#efede5] text-[#6b7c2a] transition group-hover:bg-[#6b7c2a] group-hover:text-[#f9f7f2]">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6b52]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#4b6572] py-24 text-center md:py-32">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/machines/wheel-loader.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 to-transparent" />
          <div className="relative mx-auto max-w-3xl px-4 md:px-6">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#f9f7f2]/30" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/50">Get In Touch</span>
              <span className="h-px w-12 bg-[#f9f7f2]/30" />
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold text-[#f9f7f2] md:text-5xl">
              Ready To Get Started?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#f9f7f2]/80">
              Whether you are buying, selling, or just looking for advice — we are here to help.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-8 py-4 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/equipment"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#f9f7f2]/30 px-8 py-4 font-display font-semibold text-[#f9f7f2] backdrop-blur-sm transition hover:bg-[#f9f7f2]/10"
              >
                Browse Stock
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
