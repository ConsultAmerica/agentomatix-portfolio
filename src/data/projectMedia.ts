/**
 * Centralized portfolio media mapping.
 * Application UI defaults to contain + top; photography may use cover.
 * Gallery never includes heroImage. Never pad with duplicates.
 */

export type MediaFit = "contain" | "cover";
export type MediaPosition = "top" | "center";
export type MediaPresentation = "browser" | "stage" | "photography";
export type MediaDensity = "compact" | "standard" | "dense";

export type MediaShot = {
  src: string;
  label: string;
  caption: string;
  fit?: MediaFit;
  position?: MediaPosition;
  presentation?: MediaPresentation;
  density?: MediaDensity;
};

export type ProjectMediaConfig = {
  slug: string;
  heroImage: string;
  heroCaption: string;
  heroFit?: MediaFit;
  heroPosition?: MediaPosition;
  heroPresentation?: MediaPresentation;
  /** Dense apps (FAR tables) get taller/larger heroes */
  heroDensity?: MediaDensity;
  cardImage: string;
  cardFit?: MediaFit;
  chromeHost?: string;
  /** Case-study gallery section heading — not always "Product imagery" */
  galleryHeading: string;
  gallerySubheading?: string;
  gallery: MediaShot[];
};

/** Dedupe gallery shots. Hero may appear in gallery for labeled narrative steps;
 * case pages skip a separate hero when gallery already includes that asset. */
function uniqueGallery(_hero: string, shots: MediaShot[]): MediaShot[] {
  const seen = new Set<string>();
  const out: MediaShot[] = [];
  for (const shot of shots) {
    if (!shot.src || seen.has(shot.src)) continue;
    seen.add(shot.src);
    out.push(shot);
    if (out.length >= 4) break;
  }
  return out;
}

