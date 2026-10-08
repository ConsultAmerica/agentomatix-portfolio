/**
 * Build a hero collage from shipped product screenshots.
 * Output: public/projects/hero-applications.png (16:10)
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
const GAP = 14;
const PAD = 28;
const COLS = 3;
const ROWS = 3;

const tiles = [
  "data-agent-hero.png",
  "mediguide-full.jpg",
  "consultamerica-full.png",
  "importnest-hero.png",
  "bosiano.png",
  "romeah-g1-discover.png",
  "smartwrite-card.png",
  "appointease-card.png",
  "smart-appliances-card.png",
];

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

    const tile = await sharp(file)
      .resize(cellW, cellH, { fit: "cover", position: "top" })
      .png()
      .toBuffer();

    // Soft rounded mask via SVG overlay for each tile
    const rounded = Buffer.from(
      `<svg width="${cellW}" height="${cellH}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${cellW}" height="${cellH}" rx="16" ry="16" fill="white"/>
      </svg>`,
    );

    const masked = await sharp(tile)
      .composite([{ input: rounded, blend: "dest-in" }])
      .png()
      .toBuffer();

    composites.push({ input: masked, left, top });
  }

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
