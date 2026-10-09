import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseHeroVisual, ProductGallery } from "@/components/ProjectMedia";
import { getProjectMedia } from "@/data/projectMedia";
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
  const media = getProjectMedia(slug);
  const gallery = media?.gallery ?? [];
  const heroSrc = media?.heroImage ?? project.image;
  const chromeUrl = media?.chromeHost ?? project.liveUrl?.replace(/^https?:\/\//, "");
  const isDataAgent = slug === "data-agent";
  const galleryIncludesHero =
    Boolean(heroSrc) && gallery.some((shot) => shot.src === heroSrc);

  // Show hero alone only when it is not already the first gallery narrative shot.
  const showStandaloneHero = Boolean(heroSrc) && !galleryIncludesHero && !isDataAgent;

  // Never render the same ProductGallery twice (was duplicating Romeah/Bosiano/etc.).
  const topGalleryShots =
    !isDataAgent && galleryIncludesHero ? gallery : [];
  const bottomGalleryShots = isDataAgent
    ? gallery.filter((shot) => shot.src !== heroSrc)
    : galleryIncludesHero
      ? []
      : gallery;

  return (
    <main className="theme-light bg-background text-foreground">
      <SiteHeader />

      <article className="px-5 pt-24 sm:px-8 sm:pt-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/portfolio/#work"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← All work
          </Link>

          <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            {project.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {project.name}
          </h1>

          {isDataAgent ? (
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="max-w-md text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Document intelligence,
                  <br />
                  built around evidence.
                </p>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
                  Extract, structure and verify information from complex business documents.
                </p>
                <a
                  href="#product-experience"
                  className="link-arrow mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  Explore the workflow
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
              <div className="lg:col-span-7">
                {heroSrc ? (
                  <div className="overflow-hidden rounded-[10px] border border-border bg-[#e9eef3] p-1.5 sm:p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroSrc}
                      alt="Data Agent application screenshot — sample services agreement with extracted information"
                      className="h-auto w-full object-contain object-top"
                    />
                  </div>
                ) : null}
                <p className="mt-3 text-[13px] text-muted">
                  {media?.heroCaption ??
                    "Document intelligence with confidence and precision."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-lg leading-snug text-foreground/85 sm:text-xl">
                {project.headline}
              </p>
              {project.workflow && project.workflow.length > 0 ? (
                <p className="mt-4 text-[13px] tracking-wide text-muted">
                  {project.workflow.join(" → ")}
                </p>
              ) : (
                <p className="mt-3 text-[13px] text-muted">
                  {project.disciplines.join(" · ")}
                </p>
              )}
            </>
          )}

          {showStandaloneHero ? (
            <div className="project-media mt-8">
              <CaseHeroVisual
                src={heroSrc!}
                alt={media?.heroCaption ?? `${project.name} product interface`}
                url={chromeUrl}
                fit={media?.heroFit ?? "contain"}
                position={media?.heroPosition ?? "top"}
                presentation={media?.heroPresentation ?? "browser"}
                density={media?.heroDensity ?? "standard"}
                caption={media?.heroCaption}
              />
            </div>
          ) : null}

          {topGalleryShots.length > 0 ? (
            <div id="product-experience" className="mt-8 scroll-mt-24">
              <ProductGallery
                shots={topGalleryShots}
                url={chromeUrl}
                heading={media?.galleryHeading ?? "Product experience"}
                subheading={media?.gallerySubheading}
              />
            </div>
          ) : null}

          <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-14">
            <div className="lg:col-span-8">
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                Overview
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                {caseStudy.overview}
              </p>

              <div className="mt-12 space-y-12">
                {caseStudy.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-muted">{section.body}</p>
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
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Outcome</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{caseStudy.outcome}</p>
              </section>

              {bottomGalleryShots.length > 0 ? (
                <div id="product-experience" className="mt-14 scroll-mt-24">
                  <ProductGallery
                    shots={bottomGalleryShots}
                    url={
                      media?.heroPresentation === "browser" ? chromeUrl : undefined
                    }
                    heading={media?.galleryHeading ?? "Product experience"}
                    subheading={media?.gallerySubheading}
                  />
                </div>
              ) : null}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8 rounded-[12px] border border-border bg-surface p-6">
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
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0f2a4a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1e7fe0]"
                  >
                    Visit {project.name} ↗
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

      <SiteFooter />
    </main>
  );
}
