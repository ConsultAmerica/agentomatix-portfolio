/**
 * Capture fresh SmartWrite screenshots for card + gallery.
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const OUT_W = 2880;
const OUT_H = 1800;

const shots = [
  {
    name: "editor",
    url: "https://grammarly-app-seven.vercel.app/",
    out: "public/projects/smartwrite-card.png",
    wait: 4000,
    trim: true,
  },
  {
    name: "modes",
    url: "https://grammarly-app-seven.vercel.app/",
    out: "public/projects/smartwrite-2-modes.png",
    wait: 3500,
    trim: true,
    // Click Email mode if present to differentiate
    clickText: "Email",
  },
  {
    name: "check",
    url: "https://grammarly-app-seven.vercel.app/",
    out: "public/projects/smartwrite-3-check.png",
    wait: 3500,
    trim: true,
    clickText: "Check",
  },
];

async function toCardFrame(buffer, { trim }) {
  let pipeline = sharp(buffer);
  if (trim) {
    try {
      const trimmed = await sharp(buffer)
        .trim({
          background: { r: 245, g: 247, b: 250, alpha: 1 },
          threshold: 18,
        })
        .toBuffer();
      pipeline = sharp(trimmed);
    } catch {
      // keep original
    }
  }
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

    if (shot.clickText) {
      try {
        const el = page.getByRole("button", { name: shot.clickText }).first();
        if (await el.count()) {
          await el.click({ timeout: 3000 });
          await page.waitForTimeout(1500);
        } else {
          await page.getByText(shot.clickText, { exact: true }).first().click({ timeout: 3000 });
          await page.waitForTimeout(1500);
        }
      } catch (err) {
        console.warn(`  click "${shot.clickText}" skipped:`, err.message);
      }
    }

    await page.evaluate(() => {
      document.querySelectorAll('[class*="cookie"],[id*="cookie"]').forEach((el) => {
        el.style.setProperty("display", "none", "important");
      });
    });

    const raw = await page.screenshot({ type: "png", fullPage: false });
    const framed = await toCardFrame(raw, { trim: shot.trim });
    fs.writeFileSync(outPath, framed);

    // Also refresh legacy filenames used in case studies
    if (shot.name === "editor") {
      fs.copyFileSync(outPath, path.join(root, "public/projects/smartwrite-1-editor.png"));
      fs.copyFileSync(outPath, path.join(root, "public/projects/smartwrite.png"));
      fs.copyFileSync(outPath, path.join(root, "public/projects/smartwrite-g1-workspace.png"));
    }

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
