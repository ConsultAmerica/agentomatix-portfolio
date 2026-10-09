import { CONTACT_URL } from "@/data/contact";

const stats = [
  { value: "11", label: "Products shipped" },
  { value: "4", label: "Industries served" },
  { value: "0→1", label: "Idea to production" },
];

/** Light editorial hero: gradient keyword, blueprint grid, floating product stack. */
export function Hero() {
  return (
    <section className="hero-surface relative overflow-x-clip px-5 pt-32 pb-16 sm:px-8 sm:pt-36 lg:px-10 lg:pt-40 lg:pb-24">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-orb hero-orb--a" />
      <div aria-hidden="true" className="hero-orb hero-orb--b" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-[#0f2a4a]/10 bg-white/70 px-3 py-1 text-[12.5px] font-medium text-[#3b4c63] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1e7fe0] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1e7fe0]" />
            </span>
            Digital product studio · AI agents
          </p>

          <h1
            className="hero-in display-heading mt-6 text-[2.6rem] text-[#0f2a4a] sm:text-[3.4rem] lg:text-[4.1rem]"
            style={{ animationDelay: "80ms" }}
          >
            We design and build <span className="text-gradient-brand">intelligent</span>{" "}
            digital products.
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-[17px] leading-relaxed text-[#4a5c74] sm:text-[18px]"
            style={{ animationDelay: "160ms" }}
          >
            Enterprise AI, healthcare tools and operations systems, designed around the
            decisions people make at work and shipped to production.
          </p>

          <div
            className="hero-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#stories"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-6 py-3 text-[15px] font-medium text-white shadow-[0_14px_30px_-14px_rgba(15,42,74,0.7)] transition-colors hover:bg-[#1e7fe0]"
            >
              Explore our work
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#0f2a4a]/15 bg-white/70 px-6 py-3 text-[15px] font-medium text-[#0f2a4a] backdrop-blur transition-colors hover:border-[#1e7fe0]/50 hover:text-[#1e7fe0]"
            >
              Start a project
            </a>
          </div>

          <dl
            className="hero-in mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#0f2a4a]/10 pt-6"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-[#0f2a4a] sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-[12.5px] leading-snug text-[#5b6f88]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-in relative lg:col-span-6" style={{ animationDelay: "200ms" }}>
          <div className="hero-stage">
            <div className="hero-float relative overflow-hidden rounded-[22px] border border-[#0f2a4a]/10 bg-[#0c1a32] p-2 shadow-[0_40px_80px_-40px_rgba(15,42,74,0.6)] sm:p-3">
              <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 truncate text-[11px] tracking-wide text-white/40">
                  agentomatix / shipped products
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/hero-applications.png"
                alt="Layered product interfaces representing Agentomatix digital products across AI, healthcare and commerce"
                className="h-auto w-full rounded-[14px] object-contain object-top"
              />
            </div>

            <div className="hero-chip hero-chip--a">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Agent run complete · 98% confidence
            </div>
            <div className="hero-chip hero-chip--b">
              <span className="font-mono text-[#1e7fe0]">→</span>
              Extract · Validate · Route
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
