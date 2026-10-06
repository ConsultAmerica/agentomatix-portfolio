/**
 * Capture intentional 16:10 card viewports for More Shipped Work.
 * Content fills the frame — no gray letterboxing pads.
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const OUT_W = 2880;
const OUT_H = 1800; // 16:10

const shots = [
  {
    name: "smartwrite",
    url: "https://grammarly-app-seven.vercel.app/",
    out: "public/projects/smartwrite-card.png",
    wait: 4000,
    scale: 1,
    trim: true,
  },
  {
    name: "smart-appliances",
    url: "https://project-i8icw-ebon.vercel.app/",
    out: "public/projects/smart-appliances-card.png",
    wait: 3500,
    scale: 1,
    trim: false,
  },
  {
    name: "appointease",
    url: "https://appointease-psi.vercel.app/book",
    out: "public/projects/appointease-card.png",
    wait: 4500,
    scale: 0.86,
    trim: false,
  },
];

async function toCardFrame(buffer, { trim }) {
  let pipeline = sharp(buffer);
  if (trim) {
    const trimmed = await sharp(buffer)
      .trim({
        background: { r: 245, g: 247, b: 250, alpha: 1 },
        threshold: 18,
      })
      .toBuffer();
    pipeline = sharp(trimmed);
  }

  // Scale UI to fill 16:10 frame (viewport-aligned capture; no gray pad)
  return pipeline
    .resize(OUT_W, OUT_H, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    const outPath = path.join(root, shot.out);

    console.log(`Capturing ${shot.name}: ${shot.url}`);
    try {
      await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    } catch {
      await page.goto(shot.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    }
    await page.waitForTimeout(shot.wait);

    if (shot.scale && shot.scale !== 1) {
      await page.evaluate((scale) => {
        document.documentElement.style.zoom = String(scale);
      }, shot.scale);
      await page.waitForTimeout(500);
    }

    await page.evaluate(() => {
      const selectors = [
        '[class*="cookie"]',
        '[id*="cookie"]',
        '[class*="intercom"]',
        '[class*="crisp"]',
        'iframe[title*="chat" i]',
      ];
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.setProperty("display", "none", "important");
        });
      }
    });

    const raw = await page.screenshot({ type: "png", fullPage: false });
    const framed = await toCardFrame(raw, { trim: shot.trim });
    fs.writeFileSync(outPath, framed);
    const meta = await sharp(framed).metadata();
    console.log(`  wrote ${shot.out} ${meta.width}x${meta.height}`);
    await context.close();
  }

  await browser.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
