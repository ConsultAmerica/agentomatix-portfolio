"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type Vault = {
  code: string;
  title: string;
  headline: string;
  body: string;
  pipeline: string[];
  products: { name: string; slug: string }[];
};

const vaults: Vault[] = [
  {
    code: "V-01",
    title: "AI agents + data",
    headline: "Make your documents and data actually do something.",
    body: "Agents that read, extract, reason and act, with confidence scores and an evidence trail a reviewer can trust.",
    pipeline: ["Ingest", "Extract", "Reason", "Act"],
    products: [
      { name: "Data Agent", slug: "data-agent" },
      { name: "JobLens", slug: "joblens" },
      { name: "SmartWrite", slug: "smartwrite-ai" },
      { name: "ImportNest", slug: "importnest-ai-agent" },
    ],
  },
  {
    code: "V-02",
    title: "Healthcare",
    headline: "Clarity for patients and the teams who care for them.",
    body: "Guidance, scheduling and follow-up tools that turn scattered health information into the next right step.",
    pipeline: ["Intake", "Organize", "Explain", "Follow up"],
    products: [
      { name: "MediGuide", slug: "mediguide-ai" },
      { name: "AppointEase", slug: "appointease" },
    ],
  },
  {
    code: "V-03",
    title: "Commerce",
    headline: "Storefronts that look premium and sell like it.",
    body: "Editorial product pages, fast catalogs and checkout flows built for brands that care how they are seen.",
    pipeline: ["Discover", "Browse", "Cart", "Checkout"],
    products: [
      { name: "Romeah", slug: "romeah" },
      { name: "Bosiano", slug: "bosiano" },
      { name: "Sarco", slug: "sarco-appliances" },
      { name: "Smart Appliances", slug: "smart-appliances" },
    ],
  },
  {
    code: "V-04",
    title: "Enterprise platforms",
    headline: "The systems a whole company runs on.",
    body: "Hiring, internal tools and platforms engineered for real teams: AI interviews, scoring and recruiter dashboards that go straight to production.",
    pipeline: ["Role", "Interview", "Score", "Hire"],
    products: [{ name: "ConsultHire", slug: "consulthire" }],
  },
];

/**
 * Four capability "vaults". The active one opens wide to reveal an animated
 * pipeline, a short pitch and the shipped products inside it. Opens on hover,
 * focus or tap; on small screens the vaults stack as an accordion.
 */
export function Vaults() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="vaults"
      className="vault-surface relative scroll-mt-28 overflow-hidden px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div aria-hidden="true" className="vault-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#6fb0f0]">
              Capabilities / 01
            </p>
            <h2 className="section-heading mt-4 max-w-2xl text-[2.2rem] sm:text-5xl">
              Four places we do our <span className="text-gradient-brand-dark">best work.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-white/60">
            Open a vault to see what is inside: the pipeline we build and the products we
            have shipped with it.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="flex flex-col gap-3 lg:h-[460px] lg:flex-row">
            {vaults.map((vault, index) => {
              const open = index === active;
              return (
                <div
                  key={vault.code}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(index);
                    }
                  }}
                  className={`vault-card group relative cursor-pointer overflow-hidden rounded-[20px] border text-left outline-none focus-visible:ring-2 focus-visible:ring-[#1e7fe0] ${
                    open
                      ? "vault-card--open border-[#1e7fe0]/45"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="relative flex h-full flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] tracking-[0.2em] text-[#6fb0f0]">
                        {vault.code}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-8 w-8 place-items-center rounded-full border text-[15px] transition-all duration-500 ${
                          open
                            ? "rotate-45 border-[#1e7fe0] bg-[#1e7fe0] text-white"
                            : "border-white/25 text-white/70"
                        }`}
                      >
                        +
                      </span>
                    </div>

                    {!open ? (
                      <p className="mt-auto hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 lg:block">
                        {vault.products.length} shipped
                      </p>
                    ) : null}
                    <h3
                      className={`${open ? "" : "mt-3"} font-semibold tracking-tight transition-all duration-500 ${
                        open ? "text-[15px] text-white/60 lg:mt-6" : "text-[26px] leading-[1.1] lg:text-[28px]"
                      }`}
                    >
                      {vault.title}
                    </h3>

                    <div className={`vault-body ${open ? "vault-body--open" : ""}`}>
                      <div className="min-h-0">
                        <Pipeline steps={vault.pipeline} running={open} />
                        <p className="mt-6 text-[22px] font-semibold leading-snug tracking-tight sm:text-[26px]">
                          {vault.headline}
                        </p>
                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
                          {vault.body}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {vault.products.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/portfolio/${product.slug}/`}
                              tabIndex={open ? 0 : -1}
                              onClick={(event) => event.stopPropagation()}
                              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-[#1e7fe0] hover:text-white"
                            >
                              {product.name} ↗
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pipeline({ steps, running }: { steps: string[]; running: boolean }) {
  return (
    <div className="mt-6" aria-hidden="true">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(111,176,240,0.45)_0_6px,transparent_6px_12px)]" />
        {running ? <span className="pipeline-pulse" /> : null}
        {steps.map((step) => (
          <span
            key={step}
            className="relative z-10 grid h-4 w-4 place-items-center rounded-full border border-[#6fb0f0] bg-[#0c1a32]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fb0f0]" />
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {steps.map((step) => (
          <span key={step} className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
