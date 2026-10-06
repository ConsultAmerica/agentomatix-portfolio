import type { Project } from "@/data/projects";
import { getProjectMedia } from "@/data/projectMedia";

type ProductImageProps = {
  project: Project;
  className?: string;
};

/** Product screenshot from media config — always contain; never crop UI. */
export function ProductImage({ project, className }: ProductImageProps) {
  const media = getProjectMedia(project.slug);
  const src = media?.heroImage ?? media?.cardImage ?? project.image;

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#0e1f3c] text-sm text-slate-400 ${className ?? ""}`}
      >
        {project.name}
      </div>
    );
  }

  return (
    <div
      className={`relative flex w-full items-start justify-center overflow-hidden bg-[#0e1f3c] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${project.name} product interface`}
        loading="lazy"
        decoding="async"
        className="h-auto w-full object-contain object-top"
      />
    </div>
  );
}
