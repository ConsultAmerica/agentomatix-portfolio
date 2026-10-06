import Link from "next/link";
import type { Project } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

const LEAD_SLUGS = ["importnest-ai-agent", "joblens"] as const;

/** Fixed editorial pairs for More Shipped Work (portfolio indices 06–11). */
const SHIPPED_PAIRS: [string, string][] = [
  ["smartwrite-ai", "bosiano"],
  ["romeah", "appointease"],
  ["smart-appliances", "sarco-appliances"],
];

function LeadItem({ project, number }: { project: Project; number: string }) {
  const media = getProjectMedia(project.slug);
  const cardSrc = media?.cardImage ?? project.image;

  return (
    <Link href={`/portfolio/${project.slug}/`} className="work-item work-item--lead group">
      {cardSrc ? (
        <div className="work-item__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cardSrc} alt="" loading="lazy" decoding="async" className="work-item__img" />
        </div>
      ) : null}
      <div className="work-item__meta">
        <div className="work-item__copy min-w-0">
          <h3 className="work-item__title">
            <span className="work-item__num">{number}</span>
            {project.name}
          </h3>
          <p className="work-item__desc">{project.eyebrow}</p>
        </div>
        <span className="work-item__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}

function ShippedProject({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  const media = getProjectMedia(project.slug);
  const cardSrc = media?.cardImage ?? project.image;

  return (
    <Link href={`/portfolio/${project.slug}/`} className="shipped-project group">
      <div className="shipped-project__media">
        {cardSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cardSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="shipped-project__img"
          />
        ) : null}
      </div>

      <div className="shipped-project__meta">
        <div className="shipped-project__copy min-w-0">
          <h3 className="shipped-project__title">
            <span className="shipped-project__num">{number}</span>
            {project.name}
          </h3>
          <p className="shipped-project__desc">{project.eyebrow}</p>
        </div>
        <span className="shipped-project__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}

/**
 * Lead pair under “From concept to live product.”
 * Then a deliberate More Shipped Work index: three equal 50/50 pairs.
 */
export function MoreWorkTable({ projects }: { projects: Project[] }) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const leadProjects = LEAD_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (project): project is Project => Boolean(project),
  );

  const pairs = SHIPPED_PAIRS.map(([left, right], pairIndex) => {
    const leftProject = bySlug.get(left);
    const rightProject = bySlug.get(right);
    const leftNumber = String(6 + pairIndex * 2).padStart(2, "0");
    const rightNumber = String(7 + pairIndex * 2).padStart(2, "0");
    return { leftProject, rightProject, leftNumber, rightNumber };
  }).filter(
    (pair): pair is {
      leftProject: Project;
      rightProject: Project;
      leftNumber: string;
      rightNumber: string;
    } => Boolean(pair.leftProject && pair.rightProject),
  );

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-black/5 bg-band-light px-5 py-12 text-band-light-fg sm:px-8 sm:py-14 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="meta-label text-band-light-muted">More shipped work</p>
        <h2 className="section-heading mt-3 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          From concept to live product.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-band-light-muted">
          Digital products designed, engineered and shipped for real-world use.
        </p>

        {leadProjects.length > 0 ? (
          <div className="work-lead mt-12">
            {leadProjects.map((project, index) => (
              <LeadItem
                key={project.slug}
                project={project}
                number={String(4 + index).padStart(2, "0")}
              />
            ))}
          </div>
        ) : null}

        {pairs.length > 0 ? (
          <div className="shipped-work mt-20 sm:mt-24">
            <p className="meta-label text-band-light-muted">More shipped work</p>
            <h2 className="section-heading mt-3 max-w-3xl text-3xl sm:text-4xl">
              Products built to be used.
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-band-light-muted">
              Commerce, writing, scheduling and service experiences taken from idea to
              working software.
            </p>
            <p className="shipped-work__count mt-5">06—11 / Six shipped products</p>

            <div className="shipped-work__pairs">
              {pairs.map((pair) => (
                <div key={`${pair.leftProject.slug}-${pair.rightProject.slug}`} className="shipped-pair">
                  <ShippedProject project={pair.leftProject} number={pair.leftNumber} />
                  <ShippedProject project={pair.rightProject} number={pair.rightNumber} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
