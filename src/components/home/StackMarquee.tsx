const stack = [
  "OpenAI",
  "Agents",
  "RAG",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Postgres",
  "Vector search",
  "Node",
  "Vercel",
];

/** Endless tech-stack ticker between the hero and the capability vaults. */
export function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0a1730] py-4 text-white/70">
      <div aria-hidden="true" className="marquee-fade pointer-events-none absolute inset-0 z-10" />
      <ul className="marquee-track flex w-max items-center gap-12" aria-label="Technology we build with">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= stack.length ? true : undefined}
            className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-[#1e7fe0]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
