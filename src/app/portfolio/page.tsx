import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { AiInAction, CraftingProducts } from "@/components/SelectedWork";
import { SelectedProducts } from "@/components/SelectedProducts";
import { MoreWorkTable } from "@/components/MoreWorkTable";
import { notes } from "@/data/notes";
import {
  getAiInActionProjects,
  getMoreWorkProjects,
  getSelectedProducts,
  heroCapabilities,
  processSteps,
  proofPoints,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Agentomatix | Digital Product Studio — Consult America",
  description:
    "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
  openGraph: {
    title: "Agentomatix | Digital Product Studio — Consult America",
    description:
      "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
    type: "website",
    url: "https://agentomatix-portfolio.pages.dev/portfolio/",
    siteName: "Agentomatix",
  },
};

export default function PortfolioPage() {
  const selectedProducts = getSelectedProducts();
  const aiInAction = getAiInActionProjects();
  const moreWork = getMoreWorkProjects();
  const homepageNotes = [
    notes.find((n) => n.slug === "rag-isnt-the-product")!,
    notes.find((n) => n.slug === "ai-mvp-lessons")!,
  ];

  return (
    <main id="top" className="relative bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-x-clip px-5 pt-24 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.1),_transparent_50%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 pb-10 lg:grid-cols-12 lg:gap-8 lg:pb-12">
          <div className="lg:col-span-7">
            <p className="reveal-up meta-label text-muted">Consult America</p>
            <p className="reveal-up mt-1.5 text-sm font-medium tracking-wide text-accent">
              Agentomatix · Digital Product Studio
            </p>

            <h1 className="reveal-up display-heading mt-5 max-w-3xl text-[2.15rem] text-foreground sm:text-[2.75rem] lg:text-[3.4rem]">
              We design and build{" "}
              <span className="editorial-italic">intelligent</span> digital products.
            </h1>

            <p className="reveal-up mt-4 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              Enterprise AI, healthcare tools and operations systems — designed around the
              decisions people make at work.
            </p>

            <div className="reveal-up mt-6">
              <a
                href="#stories"
                className="btn-primary inline-flex min-h-10 items-center justify-center rounded-full px-5 text-sm shadow-[0_0_24px_rgba(34,211,238,0.2)]"
              >
                Explore our work →
              </a>
            </div>

            <ul className="reveal-up mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted">
              {heroCapabilities.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-up lg:col-span-5">
            <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0c1a32]">
              <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Featured product
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">Data Agent</p>
                  <p className="mt-0.5 text-[12px] text-slate-400">
                    Document intelligence · Extraction · Verification
                  </p>
                </div>
                <Link
                  href="/portfolio/data-agent/"
                  className="shrink-0 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Case study →
                </Link>
              </div>
              <div className="px-2 pb-2 sm:px-3 sm:pb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/data-agent-extract-ui.jpg"
                  alt="Data Agent application — sample services agreement with extracted information panel"
                  className="h-auto w-full rounded-[8px] object-contain object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-band-light text-band-light-fg">
        <div className="mx-auto grid max-w-6xl gap-0 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-12 lg:px-10">
          {proofPoints.map((point, index) => (
            <div
              key={point.step}
              className={`py-3 sm:px-5 sm:py-0 ${
                index > 0 ? "border-t border-black/8 sm:border-l sm:border-t-0" : ""
              } ${index === 0 ? "sm:pl-0" : ""}`}
            >
              <p className="meta-label text-band-light-muted">{point.step}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                {point.value}
              </p>
              <p className="mt-1 text-sm text-band-light-muted">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SelectedProducts projects={selectedProducts} />

      <CraftingProducts />

      <AiInAction projects={aiInAction} />

      <MoreWorkTable projects={moreWork} />

      <section className="border-t border-black/5 bg-band-light px-5 py-12 text-band-light-fg sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="meta-label text-band-light-muted">How we build</p>
          <h2 className="section-heading mt-2 text-3xl sm:text-4xl">
            Discover → Design → Build → Deploy
          </h2>
          <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`border-t border-black/8 py-5 lg:border-t-0 lg:border-l lg:px-5 lg:py-0 ${
                  index === 0 ? "lg:border-l-0 lg:pl-0" : ""
                }`}
              >
                <p className="meta-label text-band-light-muted">{step.step}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-band-light-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="notes"
        className="scroll-mt-24 border-t border-border bg-band-dark px-5 py-12 text-band-dark-fg sm:px-8 sm:py-14 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="meta-label text-band-dark-muted">Notes</p>
          <h2 className="section-heading mt-2 text-3xl sm:text-4xl">Thinking from the work</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {homepageNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}/`}
                className="group rounded-[12px] border border-white/10 bg-[#122844] p-5 transition-colors hover:border-cyan-400/30"
              >
                <p className="text-[12px] tracking-wide text-band-dark-muted">{note.readTime}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-band-dark-muted">{note.excerpt}</p>
                <span className="link-arrow mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Read note
                  <span className="arrow transition-transform duration-300" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 border-t border-black/5 bg-band-light px-5 py-14 text-band-light-fg sm:px-8 sm:py-16 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="meta-label text-band-light-muted">Contact</p>
          <h2 className="display-heading max-w-3xl text-3xl sm:text-5xl">
            Tell us about the product you need to ship.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-band-light-muted">
            Whether it&apos;s document intelligence, healthcare tooling or operations systems —
            we&apos;ll help you design and build it.
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Consult America / Agentomatix
          </p>
          <p className="text-sm text-muted">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
