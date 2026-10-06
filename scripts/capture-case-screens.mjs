import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const shots = [
  {
    url: "https://bosiano.vercel.app/shop?category=women",
    out: "public/projects/bosiano-g2-collection.png",
    wait: 2500,
  },
  {
    url: "https://bosiano.vercel.app/product/fluid-silk-slip-dress",
    out: "public/projects/bosiano-g3-product.png",
    wait: 2500,
  },
  {
    url: "https://bosiano.vercel.app/shop?sort=new",
    out: "public/projects/bosiano-g1-arrivals.png",
    wait: 2500,
  },
  {
    url: "https://romeah.vercel.app/",
    out: "public/projects/romeah-g1-discover.png",
    wait: 2000,
  },
  {
    url: "https://romeah.vercel.app/handbags",
    out: "public/projects/romeah-g2-shop.png",
    wait: 2000,
  },
  {
    url: "https://romeah.vercel.app/travel",
    out: "public/projects/romeah-g3-travel.png",
    wait: 2000,
  },
  {
    url: "https://project-i8icw-ebon.vercel.app/services/home-appliances",
    out: "public/projects/smart-appliances-g2-selection.png",
    wait: 3000,
  },
  {
    url: "https://project-i8icw-ebon.vercel.app/book/regular",
    out: "public/projects/smart-appliances-g3-booking.png",
    wait: 3000,
  },
  {
    url: "https://project-i8icw-ebon.vercel.app/",
    out: "public/projects/smart-appliances-g1-discovery.png",
    wait: 2500,
    fullPage: true,
  },
  {
    url: "https://appointease-psi.vercel.app/book",
    out: "public/projects/appointease-g2-clinic.png",
    wait: 4000,
  },
  {
    url: "https://appointease-psi.vercel.app/auth/register",
    out: "public/projects/appointease-g3-onboard.png",
    wait: 2500,
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const shot of shots) {
    const outPath = path.join(root, shot.out);
    console.log(`Capturing ${shot.url}`);
    try {
      await page.goto(shot.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(shot.wait);
      await page.screenshot({
        path: outPath,
        fullPage: Boolean(shot.fullPage),
        type: "png",
      });
      console.log(`  -> ${shot.out}`);
    } catch (err) {
      console.error(`  FAIL ${shot.url}:`, err instanceof Error ? err.message : err);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
