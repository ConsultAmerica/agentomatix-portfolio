import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def shot(site: str, out: Path, width: int = 1440, height: int = 1400) -> Image.Image:
    api = "https://api.microlink.io/?" + urllib.parse.urlencode(
        {
            "url": site,
            "screenshot": "true",
            "meta": "false",
            "embed": "screenshot.url",
            "viewport.width": str(width),
            "viewport.height": str(height),
        }
    )
    print("shot", site)
    req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
    out.write_bytes(urllib.request.urlopen(req, timeout=120).read())
    im = Image.open(out).convert("RGB")
    print(" ", out.name, im.size)
    return im


def crop(im: Image.Image, top: float, bottom: float) -> Image.Image:
    w, h = im.size
    return im.crop((0, int(h * top), w, int(h * bottom)))


def is_mostly_white(im: Image.Image) -> bool:
    sample = im.resize((60, 40)).convert("L")
    vals = list(sample.getdata())
    return (sum(vals) / len(vals)) > 235


def save(im: Image.Image, name: str) -> None:
    im.save(ROOT / name, optimize=True)
    print("wrote", name, im.size)


def main() -> None:
    home = Image.open(ROOT / "_tmp-romeah.png").convert("RGB")
    # Campaign: skip shipping/logo white band, keep face + La Nuova Donna + CTAs
    hero = crop(home, 0.12, 0.86)
    save(hero, "romeah-1-hero.png")
    save(crop(home, 0.08, 0.70), "romeah.png")

    pages = [
        ("https://romeah.vercel.app/handbags", "romeah-3-bags.png", 0.20, 0.95),
        ("https://romeah.vercel.app/clothing", "romeah-2-arrivals.png", 0.20, 0.95),
        ("https://romeah.vercel.app/shoes", "romeah-5-shoes.png", 0.20, 0.95),
        ("https://romeah.vercel.app/jewelry", "romeah-6-jewelry.png", 0.20, 0.95),
        ("https://romeah.vercel.app/travel", "romeah-7-travel.png", 0.20, 0.95),
        ("https://romeah.vercel.app/the-edit", "romeah-4-campaign.png", 0.12, 0.90),
        ("https://romeah.vercel.app/collections", "romeah-8-collections.png", 0.12, 0.90),
    ]

    good = []
    for url, out_name, top, bottom in pages:
        try:
            raw = shot(url, ROOT / f"_cap-{out_name}")
            if is_mostly_white(raw):
                print("skip blank/404", out_name)
                continue
            frame = crop(raw, top, bottom)
            if is_mostly_white(frame):
                print("skip white crop", out_name)
                continue
            save(frame, out_name)
            good.append(out_name)
        except Exception as e:
            print("fail", url, e)

    print("good frames:", good)


if __name__ == "__main__":
    main()
