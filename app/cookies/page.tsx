import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How E-kwip-T Sales and Service uses cookies and similar technologies on this website.',
}

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Cookie Policy"
          description="How we use cookies and similar technologies on this website."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Cookie Policy' },
          ]}
        />

        <section className="bg-[#f9f7f2] py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="space-y-8 text-[#202e12]">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">What are cookies?</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  Cookies are small text files placed on your device by websites you visit. They allow
                  the site to remember your actions and preferences over a period of time, so you
                  don&apos;t have to re-enter them every time you visit or navigate from one page to
                  another.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">How we use cookies</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  E-kwip-T Sales and Service uses cookies for the following purposes:
                </p>
                <ul className="mt-4 space-y-3 text-[#5c6b52]">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b7c2a]" />
                    <span>
                      <strong className="text-[#202e12]">Essential cookies</strong> — required for
                      the website to function correctly, such as maintaining your session when logged
                      into the admin panel.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b7c2a]" />
                    <span>
                      <strong className="text-[#202e12]">Analytics cookies</strong> — used to
                      understand how visitors interact with our website so we can improve the
                      experience. These are anonymous and aggregated.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b7c2a]" />
                    <span>
                      <strong className="text-[#202e12]">Preference cookies</strong> — remember
                      choices you make such as language or display preferences.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">
                  Third-party cookies
                </h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  We may use third-party services (such as Vercel Analytics) that set their own
                  cookies. These providers have their own privacy policies governing how they use
                  data collected through cookies.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">Managing cookies</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  You can control and delete cookies through your browser settings. Disabling
                  cookies may affect the functionality of this website. For more information on
                  managing cookies in your browser, refer to your browser&apos;s help documentation.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#5a6a22]">Contact us</h2>
                <p className="mt-3 leading-relaxed text-[#5c6b52]">
                  If you have any questions about our use of cookies, please{' '}
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
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
