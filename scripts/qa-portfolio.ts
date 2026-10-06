/**
 * QA: portfolio inventory + media uniqueness across case studies.
 * Run against a running server: npx --yes tsx scripts/qa-portfolio.ts [baseUrl]
 */
import {
  SHIPPED_PORTFOLIO_SLUGS,
  assertShippedPortfolioInventory,
  getMoreWorkProjects,
  getSelectedProducts,
} from "../src/data/projects";
import { getProjectMedia } from "../src/data/projectMedia";

assertShippedPortfolioInventory();

const base = process.argv[2] ?? "http://localhost:3000";
const selected = getSelectedProducts().map((p) => p.slug);
const more = getMoreWorkProjects().map((p) => p.slug);

console.log("=== Inventory ===");
console.log("Selected:", selected.join(", "));
console.log("More:", more.join(", "));
console.log("Total:", selected.length + more.length);

const issues: string[] = [];

for (const slug of SHIPPED_PORTFOLIO_SLUGS) {
  const media = getProjectMedia(slug);
  if (!media) {
    issues.push(`${slug}: missing media config`);
    continue;
  }
  const urls = [media.heroImage, media.cardImage, ...media.gallery.map((g) => g.src)];
  const pageUrls = media.gallery.length
    ? media.gallery.some((g) => g.src === media.heroImage)
      ? media.gallery.map((g) => g.src)
      : [media.heroImage, ...media.gallery.map((g) => g.src)]
    : [media.heroImage];

  const seen = new Set<string>();
  for (const src of pageUrls) {
    if (seen.has(src)) {
      issues.push(`${slug}: repeated image on case page — ${src}`);
    }
    seen.add(src);
  }

  if (!media.cardImage) issues.push(`${slug}: missing cardImage`);
}

// SmartWrite: gallery must not pad with hero duplicates
const sw = getProjectMedia("smartwrite-ai");
if (sw && sw.gallery.some((g) => g.src === sw.heroImage)) {
  issues.push("smartwrite-ai: gallery reuses hero");
}

// Data Agent narrative
const da = getProjectMedia("data-agent");
if (da) {
  const labels = da.gallery.map((g) => g.label).join(" | ");
  if (!labels.includes("EXTRACT") || !labels.includes("VERIFY") || !labels.includes("REVIEW")) {
    issues.push(`data-agent: gallery labels incomplete — ${labels}`);
  }
  if (!labels.includes("REGULATORY")) {
    issues.push("data-agent: missing REGULATORY INTELLIGENCE gallery shot");
  }
  const extract = da.gallery.find((g) => g.label.includes("EXTRACT"));
  const verify = da.gallery.find((g) => g.label.includes("VERIFY"));
  if (!extract?.src.includes("extract-ui")) {
    issues.push("data-agent: EXTRACT should use the Sample Services Agreement screenshot");
  }
  if (!verify?.src.includes("verify")) {
    issues.push("data-agent: VERIFY should use a distinct evidence screenshot");
  }
  if (da.gallery.some((g) => g.src.includes("data-agent-ui.png"))) {
    issues.push("data-agent: still using generic data-agent-ui.png");
  }
  const srcs = da.gallery.map((g) => g.src);
  if (new Set(srcs).size !== srcs.length) {
    issues.push("data-agent: gallery has duplicate screenshots");
  }
  for (const shot of da.gallery) {
    if (
      /contract no|award date|total value|master services|ca-2024|\$1[,.]?250|w912hq/i.test(
        `${shot.label} ${shot.caption}`,
      )
    ) {
      issues.push(`data-agent: caption exposes document content — ${shot.label}`);
    }
  }
}

// Romeah order
const romeah = getProjectMedia("romeah");
if (romeah) {
  const labels = romeah.gallery.map((g) => g.label).join(" | ");
  if (!labels.includes("Discover") || !labels.includes("Shop") || !labels.includes("Travel")) {
    issues.push(`romeah: gallery labels incomplete — ${labels}`);
  }
  if (romeah.gallery[0]?.src !== "/projects/romeah-g1-discover.png") {
    issues.push("romeah: Discover screen should be first");
  }
}

// More work must include ImportNest, Bosiano, AppointEase
for (const slug of ["importnest-ai-agent", "bosiano", "appointease"]) {
  if (!more.includes(slug)) issues.push(`More Shipped Work missing ${slug}`);
}

// Fetch routes if server is up
const routes = ["/portfolio/", ...SHIPPED_PORTFOLIO_SLUGS.map((s) => `/portfolio/${s}/`)];

async function checkRoutes() {
  let fetched = 0;
  for (const route of routes) {
    try {
      const res = await fetch(`${base}${route}`);
      if (!res.ok) issues.push(`${route}: HTTP ${res.status}`);
      else {
        fetched++;
        const html = await res.text();
        if (html.includes("Smaller products, experiments")) {
          issues.push(`${route}: old More Work subtitle still present`);
        }
        if (route === "/portfolio/") {
          for (const slug of more) {
            if (!html.includes(`/portfolio/${slug}/`)) {
              issues.push(`portfolio page missing link to ${slug}`);
            }
          }
          for (const slug of selected) {
            if (!html.includes(`/portfolio/${slug}/`)) {
              issues.push(`portfolio page missing selected link to ${slug}`);
            }
          }
          if (!html.includes("Products built to be used")) {
            issues.push("portfolio page missing More Shipped Work heading");
          }
          if (!html.includes("taken from idea to working software")) {
            issues.push("portfolio page missing More Shipped Work supporting copy");
          }
          if (html.includes("Selected digital products")) {
            issues.push("portfolio page still has Selected digital products label");
          }
          if (!html.includes("From concept to live product")) {
            issues.push("portfolio page missing lead More Work headline");
          }
        }
      }
    } catch (err) {
      issues.push(`${route}: fetch failed (${err instanceof Error ? err.message : err})`);
    }
  }
  return fetched;
}

checkRoutes().then((fetched) => {
  console.log(`\n=== Route checks (${fetched}/${routes.length}) ===`);
  if (issues.length) {
    console.error("FAIL");
    for (const issue of issues) console.error(" -", issue);
    process.exit(1);
  }
  console.log("QA OK — no inventory/media/link issues found");
});
