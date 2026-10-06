import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProductImage } from "@/components/ProductImage";
import { EditorialPhoto } from "@/components/EditorialPhoto";
import { actionImages, craftImages, topStoryImages } from "@/data/editorial";
import { practices } from "@/data/projects";

export function SelectedWorkFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const editorial = topStoryImages[project.slug];
  const imageSrc = editorial?.src ?? project.image;

  return (
    <section className="border-t border-black/5 bg-band-light px-5 py-10 text-band-light-fg sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="meta-label text-band-light-muted">Selected work</p>
              <p className="text-sm tabular-nums text-band-light-muted">
                {String(index).padStart(2, "0")}
              </p>
            </div>

            <h2 className="section-heading mt-3 text-3xl sm:text-4xl">{project.name}</h2>
            <p className="mt-3 max-w-xl text-lg leading-snug sm:text-xl">{project.headline}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-band-light-muted">
              {project.summary}
            </p>

            <div className="mt-5 grid gap-4 border-t border-black/10 pt-5 sm:grid-cols-2">
              <div>
                <p className="meta-label text-band-light-muted">Challenge</p>
                <p className="mt-1.5 text-sm leading-relaxed text-band-light-fg/85">
                  {project.challenge}
                </p>
              </div>
              <div>
                <p className="meta-label text-band-light-muted">Approach</p>
                <p className="mt-1.5 text-sm leading-relaxed text-band-light-fg/85">
                  {project.approach}
                </p>
              </div>
            </div>

            <Link
              href={`/portfolio/${project.slug}/`}
              className="link-arrow mt-6 inline-flex items-center gap-2 rounded-full bg-[#122844] px-4 py-2 text-sm font-medium text-white"
            >
              View case study
              <span className="arrow transition-transform duration-300" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[12px] border border-[#122844]/15 bg-[#0e1f3c] shadow-[0_16px_40px_-30px_rgba(12,26,50,0.45)]">
              <div className="aspect-[16/10]">
                {editorial ? (
                  <EditorialPhoto
                    src={editorial.src}
                    alt={editorial.alt}
                    kind="product"
                    stage="dark"
                  />
                ) : imageSrc ? (
                  <EditorialPhoto
                    src={imageSrc}
                    alt={`${project.name} product interface`}
                    kind="product"
                    stage="dark"
                  />
                ) : (
                  <ProductImage project={project} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CraftingProducts() {
  return (
    <section
      id="studio"
      className="scroll-mt-24 border-t border-border bg-band-dark px-5 py-10 text-band-dark-fg sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <p className="meta-label text-band-dark-muted">Crafting Intelligent Products</p>
        <h2 className="section-heading mt-2 max-w-3xl text-3xl sm:text-4xl">
          AI, interface, data and workflow — treated as one product.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-band-dark-muted">
          The same product surfaces we ship: intelligence, the screen operators use, and the
          workflow that ties them together.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3 sm:gap-4">
          {practices.map((practice, index) => {
            const photo = craftImages[index];
            return (
              <a
                key={practice.title}
                href={practice.href}
                className="group overflow-hidden rounded-[12px] border border-white/10 bg-[#122844] transition-colors hover:border-cyan-400/35"
              >
                <div className="project-media aspect-[16/10] overflow-hidden bg-[#0e1f3c]">
                  {photo ? (
                    <EditorialPhoto
                      src={photo.src}
                      alt={photo.alt}
                      kind={photo.kind ?? "photo"}
                      stage="dark"
                    />
                  ) : null}
                </div>
                <div className="border-t border-white/10 p-4 sm:p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{practice.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-band-dark-muted">
                    {practice.description}
                  </p>
                  <span className="link-arrow mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                    Explore
                    <span className="arrow transition-transform duration-300" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AiInAction({ projects }: { projects: Project[] }) {
  return (
    <section
      id="ai-in-action"
      className="scroll-mt-24 border-t border-black/5 bg-band-light px-5 py-10 text-band-light-fg sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <p className="meta-label text-band-light-muted">AI in Action</p>
        <h2 className="section-heading mt-2 max-w-3xl text-3xl sm:text-4xl">
          Useful when it changes a workflow.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-band-light-muted">
          Three products where intelligence sits inside a real operating loop — extract,
          guide, investigate — with people still in control.
        </p>

        <div className="mt-7 space-y-4">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;
            const visual = actionImages[project.slug];

            return (
              <article
                key={project.slug}
                className="overflow-hidden rounded-[12px] border border-[#122844]/12 bg-[#f7f9fc] shadow-[0_12px_36px_-28px_rgba(12,26,50,0.35)]"
              >
                <div className="grid items-stretch lg:grid-cols-2">
                  <div
                    className={`flex flex-col justify-center p-5 sm:p-6 ${
                      reverse ? "order-1 lg:order-2" : ""
                    }`}
                  >
                    <p className="meta-label text-band-light-muted">
                      {String(index + 1).padStart(2, "0")} · {project.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.name}</h3>
                    <p className="mt-2 text-[15px] text-band-light-fg/80">{project.headline}</p>
                    {project.workflow ? (
                      <p className="mt-3 text-xs tracking-wide text-band-light-muted sm:text-sm">
                        {project.workflow.join(" → ")}
                      </p>
                    ) : null}
                    <Link
                      href={`/portfolio/${project.slug}/`}
                      className="link-arrow mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-band-light-fg"
                    >
                      View case study
                      <span className="arrow transition-transform duration-300" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>

                  <div
                    className={`project-media min-h-[160px] bg-[#0e1f3c] lg:min-h-[200px] ${
                      reverse ? "order-2 lg:order-1" : ""
                    }`}
                  >
                    {visual ? (
                      <EditorialPhoto
                        src={visual.src}
                        alt={visual.alt}
                        kind="product"
                        stage="dark"
                      />
                    ) : (
                      <ProductImage project={project} />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
