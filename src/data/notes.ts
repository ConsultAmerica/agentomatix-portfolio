export type Note = {
  slug: string;
  title: string;
  readTime: string;
  excerpt: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "deterministic-extraction",
    title: "Why deterministic extraction still matters in an LLM workflow",
    readTime: "6 min read",
    excerpt:
      "Free-form classification looks flexible until one wrong document type breaks every schema downstream.",
    body: [
      "Large language models are good at interpretation. They are less reliable as the sole gatekeeper of document type.",
      "In Data Agent, we learned that a misclassified contract selected the wrong extraction schema, wrong UI labels, and wrong Oracle transformation rules. The failure was not poetic — it was structural.",
      "Deterministic document profiles fix the gate. AI still assists inside a known shape. The result is extraction that remains explainable when someone asks how a field was produced.",
    ],
  },
  {
    slug: "healthcare-ai-boundaries",
    title: "Designing healthcare AI that knows when not to answer",
    readTime: "8 min read",
    excerpt:
      "In regulated domains, restraint is a product feature — not a missing capability.",
    body: [
      "Healthcare AI products fail quietly when they sound more certain than they should.",
      "MediGuide was designed around boundaries: when to clarify, when to redirect, and when to refuse. That decision shapes the interface as much as the model prompt.",
      "Users trust systems that admit limits. In health communication, that trust is the product.",
    ],
  },
  {
    slug: "ai-mvp-lessons",
    title: "What building ten deployed products taught us about AI MVPs",
    readTime: "5 min read",
    excerpt:
      "Shipping teaches a different lesson than demos: the workflow around the model is the hard part.",
    body: [
      "Ten shipped products taught a simple pattern. The impressive part is rarely the first prompt — it is the interface, data path, review loop, and deployment story that make the prompt useful.",
      "MVPs that only prove a model can answer a question rarely survive contact with operations. MVPs that prove a person can complete a job do.",
      "Build the smallest complete system: input, decision, review, output, and a place to host it.",
    ],
  },
  {
    slug: "rag-isnt-the-product",
    title: "RAG isn't the product. The workflow is.",
    readTime: "4 min read",
    excerpt:
      "Retrieval is infrastructure. The product is how people verify, correct, and act on what comes back.",
    body: [
      "RAG shows up in architecture diagrams more often than in user value.",
      "What users need is a workflow: retrieve, interpret, ground, review, and export. Evidence and correction paths matter more than vector novelty.",
      "When we treat RAG as the product, we optimize for retrieval metrics. When we treat the workflow as the product, we optimize for decisions people can stand behind.",
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
