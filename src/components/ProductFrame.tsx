type ProductFrameProps = {
  src: string;
  alt: string;
  className?: string;
  /** How the screenshot fills the frame */
  fit?: "contain" | "cover";
  /** Compact for cards; roomy for feature rows */
  size?: "sm" | "md" | "lg";
};

/**
 * Editorial product screenshot stage — navy field + browser chrome,
 * so UIs read as real software instead of floating mockups on empty black.
 */
export function ProductFrame({
  src,
  alt,
  className,
  fit = "cover",
  size = "md",
}: ProductFrameProps) {
  const maxH =
    size === "sm" ? "max-h-[140px] sm:max-h-[160px]" : size === "lg" ? "max-h-[220px] sm:max-h-[260px]" : "max-h-[170px] sm:max-h-[200px]";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,_#1a3a5c_0%,_#0e1f3c_45%,_#0a1730_100%)] p-3 sm:p-4 ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[10px] border border-white/12 bg-[#0c1a32] shadow-[0_20px_48px_-24px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#122844] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 h-4 flex-1 rounded-sm bg-white/5" />
        </div>
        <div className={`bg-[#0c1a32] ${fit === "contain" ? `flex items-center justify-center p-2 ${maxH}` : "aspect-[16/10]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={
              fit === "cover"
                ? "h-full w-full object-cover object-top"
                : `h-auto w-auto max-w-full object-contain object-center ${maxH}`
            }
          />
        </div>
      </div>
    </div>
  );
}
