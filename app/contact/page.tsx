import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CONTACT, waLink } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Contact Us | E-kwip-T Sales and Service',
  description:
    'Get in touch with E-kwip-T Sales and Service. Call or WhatsApp Terrence on 082 636 5471 or email sales@ekwipt.co.za.',
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[480px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/machines/motor-grader.png"
            alt="Heavy equipment on site"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#202e12]/90 via-[#202e12]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202e12]/60 via-transparent to-transparent" />
          <div className="relative mx-auto flex min-h-[480px] w-full max-w-7xl items-center px-4 md:px-6">
            <div className="w-full min-w-0 max-w-2xl py-20 md:py-24">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f9f7f2]/60">We&apos;re Here To Help</span>
              </div>
              <h1 className="mt-6 break-words font-display text-4xl font-bold leading-[1.08] text-[#f9f7f2] sm:text-5xl md:text-6xl lg:text-7xl">
                Contact Us
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f9f7f2]/70 md:text-lg">
                Get in touch with Terrence directly. We reply fast and are happy to book a viewing,
                answer questions or arrange transport.
              </p>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25d366]/10 text-[#25d366] transition group-hover:bg-[#25d366] group-hover:text-white">
                  <MessageCircle className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                  WhatsApp
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#6b7c2a]">{CONTACT.displayPhone}</p>
                <p className="mt-2 text-sm text-[#5c6b52]">Message {CONTACT.name} now</p>
              </a>

              <a
                href={`tel:${CONTACT.displayPhone.replace(/\s/g, '')}`}
                className="group rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4b6572]/10 text-[#4b6572] transition group-hover:bg-[#4b6572] group-hover:text-white">
                  <Phone className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                  Phone
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#6b7c2a]">{CONTACT.displayPhone}</p>
                <p className="mt-2 text-sm text-[#5c6b52]">Call {CONTACT.name} during office hours</p>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="group rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm transition hover:border-[#6b7c2a] hover:shadow-xl"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6b7c2a]/10 text-[#6b7c2a] transition group-hover:bg-[#6b7c2a] group-hover:text-white">
                  <Mail className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                  Email
                </h2>
                <p className="mt-1 break-words text-xl font-bold text-[#6b7c2a]">
                  {CONTACT.email}
                </p>
                <p className="mt-2 text-sm text-[#5c6b52]">Send us the details</p>
              </a>

              <div className="rounded-2xl border border-[#d7d4c9] bg-white p-7 shadow-sm">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4b6572]/10 text-[#4b6572]">
                  <MapPin className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-lg font-semibold text-[#202e12]">
                  Location
                </h2>
                <p className="mt-1 text-xl font-bold text-[#6b7c2a]">South Africa</p>
                <p className="mt-2 text-sm text-[#5c6b52]">
                  KwaZulu-Natal based · Nationwide delivery
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-10 rounded-2xl border border-[#d7d4c9] bg-white p-8 shadow-sm md:p-12">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#6b7c2a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7c2a]">When To Reach Us</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-[#5a6a22] md:text-3xl">
                Office Hours
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-[#f9f7f2] p-5">
                  <p className="font-semibold text-[#202e12]">Monday – Friday</p>
                  <p className="mt-1 text-[#5c6b52]">08:00 – 17:00</p>
                </div>
                <div className="rounded-xl bg-[#f9f7f2] p-5">
                  <p className="font-semibold text-[#202e12]">Saturday</p>
                  <p className="mt-1 text-[#5c6b52]">08:00 – 12:00</p>
                </div>
                <div className="rounded-xl bg-[#f9f7f2] p-5">
                  <p className="font-semibold text-[#202e12]">Sunday</p>
                  <p className="mt-1 text-[#5c6b52]">Closed</p>
                </div>
                <div className="rounded-xl bg-[#f9f7f2] p-5">
                  <p className="font-semibold text-[#202e12]">Public Holidays</p>
                  <p className="mt-1 text-[#5c6b52]">By appointment</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
