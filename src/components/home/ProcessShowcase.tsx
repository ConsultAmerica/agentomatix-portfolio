"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/data/projects";

const stepImages = [
  { src: "/editorial/craft-product.jpg", alt: "Product team mapping a business workflow" },
  { src: "/editorial/craft-ui.jpg", alt: "Interface design work in progress" },
  { src: "/editorial/craft-code.jpg", alt: "Engineering a production system" },
  { src: "/editorial/craft-infra.jpg", alt: "Infrastructure running in production" },
];

/** Process as a selectable list with a cross-fading image, one step open at a time. */
export function ProcessShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="scroll-mt-28 bg-white px-5 py-20 text-[#0f2a4a] sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="meta-label text-[#5b6f88]">How we work</p>
          <h2 className="section-heading mx-auto mt-4 max-w-3xl text-[2.2rem] sm:text-5xl">
            One partner from the <span className="text-gradient-brand">first idea</span> to
            production.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#5b6f88]">
            A small senior team that owns the workflow, the interface and the infrastructure
            together.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <div className="grid overflow-hidden rounded-[24px] border border-[#0f2a4a]/10 bg-[#f6f8fb] lg:grid-cols-12">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#0c1a32] lg:col-span-6 lg:aspect-auto lg:min-h-[440px]">
              {stepImages.map((image, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image.src}
                  src={image.src}
                  alt={index === active ? image.alt : ""}
                  aria-hidden={index !== active}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a32]/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 font-mono text-[12px] uppercase tracking-[0.2em] text-white/80">
                Step {processSteps[active]?.step} / 04
              </p>
            </div>

            <ol className="flex flex-col justify-center p-3 sm:p-4 lg:col-span-6">
              {processSteps.map((step, index) => {
                const open = index === active;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      aria-expanded={open}
                      className={`relative w-full rounded-2xl px-5 py-5 text-left transition-colors sm:px-6 ${
                        open ? "bg-white shadow-[0_10px_30px_-20px_rgba(15,42,74,0.45)]" : "hover:bg-white/60"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-5 bottom-5 left-0 w-[3px] rounded-full bg-[#1e7fe0] transition-opacity ${
                          open ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span className="flex items-baseline justify-between gap-4">
                        <span
                          className={`text-[22px] font-semibold tracking-tight transition-colors sm:text-[26px] ${
                            open ? "text-[#0f2a4a]" : "text-[#0f2a4a]/45"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="font-mono text-[12px] text-[#1e7fe0]">{step.step}</span>
                      </span>
                      <span
                        className={`grid transition-all duration-500 ${
                          open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="min-h-0 overflow-hidden text-[15px] leading-relaxed text-[#5b6f88]">
                          {step.description}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
