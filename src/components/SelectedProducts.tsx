import Link from "next/link";
import type { Project } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";
import { ProjectMedia } from "@/components/ProjectMedia";

/**
 * Premium editorial flagship showcase — Data Agent, MediGuide, Consult America.
 * Alternating image/text, not a uniform card grid.
 */
export function SelectedProducts({ projects }: { projects: Project[] }) {
  return (
    <section
      id="stories"
      className="scroll-mt-24 border-t border-black/5 bg-band-light px-5 py-12 text-band-light-fg sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="meta-label text-band-light-muted">Selected products</p>
        <h2 className="section-heading mt-3 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          Work built around real problems.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-band-light-muted">
          AI systems, enterprise applications and digital products designed from workflow to
          deployment.
        </p>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {projects.map((project, index) => {
            const media = getProjectMedia(project.slug);
            const src = media?.cardImage ?? media?.heroImage ?? project.image;
            const reverse = index % 2 === 1;
            const category = project.disciplines.slice(0, 2).join(" · ");

            return (
              <article
                key={project.slug}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                  <p className="meta-label text-band-light-muted">
                    {String(index + 1).padStart(2, "0")} /
                    <span className="ml-2 font-normal normal-case tracking-normal text-band-light-muted">
                      {project.eyebrow}
                    </span>
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-snug text-band-light-fg/85">
                    {project.headline}
                  </p>
                  <p className="mt-6 text-[13px] tracking-wide text-band-light-muted">
                    {category}
                  </p>
                  <Link
                    href={`/portfolio/${project.slug}/`}
                    className="link-arrow mt-6 inline-flex items-center gap-2 text-sm font-medium text-band-light-fg"
                  >
                    Explore case study
                    <span className="arrow transition-transform duration-300" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>

                <div
                  className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}
                >
                  {src ? (
                    <div
                      className={`overflow-hidden rounded-[10px] border border-[#122844]/10 ${
                        project.slug === "data-agent"
                          ? "bg-[#e9eef3] p-1.5 sm:p-2"
                          : "bg-[#0e1f3c] p-3 sm:p-4"
                      }`}
                    >
                      <ProjectMedia
                        src={src}
                        alt={media?.heroCaption ?? `${project.name} product`}
                        url={
                          media?.heroPresentation === "browser"
                            ? media?.chromeHost
                            : undefined
                        }
                        fit={media?.heroFit ?? media?.cardFit ?? "contain"}
                        position={media?.heroPosition ?? "top"}
                        presentation={
                          project.slug === "data-agent"
                            ? "stage"
                            : (media?.heroPresentation ?? "browser")
                        }
                        density={media?.heroDensity ?? "dense"}
                      />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