const rawMedia: Record<string, ProjectMediaConfig> = {
  "data-agent": {
    slug: "data-agent",
    // Primary visual: Data Agent product hero.
    heroImage: "/projects/data-agent-hero.png",
    heroCaption: "Document intelligence with confidence and precision.",
    heroFit: "contain",
    heroPosition: "top",
    heroPresentation: "stage",
    heroDensity: "dense",
    cardImage: "/projects/data-agent-hero.png",
    cardFit: "contain",
    chromeHost: "data-agent-ca.vercel.app",
    galleryHeading: "Product experience",
    gallerySubheading: "Product → Extract → Verify → Review → Regulatory",
    gallery: [
      {
        src: "/projects/data-agent-product.png",
        label: "01 — PRODUCT",
        caption: "From upload to verified repository — platform capabilities at a glance.",
        density: "dense",
        presentation: "stage",
      },
      {
        src: "/projects/data-agent-extract-ui.jpg",
        label: "02 — EXTRACT",
        caption: "Turn complex documents into structured, usable information.",
        density: "dense",
        presentation: "stage",
      },
      {
        src: "/projects/data-agent-verify.jpg",
        label: "03 — VERIFY",
        caption: "Validate extracted information against its source evidence.",
        density: "dense",
        presentation: "stage",
      },
      {
        src: "/projects/data-agent-anon.jpg",
        label: "04 — REVIEW",
        caption: "Review structured results before approval or downstream use.",
        density: "dense",
        presentation: "stage",
      },
      {
        src: "/projects/data-agent-far.jpg",
        label: "05 — REGULATORY INTELLIGENCE",
        caption: "Turn complex regulatory content into searchable structured records.",
        density: "dense",
        presentation: "stage",
      },
    ],
  },

  "mediguide-ai": {
    slug: "mediguide-ai",
    heroImage: "/projects/mediguide-full.jpg",
    heroCaption: "MediGuide healthcare guidance product interface.",
    heroDensity: "standard",
    heroPresentation: "browser",
    cardImage: "/projects/mediguide-full.jpg",
    galleryHeading: "Inside the product",
    gallery: [
      {
        src: "/projects/mediguide-anon.jpg",
        label: "01 — Guidance flow",
        caption: "Demo-safe guidance interface with placeholder metrics only.",
        presentation: "browser",
      },
      {
        src: "/projects/mediguide.png",
        label: "02 — Product surface",
        caption: "Healthcare AI product presentation.",
        presentation: "browser",
      },
    ],
  },

  consultamerica: {
    slug: "consultamerica",
    heroImage: "/projects/consultamerica-full.png",
    heroCaption: "Enterprise consulting brand homepage.",
    heroPresentation: "browser",
    heroDensity: "standard",
    cardImage: "/projects/consultamerica-full.png",
    chromeHost: "consultamerica-nu.vercel.app",
    galleryHeading: "Selected screens",
    gallery: [
      {
        src: "/projects/consultamerica-g2-services.png",
        label: "01 — Capabilities",
        caption: "Enterprise transformation and strategic capability sections.",
        presentation: "browser",
      },
      {
        src: "/projects/consultamerica-g2b.png",
        label: "02 — AI & data",
        caption: "AI and data transformation messaging for decision-makers.",
        presentation: "browser",
      },
      {
        src: "/projects/consultamerica-g3-jobs.png",
        label: "03 — Jobs portal",
        caption: "Enterprise job portal and platform experience.",
        presentation: "browser",
        density: "dense",
      },
    ],
  },

  "agentic-customer-operations": {
    slug: "agentic-customer-operations",
    heroImage: "/projects/agentic-full.jpg",
    heroCaption: "Agentic case investigation with evidence and approval.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/agentic-full.jpg",
    galleryHeading: "Product experience",
    gallery: [
      {
        src: "/projects/agentic-ops-ui.jpg",
        label: "01 — Operations",
        caption: "Operations dashboard for agent-assisted case handling.",
        presentation: "browser",
      },
      {
        src: "/projects/agentic-anon.jpg",
        label: "02 — Investigation",
        caption: "Sample case flow with generic placeholders only.",
        presentation: "browser",
      },
      {
        src: "/projects/agentic-workflow.png",
        label: "03 — Workflow",
        caption: "Investigation → evidence → confidence → human approval.",
        presentation: "stage",
      },
    ],
  },

  "importnest-ai-agent": {
    slug: "importnest-ai-agent",
    heroImage: "/projects/importnest-hero.png",
    heroCaption: "ImportNest — search once, compare approved offers.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/importnest-hero.png",
    chromeHost: "importnest.vercel.app",
    galleryHeading: "Product experience",
    gallery: [
      {
        src: "/projects/importnest-2-compare.png",
        label: "01 — Compare",
        caption: "Total Known Cost comparison with filters.",
        presentation: "browser",
      },
      {
        src: "/projects/importnest-3-categories.png",
        label: "02 — Categories",
        caption: "Shop-by-category discovery with department cards.",
        presentation: "browser",
      },
    ],
  },

  joblens: {
    slug: "joblens",
    heroImage: "/projects/joblens.png",
    heroCaption: "JobLens career intelligence overview.",
    heroPresentation: "browser",
    cardImage: "/projects/joblens.png",
    chromeHost: "joblens-seven.vercel.app",
    galleryHeading: "Inside the product",
    gallery: [
      {
        src: "/projects/joblens-g1-resume.png",
        label: "01 — Resume / ATS",
        caption: "Dashboard and resume analysis entry for ATS fit.",
        presentation: "browser",
        density: "dense",
      },
      {
        src: "/projects/joblens-g2-match.png",
        label: "02 — Job match",
        caption: "Career Intelligence — résumé vs job description alignment.",
        presentation: "browser",
        density: "dense",
      },
      {
        src: "/projects/joblens-g3-cover.png",
        label: "03 — Cover letter",
        caption: "Cover-letter generation and application support.",
        presentation: "browser",
      },
    ],
  },

  "smartwrite-ai": {
    slug: "smartwrite-ai",
    heroImage: "/projects/smartwrite-card.png",
    heroCaption: "SmartWrite writing workspace with modes, editor and suggestions.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/smartwrite-card.png",
    galleryHeading: "Product experience",
    // Remaining smartwrite-* assets are near-duplicates of the hero workspace —
    // never pad the gallery by repeating the same screen.
    gallery: [],
  },

  bosiano: {
    slug: "bosiano",
    heroImage: "/projects/bosiano.png",
    heroCaption: "Bosiano campaign homepage — Softness, as Strength lookbook.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/bosiano.png",
    chromeHost: "bosiano.vercel.app",
    galleryHeading: "Selected screens",
    gallerySubheading: "New Arrivals → Collection → Product Experience",
    gallery: [
      {
        src: "/projects/bosiano-g1-arrivals.png",
        label: "01 — New Arrivals",
        caption:
          "All Pieces sorted by newest — filters, sort controls and a full product grid.",
        presentation: "browser",
        fit: "contain",
        density: "dense",
      },
      {
        src: "/projects/bosiano-g2-collection.png",
        label: "02 — Collection",
        caption:
          "Women collection — category filters, active facets and merchandised product cards.",
        presentation: "stage",
        fit: "contain",
      },
      {
        src: "/projects/bosiano-g3-product.png",
        label: "03 — Product Experience",
        caption:
          "Fluid Silk Slip Dress PDP — colour, size, pricing and AI size recommendation.",
        presentation: "stage",
        fit: "contain",
      },
    ],
  },

  romeah: {
    slug: "romeah",
    heroImage: "/projects/romeah-g1-discover.png",
    heroCaption: "Romeah Fall 2026 — La Nuova Donna homepage.",
    heroPresentation: "browser",
    heroDensity: "dense",
    heroFit: "contain",
    cardImage: "/projects/romeah-g1-discover.png",
    chromeHost: "romeah.vercel.app",
    galleryHeading: "Selected screens",
    gallerySubheading: "Discover → Shop → Travel Edit",
    gallery: [
      {
        src: "/projects/romeah-g1-discover.png",
        label: "01 — Discover",
        caption:
          "Homepage campaign — Fall 2026 “La Nuova Donna” with Discover New In.",
        presentation: "browser",
        fit: "contain",
        density: "dense",
      },
      {
        src: "/projects/romeah-g2-shop.png",
        label: "02 — Shop",
        caption:
          "Women’s Handbags — category intro, bag filters and a four-product merchandise grid.",
        presentation: "stage",
        fit: "contain",
      },
      {
        src: "/projects/romeah-g3-travel.png",
        label: "03 — Travel Edit",
        caption:
          "Travel collection — “The Art of Arrival” with full site navigation preserved.",
        presentation: "stage",
        fit: "contain",
      },
    ],
  },

  appointease: {
    slug: "appointease",
    heroImage: "/projects/appointease-1-hero.png",
    heroCaption:
      "AppointEase homepage — guest booking portal with clinic, provider and time slots.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/appointease-card.png",
    chromeHost: "appointease-psi.vercel.app",
    galleryHeading: "Product experience",
    gallerySubheading: "Book an Appointment → Choose a Clinic → Clinic Onboarding",
    gallery: [
      {
        src: "/projects/appointease-1-hero.png",
        label: "01 — Book an Appointment",
        caption:
          "Marketing homepage with booking portal — clinic choice, provider and available slots.",
        presentation: "browser",
        density: "dense",
      },
      {
        src: "/projects/appointease-card.png",
        label: "02 — Choose a Clinic",
        caption:
          "Patient booking flow — Select a clinic with location, hours and service counts.",
        presentation: "stage",
      },
      {
        src: "/projects/appointease-g3-onboard.png",
        label: "03 — Clinic Onboarding",
        caption:
          "Create account as Admin (create a business) — clinic / provider registration.",
        presentation: "stage",
      },
    ],
  },

  "smart-appliances": {
    slug: "smart-appliances",
    heroImage: "/projects/smart-appliances-card.png",
    heroCaption:
      "Smart Appliances homepage — service discovery with free quote request.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/smart-appliances-card.png",
    chromeHost: "project-i8icw-ebon.vercel.app",
    galleryHeading: "Selected screens",
    gallerySubheading: "Service Discovery → Service Selection → Booking Request",
    gallery: [
      {
        src: "/projects/smart-appliances-card.png",
        label: "01 — Service Discovery",
        caption:
          "Homepage hero — home appliance repair proposition and Get a Free Service Quote.",
        presentation: "browser",
        density: "dense",
      },
      {
        src: "/projects/smart-appliances-g2-selection.png",
        label: "02 — Service Selection",
        caption:
          "Appliance service page — What appliance needs service? with dishwasher, washer, fridge and oven.",
        presentation: "stage",
      },
      {
        src: "/projects/smart-appliances-g3-booking.png",
        label: "03 — Booking Request",
        caption:
          "Book Regular Service — step 1 Service Details with selected Refrigerator appointment.",
        presentation: "stage",
      },
    ],
  },

  "sarco-appliances": {
    slug: "sarco-appliances",
    heroImage: "/projects/sarco-g1-home.png",
    heroCaption: "Sarco Appliances complete storefront.",
    heroPresentation: "browser",
    heroDensity: "dense",
    cardImage: "/projects/sarco-card-home.png",
    chromeHost: "sarco-appliances.vercel.app",
    galleryHeading: "Selected screens",
    gallery: [
      {
        src: "/projects/sarco-g2-services.png",
        label: "01 — Services / repair",
        caption: "Repair and service offerings.",
        presentation: "browser",
      },
      {
        src: "/projects/sarco-g3-catalog.png",
        label: "02 — Catalog",
        caption: "Product category and commerce browsing.",
        presentation: "browser",
      },
    ],
  },
};

export const projectMedia: Record<string, ProjectMediaConfig> = Object.fromEntries(
  Object.entries(rawMedia).map(([slug, cfg]) => [
    slug,
    { ...cfg, gallery: uniqueGallery(cfg.heroImage, cfg.gallery) },
  ]),
);

export function getProjectMedia(slug: string): ProjectMediaConfig | undefined {
  return projectMedia[slug];
}

export function getGalleryShots(slug: string): MediaShot[] {
  return getProjectMedia(slug)?.gallery ?? [];
}
