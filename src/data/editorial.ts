/** Homepage visuals — anonymized product UI (no company/personal data). */

export type EditorialAsset = {
  src: string;
  alt: string;
  kind?: "photo" | "product";
};

/** Featured work — sanitized product interfaces. */
export const topStoryImages: Record<string, EditorialAsset> = {
  "data-agent": {
    src: "/projects/data-agent-clean.jpg",
    alt: "Data Agent document intelligence workspace with masked field values",
    kind: "product",
  },
  "mediguide-ai": {
    src: "/projects/mediguide-anon.jpg",
    alt: "MediGuide product interface with demo placeholder metrics",
    kind: "product",
  },
  "agentic-customer-operations": {
    src: "/projects/agentic-anon.jpg",
    alt: "Agentic operations sample case investigation dashboard",
    kind: "product",
  },
};

/** Crafting — abstract capability visuals (not the same three project screenshots). */
export const craftImages: EditorialAsset[] = [
  {
    src: "/editorial/craft-ai-abstract.jpg",
    alt: "Abstract visualization of connected AI systems",
    kind: "photo",
  },
  {
    src: "/editorial/craft-ui-abstract.jpg",
    alt: "Abstract visualization of product interface design",
    kind: "photo",
  },
  {
    src: "/editorial/craft-workflow-abstract.jpg",
    alt: "Abstract visualization of data and workflow steps",
    kind: "photo",
  },
];

/** AI in Action — different products from featured work (no repeat of the three flagships). */
export const actionImages: Record<string, EditorialAsset> = {
  consultamerica: {
    src: "/projects/consultamerica.png",
    alt: "Consult America product interface",
    kind: "product",
  },
  joblens: {
    src: "https://image.thum.io/get/width/1280/crop/800/noanimate/https://joblens-seven.vercel.app/",
    alt: "JobLens product interface",
    kind: "product",
  },
  "smartwrite-ai": {
    src: "/projects/smartwrite.png",
    alt: "SmartWrite AI writing assistant interface",
    kind: "product",
  },
  bosiano: {
    src: "/projects/bosiano.png",
    alt: "Bosiano fashion storefront",
    kind: "product",
  },
};
