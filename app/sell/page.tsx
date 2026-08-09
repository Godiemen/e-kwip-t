import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Camera, Handshake, ShieldCheck, Wrench } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CONTACT, waLink } from "@/lib/products"

export const metadata: Metadata = {
  title: "Sell Your Machine | E-KWIP-T Sales and Service",
  description:
    "List your excavator, dozer, ADT, tractor or forestry equipment with E-KWIP-T. We handle photography, listing and qualified buyers across South Africa.",
}

const steps = [
  {
    icon: Camera,
    title: "Send us the details",
    body: "WhatsApp Terrence the make, model, hours, year and a few photos. Rough info is fine — we fill in the rest.",
  },
  {
    icon: ShieldCheck,
    title: "We assess and price",
    body: "We give you an honest, market-related valuation based on condition, hours and current demand.",
  },
  {
    icon: Camera,
    title: "We list and market",
    body: "Professional listing photos, a proper spec sheet and exposure to our buyer network across the country.",
  },
  {
    icon: Handshake,
    title: "You get paid",
    body: "We qualify buyers, arrange viewings and transport, and see the deal through to a clean handover.",
  },
]

const reasons = [
  {
    icon: Handshake,
    title: "Real buyer network",
    body: "Contractors, farmers and plant hire operators contact us weekly looking for machines like yours.",
  },
  {
    icon: Wrench,
    title: "We know the iron",
    body: "Bell, Komatsu, JCB, John Deere and more — we price and describe machines like operators, not brokers.",
  },
  {
    icon: ShieldCheck,
    title: "Straight dealing",
    body: "No inflated promises. Clear terms, honest condition reports and paperwork handled properly.",
  },
]

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main>
      <PageHero
        eyebrow="Sell with us"
        title="Turn idle iron into cash"
        description="Whether it's a single dozer standing on the yard or a full fleet reduction, E-KWIP-T lists and sells earthmoving, agricultural and forestry equipment across South Africa."
        image="/machines/wheel-loader.png"
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading tag="How it works" title="Four steps to a sale" />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative flex flex-col gap-4 border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center bg-primary text-primary-foreground">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-2xl font-bold text-muted-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-card-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            tag="Why E-KWIP-T"
            title="Sellers keep coming back"
            className="text-secondary-foreground"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title} className="border border-white/10 bg-white/[0.03] p-6">
                <reason.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold text-secondary-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-foreground/70">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <h2 className="text-balance font-display text-3xl font-bold text-foreground md:text-4xl">
            Ready to list your machine?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Message Terrence on WhatsApp with what you're selling. Send whatever photos and details you have
            and we'll take it from there.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              WhatsApp {CONTACT.displayPhone}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              Other ways to reach us
            </Link>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  )
}
