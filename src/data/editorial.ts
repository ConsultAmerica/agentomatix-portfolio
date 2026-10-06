/** Homepage visuals — anonymized product UI (no company/personal data). */

export type EditorialAsset = {
  src: string;
  alt: string;
  kind?: "photo" | "product";
};

/** Featured work — sanitized product interfaces. */
export const topStoryImages: Record<string, EditorialAsset> = {
  "data-agent": {
    src: "/projects/data-agent-hero.png",
    alt: "Data Agent — document intelligence with structured extraction and confidence scores",
    kind: "product",
  },
  "mediguide-ai": {
    src: "/projects/mediguide-full.jpg",
    alt: "MediGuide product interface with demo placeholder metrics",
    kind: "product",
  },
  consultamerica: {
    src: "/projects/consultamerica-full.png",
    alt: "Consult America enterprise consulting homepage",
    kind: "product",
  },
  "agentic-customer-operations": {
    src: "/projects/agentic-full.jpg",
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
    src: "/projects/consultamerica-full.png",
    alt: "Consult America product interface",
    kind: "product",
  },
  joblens: {
    src: "/projects/joblens.png",
    alt: "JobLens product interface",
    kind: "product",
  },
  "smartwrite-ai": {
    src: "/projects/smartwrite-1-editor.png",
    alt: "SmartWrite AI writing assistant interface",
    kind: "product",
  },
  "agentic-customer-operations": {
    src: "/projects/agentic-full.jpg",
    alt: "Agentic operations sample case investigation dashboard",
    kind: "product",
  },
};
