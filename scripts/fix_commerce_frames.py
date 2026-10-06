"""Build better Romeah + ImportNest portfolio frames from captures."""
from __future__ import annotations

import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def fetch(site: str, out: Path, width: int = 1440, height: int = 1100) -> Image.Image:
    url = (
        "https://api.microlink.io/?"
        + urllib.parse.urlencode(
            {
                "url": site,
                "screenshot": "true",
                "meta": "false",
                "embed": "screenshot.url",
                "viewport.width": str(width),
                "viewport.height": str(height),
            }
        )
    )
    print("fetch", site)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    out.write_bytes(data)
    im = Image.open(out).convert("RGB")
    print(" saved", out.name, im.size)
    return im


def crop(im: Image.Image, top: float, bottom: float) -> Image.Image:
    w, h = im.size
    return im.crop((0, int(top * h), w, int(bottom * h)))


def save(im: Image.Image, name: str) -> None:
    path = ROOT / name
    im.save(path, optimize=True)
    print("wrote", name, im.size)


def main() -> None:
    home = Image.open(ROOT / "_tmp-romeah.png").convert("RGB")
    # Drop white header band (~12.5%); keep campaign face + copy + CTAs
    save(crop(home, 0.11, 0.68), "romeah-1-hero.png")
    # Campaign CTA band + Just Arrived lead-in
    save(crop(home, 0.55, 0.95), "romeah-4-campaign.png")

    # Category / product views for gallery diversity
    pages = [
        ("https://romeah.vercel.app/new-in", "_romeah-newin.png", "romeah-2-arrivals.png"),
        ("https://romeah.vercel.app/handbags", "_romeah-handbags.png", "romeah-3-bags.png"),
        ("https://romeah.vercel.app/shoes", "_romeah-shoes.png", "romeah-5-shoes.png"),
        ("https://romeah.vercel.app/jewelry", "_romeah-jewelry.png", "romeah-6-jewelry.png"),
    ]

    for site, tmp_name, out_name in pages:
        try:
            page = fetch(site, ROOT / tmp_name, 1440, 1200)
            # Skip header, show product grid
            save(crop(page, 0.12, 0.92), out_name)
        except Exception as e:
            print("fail", site, e)

    # Balanced overview for contain frames (slight header + campaign)
    save(crop(home, 0.08, 0.62), "romeah.png")

    # ImportNest — use fresh full capture; hero must include full compare UI
    inn = Image.open(ROOT / "_tmp-importnest.png").convert("RGB")
    save(crop(inn, 0.0, 0.72), "importnest-1-hero.png")
    save(crop(inn, 0.14, 0.72), "importnest-2-compare.png")
    save(crop(inn, 0.48, 1.0), "importnest-3-categories.png")
    save(inn, "importnest-full.png")

    print("done")


if __name__ == "__main__":
    main()
