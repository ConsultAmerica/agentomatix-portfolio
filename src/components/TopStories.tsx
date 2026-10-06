"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { topStoryImages } from "@/data/editorial";
import { EditorialPhoto } from "@/components/EditorialPhoto";

export default function TopStories({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  if (!project) return null;

  const visual = topStoryImages[project.slug];
  const prev = () => setIndex((value) => (value - 1 + projects.length) % projects.length);
  const next = () => setIndex((value) => (value + 1) % projects.length);

  return (
    <section
      id="stories"
      className="scroll-mt-24 border-t border-black/5 bg-band-light px-5 py-10 text-band-light-fg sm:px-8 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="meta-label text-band-light-muted">Featured work</p>
            <h2 className="section-heading mt-2 text-3xl sm:text-4xl">
              Case studies from the field
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-band-light-muted">
              Document intelligence, healthcare guidance and agentic operations — products
              built around the work people already do.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm tabular-nums text-band-light-muted">
              {index + 1} / {projects.length}
            </p>
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white"
              aria-label="Previous story"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white"
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-[12px] border border-black/8 bg-band-light-card shadow-[0_16px_40px_-32px_rgba(7,13,26,0.4)]">
          <div className="grid lg:grid-cols-12">
            <div className="project-media relative aspect-[16/10] bg-[#0e1f3c] lg:col-span-7 lg:aspect-auto lg:min-h-[260px]">
              {visual ? (
                <EditorialPhoto
                  src={visual.src}
                  alt={visual.alt}
                  kind="product"
                  stage="dark"
                  fit="cover"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-center border-t border-black/6 p-5 sm:p-7 lg:col-span-5 lg:border-l lg:border-t-0">
              <p className="meta-label text-band-light-muted">
                Case {String(index + 1).padStart(2, "0")}
                {project.status === "in-progress" ? " · In progress" : ""}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-band-light-fg sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-3 text-base leading-snug text-band-light-fg/80">
                {project.headline}
              </p>
              <p className="mt-4 text-[13px] tracking-wide text-band-light-muted">
                {project.disciplines.join(" · ")}
              </p>
              <Link
                href={`/portfolio/${project.slug}/`}
                className="link-arrow mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#122844] px-4 py-2 text-sm font-medium text-white"
              >
                View case study
                <span className="arrow transition-transform duration-300" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {projects.map((item, i) => {
            const thumb = topStoryImages[item.slug];
            const active = i === index;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setIndex(i)}
                className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-all ${
                  active
                    ? "border-[#122844] bg-white"
                    : "border-black/8 bg-white/70 hover:border-black/20"
                }`}
              >
                <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#0e1f3c]">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb.src}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-band-light-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="truncate text-sm font-semibold text-band-light-fg">{item.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
