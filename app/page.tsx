import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Search, Handshake, Shield, Lightbulb, MessageSquare, Check, Phone, Tag } from 'lucide-react'
import { HomeHero } from '@/components/home-hero'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { EquipmentSection } from '@/components/equipment-section'

export const revalidate = 0

export default function HomePage() {
  return (
    <>
      <SiteHeader home />
      <main>
        <HomeHero />

        {/* Three CTA cards */}
        <section className="bg-[#f9f7f2] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {/* Selling */}
              <div className="rounded-2xl border border-[#d7d4c9] bg-white p-2.5 shadow-sm transition hover:shadow-xl sm:p-7">
                <Users className="h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[10px] font-bold leading-tight text-[#202e12] sm:mt-5 sm:text-lg">SELLING EQUIPMENT?</h3>
                <p className="mt-1 hidden text-[10px] leading-relaxed text-[#f97316] sm:mt-3 sm:block sm:text-sm">
                  Turn your surplus equipment into an opportunity.
                </p>
                <p className="mt-1 text-[9px] leading-relaxed text-[#5c6b52] sm:mt-0 sm:text-sm">
                  We help you reach potential buyers, manage enquiries and make the selling process easier.
                </p>
                <Link
                  href="/sell"
                  className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-[#f97316] transition hover:text-[#ea580c] sm:mt-5 sm:gap-1.5 sm:text-sm"
                >
                  LEARN MORE <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>

              {/* Looking */}
              <div className="rounded-2xl border border-[#d7d4c9] bg-white p-2.5 shadow-sm transition hover:shadow-xl sm:p-7">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#6b7c2a] text-[#f9f7f2] sm:h-14 sm:w-14">
                  <Search className="h-3.5 w-3.5 sm:h-7 sm:w-7" />
                </span>
                <h3 className="mt-2 break-words font-display text-[10px] font-bold leading-tight text-[#202e12] sm:mt-5 sm:text-lg">LOOKING FOR EQUIPMENT?</h3>
                <p className="mt-1 hidden text-[10px] font-bold text-[#202e12] sm:mt-3 sm:block sm:text-sm">
                  Let us help you find the right opportunity.
                </p>
                <p className="mt-1 text-[9px] leading-relaxed text-[#5c6b52] sm:mt-0 sm:text-sm">
                  Tell Terrence and the team what you&apos;re looking for. We&apos;ll use our network and industry contacts to connect you with potential sellers.
                </p>
                <Link
                  href="/equipment"
                  className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-[#6b7c2a] transition hover:text-[#5a6a22] sm:mt-5 sm:gap-1.5 sm:text-sm"
                >
                  LEARN MORE <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>

              {/* Personal service */}
              <div className="rounded-2xl border border-[#d7d4c9] bg-white p-2.5 shadow-sm transition hover:shadow-xl sm:p-7">
                <Handshake className="h-6 w-6 text-[#6b7c2a] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[10px] font-bold leading-tight text-[#202e12] sm:mt-5 sm:text-lg">PERSONAL SERVICE</h3>
                <p className="mt-1 hidden text-[10px] leading-relaxed text-[#f97316] sm:mt-3 sm:block sm:text-sm">
                  Deal directly with Terrence and the team.
                </p>
                <p className="mt-1 text-[9px] leading-relaxed text-[#5c6b52] sm:mt-0 sm:text-sm">
                  We take the time to understand your requirements and help you every step of the way.
                </p>
                <Link
                  href="/about"
                  className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-[#f97316] transition hover:text-[#ea580c] sm:mt-5 sm:gap-1.5 sm:text-sm"
                >
                  ABOUT US <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <EquipmentSection />

        {/* Why Choose E-KWIP-t */}
        <section className="bg-[#202e12] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold uppercase text-[#f9f7f2] sm:text-4xl md:text-5xl">
                WHY CHOOSE E-KWIP-t?
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-5 gap-0 sm:mt-12">
              {/* Personal Service */}
              <div className="border-r border-white/10 px-1 py-4 text-center last:border-r-0 sm:px-4 sm:py-6">
                <Users className="mx-auto h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[8px] font-bold uppercase leading-tight text-[#f9f7f2] sm:mt-4 sm:text-sm sm:leading-snug lg:text-base">
                  Personal Service
                </h3>
                <p className="mx-auto mt-1 max-w-[200px] text-[7px] leading-snug text-[#f9f7f2]/60 sm:mt-2 sm:max-w-[220px] sm:text-xs sm:leading-relaxed lg:text-sm">
                  Deal directly with Terrence and the team who take the time to understand your needs.
                </p>
              </div>

              {/* Independent & Unbiased */}
              <div className="border-r border-white/10 px-1 py-4 text-center last:border-r-0 sm:px-4 sm:py-6">
                <Shield className="mx-auto h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[8px] font-bold uppercase leading-tight text-[#f9f7f2] sm:mt-4 sm:text-sm sm:leading-snug lg:text-base">
                  Independent &amp; Unbiased
                </h3>
                <p className="mx-auto mt-1 max-w-[200px] text-[7px] leading-snug text-[#f9f7f2]/60 sm:mt-2 sm:max-w-[220px] sm:text-xs sm:leading-relaxed lg:text-sm">
                  We are an independent equipment broker focused on connecting buyers and sellers.
                </p>
              </div>

              {/* Industry Knowledge */}
              <div className="border-r border-white/10 px-1 py-4 text-center last:border-r-0 sm:px-4 sm:py-6">
                <Lightbulb className="mx-auto h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[8px] font-bold uppercase leading-tight text-[#f9f7f2] sm:mt-4 sm:text-sm sm:leading-snug lg:text-base">
                  Industry Knowledge
                </h3>
                <p className="mx-auto mt-1 max-w-[200px] text-[7px] leading-snug text-[#f9f7f2]/60 sm:mt-2 sm:max-w-[220px] sm:text-xs sm:leading-relaxed lg:text-sm">
                  Our understanding of equipment and industry connections help us identify opportunities.
                </p>
              </div>

              {/* Professional Communication */}
              <div className="border-r border-white/10 px-1 py-4 text-center last:border-r-0 sm:px-4 sm:py-6">
                <MessageSquare className="mx-auto h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[8px] font-bold uppercase leading-tight text-[#f9f7f2] sm:mt-4 sm:text-sm sm:leading-snug lg:text-base">
                  Professional Communication
                </h3>
                <p className="mx-auto mt-1 max-w-[200px] text-[7px] leading-snug text-[#f9f7f2]/60 sm:mt-2 sm:max-w-[220px] sm:text-xs sm:leading-relaxed lg:text-sm">
                  We keep the process clear, professional and straightforward from enquiry to connection.
                </p>
              </div>

              {/* Strong Connections */}
              <div className="border-r border-white/10 px-1 py-4 text-center last:border-r-0 sm:px-4 sm:py-6">
                <Handshake className="mx-auto h-6 w-6 text-[#f97316] sm:h-10 sm:w-10" strokeWidth={1.5} />
                <h3 className="mt-2 break-words font-display text-[8px] font-bold uppercase leading-tight text-[#f9f7f2] sm:mt-4 sm:text-sm sm:leading-snug lg:text-base">
                  Strong Connections
                </h3>
                <p className="mx-auto mt-1 max-w-[200px] text-[7px] leading-snug text-[#f9f7f2]/60 sm:mt-2 sm:max-w-[220px] sm:text-xs sm:leading-relaxed lg:text-sm">
                  Our growing network helps bring equipment owners and potential buyers together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder + CTA */}
        <section className="bg-[#f9f7f2] py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {/* Mobile: stacked layout */}
            <div className="flex flex-col gap-8 lg:hidden">
              {/* Photo + bio side by side */}
              <div className="flex gap-4">
                <div className="relative w-24 shrink-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                    <Image
                      src="/123744.jpg"
                      alt="Terrence Carey, Owner of E-KWIP-t Sales &amp; Service (Pty) Ltd"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-base font-bold uppercase text-[#202e12]">
                    Terrence Carey
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-[#f97316]">
                    Owner — E-KWIP-t Sales &amp; Service (Pty) Ltd
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5c6b52]">
                    Terrence believes that successful equipment deals start with the right people and the right information.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#202e12]">
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#6b7c2a] text-[#f9f7f2]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      Understand the requirement.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#6b7c2a] text-[#f9f7f2]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      Make the connection.
                    </li>
                  </ul>
                  <Link
                    href="/about"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#6b7c2a] px-5 py-2.5 font-display text-xs font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
                  >
                    Read Full Story
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-display text-lg font-bold uppercase text-[#202e12]">
                  Ready to Buy or Sell?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5c6b52]">
                  Whether you have used machinery to sell or you&apos;re looking for quality pre-owned equipment, Terrence and the team are ready to help.
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f97316] px-5 py-3 font-display text-sm font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#ea580c]"
                  >
                    <Tag className="h-4 w-4" />
                    SELL YOUR EQUIPMENT
                  </Link>
                  <Link
                    href="/equipment"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#202e12] px-5 py-3 font-display text-sm font-semibold text-[#f9f7f2] transition hover:bg-[#202e12]/90"
                  >
                    <Search className="h-4 w-4" />
                    FIND EQUIPMENT
                  </Link>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-[#6b7c2a]">
                  <Phone className="h-4 w-4" />
                  Let&apos;s talk about your equipment requirements.
                </p>
              </div>
            </div>

            {/* Desktop: 3-column layout */}
            <div className="hidden items-start gap-8 lg:grid lg:grid-cols-3">
              {/* Left: photo */}
              <div className="relative w-full">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/123744.jpg"
                    alt="Terrence Carey, Owner of E-KWIP-t Sales &amp; Service (Pty) Ltd"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              </div>

              {/* Middle: bio */}
              <div className="min-w-0">
                <h2 className="font-display text-3xl font-bold uppercase text-[#202e12] lg:text-4xl">
                  Terrence Carey
                </h2>
                <p className="mt-2 text-sm font-semibold text-[#f97316] lg:text-base">
                  Owner — E-KWIP-t Sales &amp; Service (Pty) Ltd
                </p>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#5c6b52] lg:text-base">
                  <p>
                    Terrence believes that successful equipment deals start with the right people and
                    the right information.
                  </p>
                  <p>
                    Together with his team, Terrence takes a personal approach to every enquiry —
                    whether you&apos;re selling equipment or searching for your next machine.
                  </p>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-[#202e12] lg:text-base">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#6b7c2a] text-[#f9f7f2]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Understand the requirement.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#6b7c2a] text-[#f9f7f2]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Make the connection.
                  </li>
                </ul>

                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-7 py-3.5 font-display font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#5a6a22]"
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Right: CTA */}
              <div className="min-w-0">
                <h2 className="font-display text-3xl font-bold uppercase text-[#202e12] lg:text-4xl">
                  Ready to Buy or Sell?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#5c6b52] lg:text-base">
                  Whether you have used machinery to sell or you&apos;re looking for quality pre-owned
                  equipment, Terrence and the team are ready to help.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/sell"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f97316] px-6 py-3.5 font-display text-sm font-semibold text-[#f9f7f2] shadow-lg transition hover:bg-[#ea580c]"
                  >
                    <Tag className="h-4 w-4" />
                    SELL YOUR EQUIPMENT
                  </Link>
                  <Link
                    href="/equipment"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#202e12] px-6 py-3.5 font-display text-sm font-semibold text-[#f9f7f2] transition hover:bg-[#202e12]/90"
                  >
                    <Search className="h-4 w-4" />
                    FIND EQUIPMENT
                  </Link>
                </div>

                <p className="mt-5 flex items-center gap-2 text-sm text-[#6b7c2a]">
                  <Phone className="h-4 w-4" />
                  Let&apos;s talk about your equipment requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
