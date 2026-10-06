"""Recapture Romeah + ImportNest screenshots and crop usable portfolio frames."""
from __future__ import annotations

import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def fetch_microlink(site: str, out: Path, width: int = 1440, height: int = 1200) -> Image.Image:
    url = (
        "https://api.microlink.io/?"
        f"url={urllib.parse.quote(site, safe='')}"
        "&screenshot=true&meta=false&embed=screenshot.url"
        f"&viewport.width={width}&viewport.height={height}"
    )
    print("fetch", site)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    out.write_bytes(data)
    im = Image.open(out).convert("RGB")
    print(" saved", out.name, im.size)
    return im


def fetch_thum(site: str, out: Path, width: int = 1440) -> Image.Image:
    url = f"https://image.thum.io/get/width/{width}/crop/1400/noanimate/{site}"
    print("fetch thum", site)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    out.write_bytes(data)
    im = Image.open(out).convert("RGB")
    print(" saved", out.name, im.size)
    return im


def crop_box(im: Image.Image, left: float, top: float, right: float, bottom: float) -> Image.Image:
    w, h = im.size
    box = (int(left * w), int(top * h), int(right * w), int(bottom * h))
    return im.crop(box)


def save(im: Image.Image, name: str) -> None:
    path = ROOT / name
    im.save(path, optimize=True)
    print("wrote", name, im.size)


def main() -> None:
    # Prefer existing long captures when APIs fail; try fresh first.
    try:
        romeah = fetch_microlink("https://romeah.vercel.app/", ROOT / "_tmp-romeah.png", 1440, 1600)
    except Exception as e:
        print("microlink romeah failed", e)
        try:
            romeah = fetch_thum("https://romeah.vercel.app/", ROOT / "_tmp-romeah.png")
        except Exception as e2:
            print("thum romeah failed", e2)
            romeah = Image.open(ROOT / "romeah-long.png").convert("RGB")
            print("fallback romeah-long", romeah.size)

    try:
        importnest = fetch_microlink(
            "https://importnest.vercel.app/", ROOT / "_tmp-importnest.png", 1440, 1400
        )
    except Exception as e:
        print("microlink importnest failed", e)
        try:
            importnest = fetch_thum("https://importnest.vercel.app/", ROOT / "_tmp-importnest.png")
        except Exception as e2:
            print("thum importnest failed", e2)
            importnest = Image.open(ROOT / "importnest-full.png").convert("RGB")
            print("fallback importnest-full", importnest.size)

    # --- Romeah ---
    # Hero: skip most of huge shipping/logo header; show campaign + CTAs
    # Relative crops depend on capture height — use content-aware heuristics.
    rw, rh = romeah.size
    # Header dominates ~18-25% on tall captures; crop from mid-header into Just Arrived
    hero = crop_box(romeah, 0, 0.12, 1, 0.72)
    # If still too header-heavy (mostly white), try starting lower
    sample = hero.crop((0, 0, hero.width, max(1, int(hero.height * 0.25))))
    avg = sum(sample.convert("L").resize((40, 20)).getdata()) / (40 * 20)
    if avg > 220:
        hero = crop_box(romeah, 0, 0.18, 1, 0.78)
    save(hero, "romeah-1-hero.png")

    # Arrivals: product grid area lower on page
    arrivals = crop_box(romeah, 0, 0.55, 1, 0.92)
    save(arrivals, "romeah-2-arrivals.png")

    # Bags / mid merchandising — if page short, reuse lower third
    bags = crop_box(romeah, 0, 0.68, 1, 1.0)
    save(bags, "romeah-3-bags.png")

    # Extra 4th view: campaign close without header for gallery variety
    campaign = crop_box(romeah, 0, 0.22, 1, 0.62)
    save(campaign, "romeah-4-campaign.png")

    # Also refresh romeah.png as a balanced contain-friendly frame
    balanced = crop_box(romeah, 0, 0.14, 1, 0.70)
    save(balanced, "romeah.png")

    # --- ImportNest ---
    iw, ih = importnest.size
    # Full hero with search + why card + filters, not clipped
    in_hero = crop_box(importnest, 0, 0.0, 1, 0.78)
    # Ensure we don't leave only header — include gray hero card
    save(in_hero, "importnest-1-hero.png")

    # Compare / filters area including quick filters
    in_compare = crop_box(importnest, 0, 0.18, 1, 0.88)
    save(in_compare, "importnest-2-compare.png")

    # Categories section if present
    in_cats = crop_box(importnest, 0, 0.55, 1, 1.0)
    save(in_cats, "importnest-3-categories.png")

    # Keep a fuller frame for gallery 03
    save(importnest, "importnest-full.png")

    print("done")


if __name__ == "__main__":
    main()
