import { chromium } from "playwright";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const demo = path.join(__dirname, "data-agent-demo");

const shots = [
  {
    html: "extract.html",
    out: "public/projects/data-agent-clean.jpg",
  },
  {
    html: "verify.html",
    out: "public/projects/data-agent-extract-ui.jpg",
  },
  {
    html: "verify-evidence.html",
    out: "public/projects/data-agent-verify.jpg",
  },
  {
    html: "review.html",
    out: "public/projects/data-agent-anon.jpg",
  },
  {
    html: "far.html",
    out: "public/projects/data-agent-far.jpg",
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const shot of shots) {
    const fileUrl = pathToFileURL(path.join(demo, shot.html)).href;
    const outPath = path.join(root, shot.out);
    console.log(`Capturing ${shot.html} -> ${shot.out}`);
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const el = page.locator("#shot");
    await el.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 92,
    });
  }

  // Card / marketing thumbnail: reuse verify shot cropped feel via full verify export copy
  // Also overwrite legacy marketing image that contained real-looking contract IDs.
  await page.goto(pathToFileURL(path.join(demo, "verify.html")).href, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(300);
  await page.locator("#shot").screenshot({
    path: path.join(root, "public/projects/data-agent.png"),
    type: "png",
  });
  await page.locator("#shot").screenshot({
    path: path.join(root, "public/projects/data-agent-ui.png"),
    type: "png",
  });

  await browser.close();
  console.log("Done — synthetic Data Agent screenshots written.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
