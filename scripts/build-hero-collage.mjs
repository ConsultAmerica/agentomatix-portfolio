/**
 * Build hero collage of all 11 shipped portfolio products.
 * Layout: 4 columns × 3 rows (last cell is a quiet count badge).
 * Output: public/projects/hero-applications.png
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const projectsDir = path.join(root, "public", "projects");

const OUT_W = 1920;
const OUT_H = 1200;
const GAP = 12;
const PAD = 24;
const COLS = 4;
const ROWS = 3;

/** Full shipped inventory — unique product visuals only */
const tiles = [
  "data-agent-hero.png",
  "mediguide-full.jpg",
  "consultamerica-full.png",
  "importnest-hero.png",
  "joblens.png",
  "smartwrite-card.png",
  "bosiano.png",
  "romeah-g1-discover.png",
  "appointease-card.png",
  "smart-appliances-card.png",
  "sarco-card-home.png",
];

async function roundedTile(file, cellW, cellH) {
  const tile = await sharp(file)
    .resize(cellW, cellH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="${cellW}" height="${cellH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${cellW}" height="${cellH}" rx="14" ry="14" fill="white"/>
    </svg>`,
  );

  return sharp(tile)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  const cellW = Math.floor((OUT_W - PAD * 2 - GAP * (COLS - 1)) / COLS);
  const cellH = Math.floor((OUT_H - PAD * 2 - GAP * (ROWS - 1)) / ROWS);
  const composites = [];

  for (let i = 0; i < tiles.length; i++) {
    const file = path.join(projectsDir, tiles[i]);
    if (!fs.existsSync(file)) {
      console.warn("missing", tiles[i]);
      continue;
    }
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = PAD + col * (cellW + GAP);
    const top = PAD + row * (cellH + GAP);
    const masked = await roundedTile(file, cellW, cellH);
    composites.push({ input: masked, left, top });
    console.log(`  ${i + 1}. ${tiles[i]}`);
  }

  // Final cell — portfolio count badge
  const badgeCol = 3;
  const badgeRow = 2;
  const badgeLeft = PAD + badgeCol * (cellW + GAP);
  const badgeTop = PAD + badgeRow * (cellH + GAP);
  const badgeSvg = Buffer.from(
    `<svg width="${cellW}" height="${cellH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${cellW}" height="${cellH}" rx="14" ry="14" fill="#122844"/>
      <rect x="1" y="1" width="${cellW - 2}" height="${cellH - 2}" rx="13" ry="13" fill="none" stroke="rgba(148,180,220,0.22)" stroke-width="2"/>
      <text x="50%" y="46%" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="42" font-weight="700" fill="#e8eefc">11</text>
      <text x="50%" y="62%" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="18" font-weight="500" fill="#8ba0b8">shipped products</text>
    </svg>`,
  );
  composites.push({ input: badgeSvg, left: badgeLeft, top: badgeTop });

  const bg = await sharp({
    create: {
      width: OUT_W,
      height: OUT_H,
      channels: 3,
      background: { r: 12, g: 26, b: 50 },
    },
  })
    .png()
    .toBuffer();

  const outPath = path.join(projectsDir, "hero-applications.png");
  await sharp(bg).composite(composites).png().toFile(outPath);
  console.log("wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
