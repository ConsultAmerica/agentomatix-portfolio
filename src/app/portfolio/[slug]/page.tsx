import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { ProductImage } from "@/components/ProductImage";
import { getProject, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} | Agentomatix`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const { caseStudy } = project;

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      <article className="px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/portfolio/#work"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← All work
          </Link>

          <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            {project.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-snug text-foreground/85 sm:text-2xl">
            {project.headline}
          </p>
          <p className="mt-4 text-[13px] text-muted">
            {project.disciplines.join(" · ")}
          </p>

          {project.image || project.slug === "agentic-customer-operations" ? (
            <div className="project-media mt-12 overflow-hidden rounded-[12px] border border-border bg-[#122844]">
              <div className="aspect-[16/10]">
                <ProductImage project={project} />
              </div>
            </div>
          ) : null}

          <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
            <div className="lg:col-span-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                Overview
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                {caseStudy.overview}
              </p>

              <div className="mt-14 space-y-12">
                {caseStudy.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-muted">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>

              {caseStudy.decisions.length > 0 ? (
                <section className="mt-14 rounded-[12px] border border-border bg-surface p-6 sm:p-8">
                  <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                    A decision from the work
                  </h2>
                  {caseStudy.decisions.map((decision) => (
                    <div key={decision.decision} className="mt-6 space-y-5">
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">
                          The problem
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                          {decision.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">
                          The decision
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                          {decision.decision}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">
                          Why
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                          {decision.why}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">
                          Result
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                          {decision.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              <section className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Outcome
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">
                  {caseStudy.outcome}
                </p>
              </section>

              {caseStudy.screenshots.length > 0 ? (
                <section className="mt-14">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Product imagery
                  </h2>
                  <div className="mt-8 space-y-10">
                    {caseStudy.screenshots.map((shot) => (
                      <figure key={shot.label}>
                        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                          {shot.label}
                        </p>
                        <p className="mt-2 text-sm text-muted">{shot.caption}</p>
                        {shot.image ? (
                          <div className="project-media mt-4 overflow-hidden rounded-[12px] border border-border bg-surface-soft">
                            <div className="aspect-[16/10]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={shot.image}
                                alt={shot.caption}
                                loading="lazy"
                                className="h-full w-full object-cover object-top transition-transform duration-700"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 flex aspect-[16/10] items-center justify-center rounded-[12px] border border-dashed border-border bg-surface-soft px-6 text-center text-sm text-muted">
                            Art-directed screenshot placeholder — {shot.label}
                          </div>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8 rounded-[12px] border border-border bg-surface p-6">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                    Project type
                  </p>
                  <p className="mt-2 text-sm text-foreground">{project.eyebrow}</p>
                </div>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                    Disciplines
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {project.disciplines.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                    Technology
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {project.builtWith.join(" · ")}
                  </p>
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    View live application
                    <span className="arrow transition-transform duration-300" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <p className="text-sm text-muted">Case study in progress</p>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-20 border-t border-border py-12 sm:py-16">
            <Link
              href="/portfolio/#work"
              className="link-arrow inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <span className="arrow transition-transform duration-300" aria-hidden="true">
                ←
              </span>
              Back to selected work
            </Link>
          </div>
        </div>
      </article>

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
