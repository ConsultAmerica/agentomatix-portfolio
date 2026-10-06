import type { Project } from "@/data/projects";

type ProductImageProps = {
  project: Project;
  className?: string;
  forceFit?: "contain" | "cover";
};

const STAGE =
  "bg-[radial-gradient(ellipse_at_30%_20%,_#1a3a5c_0%,_#0e1f3c_50%,_#0a1730_100%)]";

function resolveSrc(project: Project): string | undefined {
  if (project.slug === "data-agent") return "/projects/data-agent-clean.jpg";
  if (project.slug === "mediguide-ai") return "/projects/mediguide-anon.jpg";
  if (project.slug === "agentic-customer-operations") return "/projects/agentic-anon.jpg";
  if (project.slug === "bosiano") return "/projects/bosiano.png";
  if (project.slug === "smartwrite-ai") return "/projects/smartwrite.png";
  if (project.slug === "romeah") return "/projects/romeah.png";
  return project.image;
}

export function ProductImage({ project, className, forceFit }: ProductImageProps) {
  const fit = forceFit ?? project.imageFit ?? "contain";
  const src = resolveSrc(project);

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center ${STAGE} text-sm text-slate-400 ${className ?? ""}`}
      >
        {project.name}
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden ${STAGE} p-3 sm:p-4 ${className ?? ""}`}
    >
      <div className="w-full max-w-[480px] overflow-hidden rounded-[10px] border border-white/12 bg-[#0c1a32] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#122844] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${project.name} product interface`}
          loading="lazy"
          className={
            fit === "cover"
              ? "aspect-[16/10] h-auto w-full object-cover object-top"
              : "h-auto max-h-[180px] w-full object-cover object-top sm:max-h-[200px]"
          }
        />
      </div>
    </div>
  );
}
