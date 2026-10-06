/** Shared contact destination for CTAs across the portfolio. */
export const CONTACT_EMAIL = "hr@consultamerica.com";

/** Opens external contact destination (avoids mailto / Outlook). */
export const CONTACT_URL = "https://consultamerica-nu.vercel.app/";

/** Kept for case-study pages that still offer email. */
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Project inquiry — Agentomatix",
)}`;
