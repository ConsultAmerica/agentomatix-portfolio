type EditorialPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  kind?: "photo" | "product";
  overlay?: "none" | "bottom" | "full";
  stage?: "light" | "dark";
  fit?: "contain" | "cover";
};

export function EditorialPhoto({
  src,
  alt,
  className,
  kind = "photo",
  overlay = "none",
  stage = "dark",
  fit = "cover",
}: EditorialPhotoProps) {
  if (kind === "product") {
    const isDark = stage !== "light";
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden p-3 sm:p-4 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,_#1a3a5c_0%,_#0e1f3c_50%,_#0a1730_100%)]"
            : "bg-[#eef3f8]"
        } ${className ?? ""}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div className="relative w-full max-w-[500px] overflow-hidden rounded-[10px] border border-white/12 bg-[#0c1a32] shadow-[0_18px_44px_-22px_rgba(0,0,0,0.65)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#122844] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 h-3.5 flex-1 rounded-sm bg-white/5" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={
              fit === "cover"
                ? "aspect-[16/10] w-full object-cover object-top"
                : "mx-auto h-auto max-h-[180px] w-auto max-w-full object-contain sm:max-h-[200px]"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-500"
      />
      {overlay === "bottom" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1730]/70 to-transparent"
        />
      ) : null}
      {overlay === "full" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0a1730]/35 via-transparent to-cyan-900/10"
        />
      ) : null}
    </div>
  );
}
