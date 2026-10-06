import type { ReactNode } from "react";
import { BrowserChrome } from "@/components/BrowserChrome";
import type {
  MediaDensity,
  MediaFit,
  MediaPosition,
  MediaPresentation,
  MediaShot,
} from "@/data/projectMedia";

type ProjectMediaProps = {
  src: string;
  alt: string;
  fit?: MediaFit;
  position?: MediaPosition;
  presentation?: MediaPresentation;
  density?: MediaDensity;
  url?: string;
  className?: string;
  priority?: boolean;
};

const densityMax: Record<MediaDensity, string> = {
  compact: "max-h-[420px]",
  standard: "max-h-[560px]",
  dense: "max-h-[720px]",
};

/**
 * Reusable portfolio media primitive.
 * UI screenshots default to contain + top — never crop application chrome.
 * Photography may opt into cover intentionally.
 */
export function ProjectMedia({
  src,
  alt,
  fit = "contain",
  position = "top",
  presentation = "stage",
  density = "standard",
  url,
  className,
  priority = false,
}: ProjectMediaProps) {
  const objectPos = position === "center" ? "object-center" : "object-top";
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`project-media__img ${objectFit} ${objectPos} ${
        fit === "contain" ? densityMax[density] : "h-full min-h-[220px]"
      }`}
    />
  );

  if (presentation === "browser") {
    return (
      <div className={`project-media--browser ${className ?? ""}`}>
        <BrowserChrome url={url}>{img}</BrowserChrome>
      </div>
    );
  }

  if (presentation === "photography") {
    return <div className={`project-media--photo ${className ?? ""}`}>{img}</div>;
  }

  return <div className={`project-media--stage ${className ?? ""}`}>{img}</div>;
}

type CaseHeroVisualProps = {
  src: string;
  alt: string;
  url?: string;
  fit?: MediaFit;
  position?: MediaPosition;
  presentation?: MediaPresentation;
  density?: MediaDensity;
  className?: string;
  caption?: string;
};

export function CaseHeroVisual({
  src,
  alt,
  url,
  fit = "contain",
  position = "top",
  presentation = "browser",
  density = "standard",
  className,
  caption,
}: CaseHeroVisualProps) {
  return (
    <div className={`case-hero__visual case-hero__visual--${density} ${className ?? ""}`}>
      <div className="case-hero__frame">
        <ProjectMedia
          src={src}
          alt={alt}
          url={url}
          fit={fit}
          position={position}
          presentation={presentation}
          density={density}
          priority
        />
      </div>
      {caption ? <p className="case-hero__caption">{caption}</p> : null}
    </div>
  );
}

type ProductShotProps = MediaShot & {
  url?: string;
  featured?: boolean;
  alt?: string;
};

export function ProductShot({
  src,
  label,
  caption,
  url,
  featured = false,
  fit = "contain",
  position = "top",
  presentation,
  density,
  alt,
}: ProductShotProps) {
  // Browser chrome for featured screens only; secondary shots use a simpler stage.
  const resolvedPresentation =
    presentation ?? (featured ? "browser" : "stage");
  const resolvedDensity = density ?? (featured ? "dense" : "standard");

  return (
    <figure className={`product-shot ${featured ? "product-shot--featured" : ""}`}>
      <div className="product-shot__stage">
        <ProjectMedia
          src={src}
          alt={alt ?? caption}
          url={featured ? url : undefined}
          fit={fit}
          position={position}
          presentation={resolvedPresentation}
          density={resolvedDensity}
        />
      </div>
      <figcaption className="product-shot__caption">
        <p className="product-shot__label">{label}</p>
        <p className="product-shot__text">{caption}</p>
      </figcaption>
    </figure>
  );
}

type ProductGalleryProps = {
  shots: MediaShot[];
  url?: string;
  heading?: string;
  subheading?: string;
};

export function ProductGallery({ shots, url, heading, subheading }: ProductGalleryProps) {
  if (shots.length === 0) return null;

  const countClass =
    shots.length === 1
      ? "product-gallery--one"
      : shots.length === 2
        ? "product-gallery--two"
        : "product-gallery--three";

  return (
    <section>
      {heading ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{heading}</h2>
            {subheading ? (
              <p className="mt-2 text-sm text-muted">{subheading}</p>
            ) : null}
          </div>
          <p className="text-sm text-muted">
            {shots.length} view{shots.length === 1 ? "" : "s"}
          </p>
        </div>
      ) : null}

      <div className={`product-gallery ${countClass} ${heading ? "mt-8" : ""}`}>
        {shots.map((shot, index) => (
          <ProductShot
            key={`${shot.label}-${shot.src}`}
            {...shot}
            url={url}
            featured={shots.length >= 3 && index === 0}
          />
        ))}
      </div>
    </section>
  );
}

type ProjectCardMediaProps = {
  src: string;
  alt: string;
  fit?: MediaFit;
  className?: string;
};

/** Listing-card media: intrinsic screenshot height, never cover-cropped UI. */
export function ProjectCardMedia({
  src,
  alt,
  fit = "contain",
  className,
}: ProjectCardMediaProps) {
  return (
    <div className={`work-card__visual ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={
          fit === "cover"
            ? "h-full w-full object-cover object-top"
            : "h-auto max-h-full w-full object-contain object-top"
        }
      />
    </div>
  );
}

export function CaseStudyMedia(props: {
  src: string;
  alt: string;
  url?: string;
  framed?: boolean;
  className?: string;
}) {
  return (
    <CaseHeroVisual
      src={props.src}
      alt={props.alt}
      url={props.url}
      presentation={props.framed === false ? "stage" : "browser"}
      className={props.className}
    />
  );
}

export type { ReactNode };
