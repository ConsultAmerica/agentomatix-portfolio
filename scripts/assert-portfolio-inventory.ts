/**
 * Portfolio inventory integrity check.
 * Run: npx tsx scripts/assert-portfolio-inventory.ts
 *
 * Confirms selectedProducts + moreShippedWork = all 11 unique projects
 * with no duplicate slugs and no missing projects.
 */
import {
  SHIPPED_PORTFOLIO_SLUGS,
  assertShippedPortfolioInventory,
  getMoreWorkProjects,
  getSelectedProducts,
  getShippedPortfolioProjects,
} from "../src/data/projects";

assertShippedPortfolioInventory();

const selected = getSelectedProducts();
const more = getMoreWorkProjects();
const all = getShippedPortfolioProjects();

const selectedSlugs = selected.map((p) => p.slug);
const moreSlugs = more.map((p) => p.slug);
const allSlugs = all.map((p) => p.slug);

if (selected.length + more.length !== SHIPPED_PORTFOLIO_SLUGS.length) {
  throw new Error("selected + more length !== 11");
}

if (new Set([...selectedSlugs, ...moreSlugs]).size !== 11) {
  throw new Error("Duplicate or missing slugs across selected + more");
}

const expected = [...SHIPPED_PORTFOLIO_SLUGS].sort();
const actual = [...allSlugs].sort();
if (expected.join() !== actual.join()) {
  throw new Error(
    `Inventory mismatch.\nExpected: ${expected.join(", ")}\nActual: ${actual.join(", ")}`,
  );
}

console.log("Portfolio inventory OK");
console.log(`  Selected (${selected.length}): ${selectedSlugs.join(", ")}`);
console.log(`  More work (${more.length}): ${moreSlugs.join(", ")}`);
console.log(`  Total unique: ${allSlugs.length}`);
