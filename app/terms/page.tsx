import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions governing the use of the E-kwip-T Sales and Service website and any transactions arising from it.',
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Terms & Conditions"
          description="The terms governing use of this website and any transactions arising from it."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Terms & Conditions' },
          ]}
        />

        <section className="bg-[#f9f7f2] py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="rounded-2xl border border-[#d7d4c9] bg-white p-8 shadow-sm md:p-12">
              <div className="space-y-8 text-[#202e12]">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">1. Introduction</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  These terms and conditions govern your use of the E-kwip-T Sales and Service
                  website located at e-kwip-t-zeta.vercel.app (the &quot;Site&quot;). By accessing or
                  using the Site, you agree to be bound by these terms. If you do not agree with any
                  part of these terms, please do not use the Site.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">2. Listings &amp; pricing</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  All equipment listings, specifications, and prices displayed on this Site are
                  provided in good faith and are subject to change without prior notice. Prices are
                  indicative and may exclude VAT unless otherwise stated. Items marked as
                  &quot;POA&quot; (Price on Application) require a direct enquiry for pricing.
                </p>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  E-kwip-T Sales and Service reserves the right to withdraw or modify any listing at
                  any time without notice. A listing does not constitute a binding offer to sell.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">3. Enquiries &amp; transactions</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  Enquiries submitted through this Site (including WhatsApp or contact forms) are
                  not binding until a written agreement is signed by both parties. Any sale is
                  subject to availability, inspection, and agreement on price and terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">4. Delivery &amp; transport</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  Delivery can be arranged to any location within South Africa and is quoted
                  separately based on the machine, distance, and transport provider. Delivery costs
                  are not included in the listed price unless explicitly stated.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">5. Trade-ins</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  Trade-in valuations are provided at the sole discretion of E-kwip-T Sales and
                  Service and are subject to physical inspection of the equipment being traded in.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">6. Intellectual property</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  All content on this Site, including text, images, logos, and design elements, is
                  the property of E-kwip-T Sales and Service or its licensors and may not be
                  reproduced, distributed, or used for commercial purposes without prior written
                  consent.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">7. Limitation of liability</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  E-kwip-T Sales and Service shall not be liable for any direct, indirect,
                  incidental, or consequential damages arising from the use of this Site or reliance
                  on any information displayed herein. Equipment is sold &quot;as is, where is&quot;
                  unless otherwise agreed in writing.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">8. Privacy</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  Your use of this Site is also governed by our{' '}
                  <a
                    href="/cookies"
                    className="font-semibold text-[#6b7c2a] underline decoration-1 underline-offset-4 hover:text-[#4b6572]"
                  >
                    Cookie Policy
                  </a>
                  . Information submitted through enquiry forms is used solely to respond to your
                  request and will not be shared with third parties without your consent.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">9. Changes to these terms</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  We may update these terms and conditions at any time. Continued use of the Site
                  after changes are posted constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">10. Contact</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  For any questions regarding these terms, please{' '}
                  <a
                    href="/contact"
                    className="font-semibold text-[#6b7c2a] underline decoration-1 underline-offset-4 hover:text-[#4b6572]"
                  >
                    contact us
                  </a>
                  .
                </p>
              </div>

              <p className="border-t border-[#d7d4c9] pt-6 text-sm text-[#5c6b52]">
                Last updated: August 2026
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
