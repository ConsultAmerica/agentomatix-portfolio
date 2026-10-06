type EditorialPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  kind?: "photo" | "product";
  overlay?: "none" | "bottom" | "full";
  stage?: "light" | "dark";
};

export function EditorialPhoto({
  src,
  alt,
  className,
  kind = "photo",
  overlay = "none",
  stage = "dark",
}: EditorialPhotoProps) {
  if (kind === "product") {
    const isDark = stage !== "light";
    return (
      <div
        className={`relative flex h-full w-full items-start justify-center overflow-hidden ${
          isDark ? "bg-[#0e1f3c]" : "bg-[#eef2f6]"
        } ${className ?? ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain object-top"
        />
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
        decoding="async"
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
