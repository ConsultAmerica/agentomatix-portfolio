export type ProjectTier = "flagship" | "featured" | "selected";

export type ProjectLayout = "landscape" | "split" | "phone" | "compact";

export type CaseStudySection = {
  title: string;
  body: string;
};

export type CaseStudyDecision = {
  problem: string;
  decision: string;
  why: string;
  result: string;
};

export type ProjectScreenshot = {
  label: string;
  caption: string;
  image?: string;
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  challenge: string;
  approach: string;
  builtWith: string[];
  disciplines: string[];
  liveUrl?: string;
  image?: string;
  imageFit?: "contain" | "cover";
  workflow?: string[];
  status?: "live" | "in-progress";
  tier: ProjectTier;
  layout: ProjectLayout;
  order: number;
  caseStudy?: {
    overview: string;
    sections: CaseStudySection[];
    decisions: CaseStudyDecision[];
    outcome: string;
    screenshots: ProjectScreenshot[];
  };
};

/** Builds a live screenshot URL of a deployed site (no API key required). */
function screenshot(url: string): string {
  return `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`;
}

export const projects: Project[] = [
  {
    slug: "data-agent",
    name: "Data Agent",
    eyebrow: "Enterprise Document Intelligence",
    headline: "Turning complex documents into structured, verifiable data.",
    summary:
      "Built an enterprise document-intelligence workflow that extracts structured information from contracts and regulatory documents while preserving traceability to source evidence.",
    challenge: "Manual document review is slow and difficult to audit.",
    approach:
      "Structured extraction + deterministic rules + AI-assisted interpretation.",
    builtWith: ["Next.js", "Python", "FastAPI", "PostgreSQL", "RAG"],
    disciplines: ["Enterprise AI", "Document Intelligence", "Engineering"],
    liveUrl: "https://data-agent-ca.vercel.app/",
    image: "/projects/data-agent-clean.jpg",
    imageFit: "cover",
    workflow: ["Extract", "Structure", "Verify", "Search", "Compare"],
    status: "live",
    tier: "flagship",
    layout: "landscape",
    order: 1,
    caseStudy: {
      overview:
        "Data Agent helps enterprise teams turn contracts, FAR documents, and procurement records into structured, source-verified data — without losing the audit trail that makes the output trustworthy.",
      sections: [
        {
          title: "The problem",
          body: "Contracts, FAR documents and procurement records arrive in inconsistent formats. Legal and procurement teams need extraction they can trust — and evidence they can show when something looks wrong.",
        },
        {
          title: "What we discovered",
          body: "Letting an LLM freely infer document type created cascading failures. A misclassified document selected the wrong extraction schema, wrong labels, and wrong Oracle transformation rules.",
        },
        {
          title: "System architecture",
          body: "Document profiles gate the pipeline. Classification is deterministic where possible; AI assists interpretation inside a known schema. Every extracted field retains a path back to source evidence.",
        },
        {
          title: "Extraction workflow",
          body: "Upload → profile → field and table extraction → confidence scoring → human review for low-confidence items → searchable repository with field explorer.",
        },
        {
          title: "Human review",
          body: "Low-confidence extractions enter a review queue. Reviewers correct values against the source page, then the system updates the structured record.",
        },
        {
          title: "Source verification",
          body: "Each field can be traced to the page and span it came from. Traceability is part of the product — not a debugging afterthought.",
        },
      ],
      decisions: [
        {
          problem:
            "Contracts, FAR documents and procurement records arrive in inconsistent formats.",
          decision:
            "Instead of allowing an LLM to infer the document type freely, we introduced deterministic document profiles.",
          why: "Classification errors downstream affected extraction schemas and Oracle transformations.",
          result:
            "Document type now determines the extraction experience, labels, tabs and transformation rules.",
        },
      ],
      outcome:
        "Enterprise teams can extract, search, compare, and review contract intelligence with source-level confidence — and a workflow built for auditability, not just answers.",
      screenshots: [
        {
          label: "01 — Product",
          caption: "Document intelligence with source-verified extraction and confidence scoring.",
          image: "/projects/data-agent-clean.jpg",
        },
        {
          label: "02 — Extraction",
          caption: "Structured fields extracted from complex agreements.",
        },
        {
          label: "03 — Source evidence",
          caption: "Field-to-source relationship for verifiable review.",
        },
        {
          label: "04 — FAR intelligence",
          caption: "Specialized regulatory extraction and clause comparison.",
        },
        {
          label: "05 — Transformation",
          caption: "Canonical data prepared for downstream Oracle output.",
        },
      ],
    },
  },
  {
    slug: "mediguide-ai",
    name: "MediGuide",
    eyebrow: "Healthcare AI",
    headline: "Making complex health information easier to understand.",
    summary:
      "A healthcare AI product designed for clearer conversations, structured intake, and safe response boundaries — knowing when not to answer is part of the design.",
    challenge:
      "Patients and care teams need clearer AI-assisted communication without replacing clinical judgment.",
    approach:
      "Patient-friendly explanations with explicit safety boundaries and structured intake support.",
    builtWith: ["Next.js", "React", "OpenAI API", "Tailwind CSS"],
    disciplines: ["Healthcare", "AI Product", "UX"],
    liveUrl: "https://mediguide-ai-woad.vercel.app/",
    image: "/projects/mediguide-anon.jpg",
    imageFit: "cover",
    workflow: ["Understand", "Explain", "Cite", "Know when not to answer"],
    status: "live",
    tier: "featured",
    layout: "split",
    order: 2,
    caseStudy: {
      overview:
        "MediGuide explores responsible healthcare AI: clearer explanations, structured intake, and product decisions that prioritize safety over unconstrained generation.",
      sections: [
        {
          title: "The problem",
          body: "Health information is easy to misunderstand. Patients and care teams need support tools that clarify — without sounding like a diagnosis.",
        },
        {
          title: "Design for restraint",
          body: "The product is designed around when not to answer. Safe boundaries, patient-friendly language, and structured intake keep the experience useful without overreaching.",
        },
        {
          title: "Interface approach",
          body: "Calm, readable UI with clear conversation states — built to feel like a careful assistant, not a clinical authority.",
        },
      ],
      decisions: [
        {
          problem:
            "Healthcare AI that answers everything creates liability and erodes trust.",
          decision:
            "We designed explicit refusal and redirection patterns into the product experience.",
          why: "Knowing when not to answer is a product requirement in regulated domains.",
          result:
            "MediGuide communicates limits clearly while still supporting intake and education workflows.",
        },
      ],
      outcome:
        "A healthcare AI experience that prioritizes clarity, boundaries, and responsible communication.",
      screenshots: [
        {
          label: "01 — Conversation",
          caption: "Patient-friendly health conversation interface.",
          image: "/projects/mediguide-anon.jpg",
        },
        {
          label: "02 — Boundaries",
          caption: "Safety and limitation messaging built into the flow.",
        },
      ],
    },
  },
  {
    slug: "consultamerica",
    name: "Consult America",
    eyebrow: "Enterprise Transformation",
    headline: "Reimagining the digital front door of an enterprise consulting company.",
    summary:
      "A business-facing brand presence for AI transformation, digital modernization, and professional technology services — designed to communicate credibility to decision-makers.",
    challenge:
      "Consulting firms need a credible digital presence that clearly communicates transformation services.",
    approach:
      "Clear service architecture, enterprise positioning, and responsive professional layout.",
    builtWith: ["Next.js", "React", "Tailwind CSS", "Cloudflare"],
    disciplines: ["Enterprise", "Web", "Product Design"],
    liveUrl: "https://consultamerica-nu.vercel.app/",
    image: "/projects/consultamerica.png",
    tier: "featured",
    layout: "landscape",
    order: 3,
    caseStudy: {
      overview:
        "Consult America’s digital presence needed to signal seriousness: AI transformation, modernization, and enterprise technology — without sounding like a template agency site.",
      sections: [
        {
          title: "The problem",
          body: "Enterprise buyers judge consulting firms quickly. Vague capability lists and generic layout patterns undermine trust before a conversation starts.",
        },
        {
          title: "What we built",
          body: "A structured company site with clear service sections, transformation messaging, and a professional visual system suited to decision-makers.",
        },
      ],
      decisions: [
        {
          problem: "Generic agency layouts made the firm look interchangeable.",
          decision:
            "We prioritized service clarity and enterprise tone over decorative AI aesthetics.",
          why: "Buyers need to understand what the firm does before they care about visual flair.",
          result:
            "A credible front door for Consult America’s transformation and technology practice.",
        },
      ],
      outcome:
        "A polished company website positioned for enterprise clients evaluating AI and digital transformation partners.",
      screenshots: [
        {
          label: "01 — Brand presence",
          caption: "Primary consulting brand experience.",
          image: "/projects/consultamerica.png",
        },
      ],
    },
  },
  {
    slug: "agentic-customer-operations",
    name: "Agentic Customer Operations",
    eyebrow: "Enterprise Agents",
    headline:
      "Investigating customer cases with evidence, confidence scoring and human approval.",
    summary:
      "An agentic operations workflow connecting Salesforce Agentforce, FastAPI and RAG so case investigations produce evidence-backed recommendations that a human can approve.",
    challenge:
      "Customer operations teams spend too much time gathering context across systems before they can act.",
    approach:
      "Case intake → Agentforce investigation → FastAPI orchestration → RAG evidence → confidence scoring → human approval.",
    builtWith: ["Salesforce", "Agentforce", "FastAPI", "RAG", "Python"],
    disciplines: ["Enterprise AI", "Agents", "Operations"],
    image: "/projects/agentic-anon.jpg",
    imageFit: "cover",
    workflow: ["Case", "Agentforce", "FastAPI", "RAG", "Evidence", "Approval"],
    status: "in-progress",
    tier: "featured",
    layout: "split",
    order: 3,
    caseStudy: {
      overview:
        "Agentic Customer Operations explores how enterprise case work can be investigated by AI agents while keeping evidence, confidence and human approval in the loop.",
      sections: [
        {
          title: "The problem",
          body: "Case workers lose time assembling context from CRM records, knowledge bases and prior interactions before they can make a decision.",
        },
        {
          title: "The system",
          body: "Salesforce and Agentforce initiate investigation. FastAPI orchestrates retrieval and scoring. RAG surfaces evidence. Humans approve before action.",
        },
        {
          title: "Why human approval stays",
          body: "Operational AI that skips review creates risk. Confidence scoring and approval gates keep the agent useful without becoming unsupervised.",
        },
      ],
      decisions: [
        {
          problem:
            "Fully autonomous case resolution looked fast but failed trust and audit requirements.",
          decision:
            "We designed the agent to investigate and recommend — not close — without human approval.",
          why: "Evidence and accountability matter more than speed in customer operations.",
          result:
            "A workflow where AI accelerates investigation while operators retain control of outcomes.",
        },
      ],
      outcome:
        "A controlled agentic operations pattern built for Salesforce-centered enterprises that need speed without surrendering oversight.",
      screenshots: [
        {
          label: "01 — Workflow",
          caption: "Case → Agentforce → FastAPI → RAG → evidence → approval.",
        },
      ],
    },
  },
  {
    slug: "importnest-ai-agent",
    name: "ImportNest",
    eyebrow: "Commerce AI",
    headline: "Comparing real purchase cost across approved retailers.",
    summary:
      "Shopping comparison that searches approved retailers and surfaces Total Known Cost — item, shipping, and fees — before a shopper commits.",
    challenge:
      "Shoppers struggle to compare real purchase cost when shipping and fees are unclear.",
    approach: "Natural-language search with transparent multi-retailer cost comparison.",
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS"],
    disciplines: ["AI Product", "Commerce", "Engineering"],
    liveUrl: "https://importnest.vercel.app/",
    image: "/projects/importnest.png",
    tier: "selected",
    layout: "compact",
    order: 4,
    caseStudy: {
      overview:
        "ImportNest helps shoppers compare offers from approved retailers using Total Known Cost — not just sticker price.",
      sections: [
        {
          title: "The problem",
          body: "Sticker price hides shipping, fees, and offer quality. Shoppers need a clearer comparison before they buy.",
        },
        {
          title: "Approach",
          body: "Natural-language search across approved retailers, with Total Known Cost as the primary comparison signal.",
        },
      ],
      decisions: [
        {
          problem: "Price comparison without fees misleads shoppers.",
          decision: "We made Total Known Cost the primary ranking and display metric.",
          why: "Purchase decisions depend on landed cost, not list price alone.",
          result: "Shoppers see item + shipping + fees before choosing an offer.",
        },
      ],
      outcome:
        "A consumer commerce product focused on transparent multi-retailer discovery.",
      screenshots: [
        {
          label: "01 — Comparison",
          caption: "Offer comparison with Total Known Cost.",
          image: "/projects/importnest.png",
        },
      ],
    },
  },
  {
    slug: "joblens",
    name: "JobLens",
    eyebrow: "Career AI",
    headline: "Helping job seekers align resumes with real openings.",
    summary:
      "Resume analysis, ATS keyword feedback, job matching, and cover-letter support in one career workflow.",
    challenge:
      "Job seekers struggle to align resumes with ATS systems and track applications.",
    approach: "AI-assisted analysis tied to job descriptions and application tracking.",
    builtWith: ["Next.js", "OpenAI API", "Tailwind CSS"],
    disciplines: ["AI Product", "Product Design", "Engineering"],
    liveUrl: "https://joblens-seven.vercel.app/",
    image: screenshot("https://joblens-seven.vercel.app/"),
    tier: "selected",
    layout: "compact",
    order: 5,
    caseStudy: {
      overview:
        "JobLens connects resume quality, ATS fit, and application tracking into a single career product.",
      sections: [
        {
          title: "The problem",
          body: "Resumes fail ATS screens for reasons candidates cannot see. Feedback needs to be specific to the role.",
        },
        {
          title: "Approach",
          body: "Analyze resumes against job descriptions, surface keyword gaps, and support cover-letter generation.",
        },
      ],
      decisions: [
        {
          problem: "Generic resume tips do not help candidates target a specific role.",
          decision: "We anchored analysis to the job description, not a one-size score.",
          why: "ATS fit is relative to the posting.",
          result: "Candidates get role-specific feedback they can act on.",
        },
      ],
      outcome: "A practical career AI product for seekers and coaching workflows.",
      screenshots: [
        {
          label: "01 — Analysis",
          caption: "Resume and ATS feedback experience.",
          image: screenshot("https://joblens-seven.vercel.app/"),
        },
      ],
    },
  },
  {
    slug: "smartwrite-ai",
    name: "SmartWrite",
    eyebrow: "Writing",
    headline: "Faster writing quality across everyday work.",
    summary:
      "Grammar, rewriting, tone, and readability support for email, resumes, academic, and business content.",
    challenge:
      "Professionals need faster writing quality improvements across multiple content types.",
    approach: "Domain-specific writing modes with clarity and tone feedback.",
    builtWith: ["Next.js", "OpenAI API", "Tailwind CSS"],
    disciplines: ["AI Product", "SaaS", "Engineering"],
    liveUrl: "https://grammarly-app-seven.vercel.app/",
    image: "/projects/smartwrite.png",
    imageFit: "cover",
    tier: "selected",
    layout: "compact",
    order: 6,
    caseStudy: {
      overview:
        "SmartWrite is a writing assistant for grammar, rewriting, tone, and readability across everyday professional content.",
      sections: [
        {
          title: "The problem",
          body: "Writing quality tools need to work across email, resumes, and business content — not just one format.",
        },
      ],
      decisions: [
        {
          problem: "A single rewriting mode produces generic output.",
          decision: "We introduced domain-specific writing modes.",
          why: "Tone and structure expectations change by content type.",
          result: "Users get more relevant suggestions for the work at hand.",
        },
      ],
      outcome: "A SaaS-style writing product for freelancers, students, and teams.",
      screenshots: [
        {
          label: "01 — Editor",
          caption: "Writing assistant interface.",
          image: "/projects/smartwrite.png",
        },
      ],
    },
  },
  {
    slug: "bosiano",
    name: "Bosiano",
    eyebrow: "Commerce",
    headline: "A fashion storefront with heritage-inspired luxury branding.",
    summary:
      "Italian heritage-inspired e-commerce with product presentation, marketplace-style browsing, and responsive shopping pages.",
    challenge:
      "Fashion brands need polish that communicates luxury without sacrificing usability.",
    approach: "Strong visual system with clear product presentation and shopping flows.",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    disciplines: ["E-Commerce", "Brand", "Product Design"],
    liveUrl: "https://bosiano.vercel.app/",
    image: "/projects/bosiano.png",
    imageFit: "cover",
    tier: "selected",
    layout: "compact",
    order: 7,
    caseStudy: {
      overview:
        "Bosiano is a fashion e-commerce experience built around heritage-inspired luxury branding and conversion-ready shopping pages.",
      sections: [
        {
          title: "The problem",
          body: "Luxury fashion sites often look polished but fail basic shopping usability.",
        },
      ],
      decisions: [
        {
          problem: "Brand expression was competing with product clarity.",
          decision: "We let product imagery lead, with restrained supporting UI.",
          why: "In fashion retail, the product is the story.",
          result: "A storefront that feels premium and remains easy to shop.",
        },
      ],
      outcome: "A modern, conversion-ready fashion storefront.",
      screenshots: [
        {
          label: "01 — Storefront",
          caption: "Primary shopping experience.",
          image: "/projects/bosiano.png",
        },
      ],
    },
  },
  {
    slug: "romeah",
    name: "Romeah",
    eyebrow: "Commerce",
    headline: "Quiet luxury fashion — refined product stories and effortless shopping.",
    summary:
      "A quiet-luxury e-commerce experience for clothing, handbags, shoes, jewelry and travel — built around editorial campaigns, product clarity and conversion-ready shopping flows.",
    challenge:
      "Luxury fashion sites need editorial presence without slowing down browsing, discovery or purchase.",
    approach:
      "Campaign-led homepage storytelling with clear category navigation and focused product presentation.",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    disciplines: ["E-Commerce", "Brand", "Product Design"],
    liveUrl: "https://romeah.vercel.app/",
    image: "/projects/romeah.png",
    imageFit: "cover",
    tier: "selected",
    layout: "compact",
    order: 8,
    caseStudy: {
      overview:
        "Romeah is a quiet-luxury fashion storefront that pairs editorial campaign storytelling with clear category shopping across handbags, clothing, shoes, jewelry and travel.",
      sections: [
        {
          title: "The problem",
          body: "Quiet-luxury brands need a storefront that feels elevated and editorial — while still making new arrivals, icons and shop-the-look paths easy to follow.",
        },
        {
          title: "The approach",
          body: "We led with a campaign hero and seasonal edits, then grounded the experience in product grids, category navigation and focused merchandising blocks for bags, shoes, jewelry and travel.",
        },
      ],
      decisions: [
        {
          problem: "Editorial photography can overpower the shopping path.",
          decision:
            "Keep campaign moments full-bleed, then move quickly into clear product cards and category routes.",
          why: "Luxury presence should support conversion, not replace it.",
          result: "A storefront that feels premium and remains easy to shop.",
        },
      ],
      outcome:
        "A modern quiet-luxury commerce experience with campaign storytelling and conversion-ready product browsing.",
      screenshots: [
        {
          label: "01 — Storefront",
          caption: "Fall campaign hero and new arrivals.",
          image: "/projects/romeah.png",
        },
      ],
    },
  },
  {
    slug: "appointease",
    name: "AppointEase",
    eyebrow: "Scheduling",
    headline: "Simple appointment booking for service businesses.",
    summary:
      "Service selection, scheduling, customer details, and confirmation — a practical booking MVP for local providers.",
    challenge:
      "Service businesses need a booking flow that captures essentials without friction.",
    approach: "Linear booking workflow with clear confirmation states.",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    disciplines: ["Product", "Scheduling", "Engineering"],
    liveUrl: "https://appointease-psi.vercel.app/",
    image: screenshot("https://appointease-psi.vercel.app/"),
    tier: "selected",
    layout: "phone",
    order: 9,
    caseStudy: {
      overview:
        "AppointEase is a booking application for service selection, scheduling, and confirmation.",
      sections: [
        {
          title: "The problem",
          body: "Many booking tools overwhelm small businesses with features they do not need on day one.",
        },
      ],
      decisions: [
        {
          problem: "Complex calendars slow first-time booking.",
          decision: "We kept a linear flow: service → time → details → confirm.",
          why: "Completion rate matters more than feature depth for an MVP.",
          result: "A booking experience suitable for salons, clinics, and local services.",
        },
      ],
      outcome: "A practical scheduling MVP for appointment-based businesses.",
      screenshots: [
        {
          label: "01 — Booking",
          caption: "Appointment scheduling flow.",
          image: screenshot("https://appointease-psi.vercel.app/"),
        },
      ],
    },
  },
  {
    slug: "smart-appliances",
    name: "Smart Appliances",
    eyebrow: "Services",
    headline: "Home-service booking for appliance, HVAC, and repair.",
    summary:
      "Service discovery and booking request workflows for appliance, HVAC, and home repair companies.",
    challenge:
      "Home-service companies need an easy way for customers to discover services and request bookings.",
    approach: "Service marketplace layout with request-oriented booking flows.",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    disciplines: ["Services", "Booking", "Web"],
    liveUrl: "https://project-i8icw-ebon.vercel.app/",
    image: screenshot("https://project-i8icw-ebon.vercel.app/"),
    tier: "selected",
    layout: "compact",
    order: 10,
    caseStudy: {
      overview:
        "Smart Appliances is a home-service platform for appliance, HVAC, and repair booking requests.",
      sections: [
        {
          title: "The problem",
          body: "Customers struggle to find the right service and submit a clear request online.",
        },
      ],
      decisions: [
        {
          problem: "Service catalogs without booking intent create dead ends.",
          decision: "We paired discovery pages with request workflows.",
          why: "The business goal is a booked job, not a brochure visit.",
          result: "Customers can discover services and submit requests in one path.",
        },
      ],
      outcome: "A booking-oriented digital presence for home-service businesses.",
      screenshots: [
        {
          label: "01 — Services",
          caption: "Service discovery and booking entry points.",
          image: screenshot("https://project-i8icw-ebon.vercel.app/"),
        },
      ],
    },
  },
  {
    slug: "sarco-appliances",
    name: "Sarco",
    eyebrow: "Local Business",
    headline: "Sales and service presence for an appliance company.",
    summary:
      "Customer-facing website for delivery, installation, repair, and sales information.",
    challenge:
      "Local appliance businesses need a clear digital storefront for sales and service inquiries.",
    approach: "Straightforward service presentation with responsive local-business layout.",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    disciplines: ["Business", "Web", "Services"],
    liveUrl: "https://sarco-appliances.vercel.app/",
    image: screenshot("https://sarco-appliances.vercel.app/"),
    tier: "selected",
    layout: "compact",
    order: 11,
    caseStudy: {
      overview:
        "Sarco Appliances is a sales and service website for delivery, installation, and repair.",
      sections: [
        {
          title: "The problem",
          body: "Local service businesses lose inquiries when their site does not clearly explain offerings.",
        },
      ],
      decisions: [
        {
          problem: "Overloaded pages buried the service options customers needed.",
          decision: "We structured pages around sales, delivery, installation, and repair.",
          why: "Clarity drives contact.",
          result: "A trustworthy customer-facing site for appliance retail and service.",
        },
      ],
      outcome: "A clear local-business website for appliance sales and service.",
      screenshots: [
        {
          label: "01 — Site",
          caption: "Customer-facing business presence.",
          image: screenshot("https://sarco-appliances.vercel.app/"),
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectBySlug(slug: string): Project {
  const project = getProject(slug);
  if (!project) throw new Error(`Missing project: ${slug}`);
  return project;
}

export function getTopStories(): Project[] {
  return [
    getProjectBySlug("data-agent"),
    getProjectBySlug("mediguide-ai"),
    getProjectBySlug("agentic-customer-operations"),
  ];
}

export function getSelectedWork(): Project[] {
  return [getProjectBySlug("importnest-ai-agent")];
}

/** Different products from featured work — avoid repeating the three flagships. */
export function getAiInActionProjects(): Project[] {
  return [
    getProjectBySlug("consultamerica"),
    getProjectBySlug("joblens"),
    getProjectBySlug("smartwrite-ai"),
  ];
}

export function getMoreWorkProjects(): Project[] {
  return [
    "romeah",
    "importnest-ai-agent",
    "bosiano",
    "appointease",
    "smart-appliances",
    "sarco-appliances",
  ].map(getProjectBySlug);
}

export const heroCapabilities = [
  "AI systems",
  "Product engineering",
  "Enterprise workflows",
];

export const practices = [
  {
    title: "AI",
    description: "Models, agents and retrieval wired to the decisions operators actually make.",
    href: "/portfolio/#ai-in-action",
  },
  {
    title: "Interface",
    description: "Clear screens for review, approval and exception handling — not demos.",
    href: "/portfolio/#work",
  },
  {
    title: "Data & workflow",
    description: "APIs, evidence trails and process steps designed as one product surface.",
    href: "/portfolio/#ai-in-action",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the business process, users, and the decision that matters.",
  },
  {
    step: "02",
    title: "Design",
    description: "Prototype the workflow and interface before locking infrastructure.",
  },
  {
    step: "03",
    title: "Build",
    description: "Ship AI, APIs, data and interface as one coherent product.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Launch, measure, and refine with real operators in the loop.",
  },
];

export const proofPoints = [
  {
    step: "01",
    value: "10 deployed products",
    label: "From working MVPs to complete platforms",
  },
  {
    step: "02",
    value: "AI → Interface → API → Cloud",
    label: "End-to-end product engineering",
  },
  {
    step: "03",
    value: "Enterprise · Healthcare · Commerce",
    label: "Built around real operational workflows",
  },
];
