import { getProjectMedia } from "../src/data/projectMedia";

for (const slug of ["bosiano", "romeah", "smart-appliances", "appointease"] as const) {
  const m = getProjectMedia(slug);
  if (!m) {
    console.log(slug, "MISSING");
    continue;
  }
  const srcs = m.gallery.map((g) => g.src);
  const uniq = new Set(srcs);
  console.log(`\n${slug} — ${srcs.length} views (${uniq.size} unique)`);
  for (const g of m.gallery) {
    console.log(`  ${g.label} | ${g.src.split("/").pop()} | ${g.presentation ?? "default"}`);
    console.log(`    ${g.caption}`);
  }
  if (srcs.length !== uniq.size) {
    console.error("  DUPLICATE SRCS");
    process.exitCode = 1;
  }
}
