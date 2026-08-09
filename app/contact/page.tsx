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
        <section className="relative min-h-[400px] overflow-hidden bg-[#3a4d45]">
          <Image
            src="/machines/motor-grader.png"
            alt="Heavy equipment on site"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative mx-auto flex min-h-[400px] max-w-7xl items-center px-4 md:px-6">
            <div className="max-w-2xl py-16">
              <h1 className="font-display text-5xl font-bold leading-tight text-[#f9f7f2] md:text-6xl">
                Contact Us
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-[#f9f7f2]/90">
                Get in touch with Terrence directly. We reply fast and are happy to book a viewing,
                answer questions or arrange transport.
              </p>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="bg-[#f9f7f2] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                className="rounded-xl border border-[#d7d4c9] bg-white p-6 transition hover:border-[#6b7c2a]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]/10 text-[#25d366]">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-[#202e12]">
                  WhatsApp
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#6b7c2a]">{CONTACT.displayPhone}</p>
                <p className="mt-2 text-sm text-[#5c6b52]">Message {CONTACT.name} now</p>
              </a>

              <a
                href={`tel:${CONTACT.displayPhone.replace(/\s/g, '')}`}
                className="rounded-xl border border-[#d7d4c9] bg-white p-6 transition hover:border-[#6b7c2a]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4b6572]/10 text-[#4b6572]">
                  <Phone className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-[#202e12]">
                  Phone
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#6b7c2a]">{CONTACT.displayPhone}</p>
                <p className="mt-2 text-sm text-[#5c6b52]">Call {CONTACT.name} during office hours</p>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="rounded-xl border border-[#d7d4c9] bg-white p-6 transition hover:border-[#6b7c2a]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#6b7c2a]/10 text-[#6b7c2a]">
                  <Mail className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-[#202e12]">
                  Email
                </h2>
                <p className="mt-1 break-words text-xl font-bold text-[#6b7c2a]">
                  {CONTACT.email}
                </p>
                <p className="mt-2 text-sm text-[#5c6b52]">Send us the details</p>
              </a>

              <div className="rounded-xl border border-[#d7d4c9] bg-white p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4b6572]/10 text-[#4b6572]">
                  <MapPin className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-[#202e12]">
                  Location
                </h2>
                <p className="mt-1 text-xl font-bold text-[#6b7c2a]">South Africa</p>
                <p className="mt-2 text-sm text-[#5c6b52]">
                  KwaZulu-Natal based · Nationwide delivery
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-12 rounded-xl border border-[#d7d4c9] bg-white p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold text-[#5a6a22]">
                Office Hours
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-[#202e12]">Monday – Friday</p>
                  <p className="text-[#5c6b52]">08:00 – 17:00</p>
                </div>
                <div>
                  <p className="font-semibold text-[#202e12]">Saturday</p>
                  <p className="text-[#5c6b52]">08:00 – 12:00</p>
                </div>
                <div>
                  <p className="font-semibold text-[#202e12]">Sunday</p>
                  <p className="text-[#5c6b52]">Closed</p>
                </div>
                <div>
                  <p className="font-semibold text-[#202e12]">Public Holidays</p>
                  <p className="text-[#5c6b52]">By appointment</p>
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
