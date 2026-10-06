from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"

ae = Image.open(ROOT / "appointease.png").convert("RGB")
ae.save(ROOT / "appointease-1-hero.png", optimize=True)
w, h = ae.size
# Distinct lower band — platform section under hero
flow = ae.crop((0, int(0.48 * h), w, h))
flow.save(ROOT / "appointease-2-flow.png", optimize=True)
print("appointease", ae.size, flow.size)

sarco = Image.open(ROOT / "sarco.png").convert("RGB")
sw, sh = sarco.size
hero = sarco.crop((0, 0, sw, int(0.78 * sh)))
hero.save(ROOT / "sarco-1-hero.png", optimize=True)
services = sarco.crop((0, int(0.52 * sh), sw, sh))
services.save(ROOT / "sarco-2-services.png", optimize=True)
print("sarco", hero.size, services.size)
