import { Reveal } from "@/components/Reveal";
import { CONTACT_URL } from "@/data/contact";

/** Closing call to action on a deep navy band with a soft brand glow. */
export function CtaBand() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-white px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="cta-surface relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] px-6 py-20 text-center text-white sm:px-10 sm:py-28">
        <div aria-hidden="true" className="vault-grid pointer-events-none absolute inset-0 opacity-60" />
        <Reveal className="relative mx-auto max-w-3xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#6fb0f0]">
            Start a project
          </p>
          <h2 className="display-heading mt-5 text-[2.4rem] sm:text-6xl">
            Tell us about the product you need to <span className="text-gradient-brand-dark">ship.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/65">
            Document intelligence, healthcare tooling, commerce or operations systems. We will
            help you design it, build it and run it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0f2a4a] transition-colors hover:bg-[#1e7fe0] hover:text-white"
            >
              Talk to our team
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#stories"
              className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white"
            >
              See the work first
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
