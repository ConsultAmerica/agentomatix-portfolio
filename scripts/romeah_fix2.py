import re
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=60).read()


def fetch_shot(site: str, out: Path, width: int = 1440, height: int = 1200) -> Image.Image:
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
    out.write_bytes(get(api))
    im = Image.open(out).convert("RGB")
    print(" ", out.name, im.size)
    return im


def crop(im: Image.Image, top: float, bottom: float) -> Image.Image:
    w, h = im.size
    return im.crop((0, int(h * top), w, int(h * bottom)))


def save(im: Image.Image, name: str) -> None:
    im.save(ROOT / name, optimize=True)
    print("wrote", name, im.size)


def main() -> None:
    html = get("https://romeah.vercel.app/").decode("utf-8", "ignore")
    hrefs = sorted(set(re.findall(r'href=["\']([^"\']+)["\']', html)))
    print("HREFS:")
    for h in hrefs:
        print(" ", h)

    # Also search for path strings in RSC payload
    for m in re.findall(r'"(/[a-zA-Z0-9_\-/]+)"', html):
        if m.count("/") >= 1 and len(m) < 60:
            print("path", m)

    home = Image.open(ROOT / "_tmp-romeah.png").convert("RGB")
    # Include campaign copy + CTAs (lower third of tall hero), exclude white header
    save(crop(home, 0.12, 0.88), "romeah-1-hero.png")

    # handbags worked earlier — crop tighter on product grid, less category header
    bags_src = ROOT / "_romeah-handbags.png"
    if bags_src.exists():
        bags = Image.open(bags_src).convert("RGB")
        save(crop(bags, 0.22, 0.95), "romeah-3-bags.png")

    # Probe more category URLs that may exist
    for path, out_name in [
        ("/handbags", "romeah-3-bags.png"),
        ("/clothing", "romeah-2-arrivals.png"),
        ("/shoes", "romeah-5-shoes.png"),
        ("/jewelry", "romeah-6-jewelry.png"),
        ("/travel", "romeah-7-travel.png"),
        ("/new-in", None),
    ]:
        url = "https://romeah.vercel.app" + path
        try:
            body = get(url).decode("utf-8", "ignore")
            if "404" in body and "could not be found" in body.lower():
                print("404 page", path)
                continue
            print("ok page", path, "len", len(body))
            if out_name:
                shot = fetch_shot(url, ROOT / f"_probe{path.replace('/', '-')}.png", 1440, 1300)
                # skip tall category intro; keep product cards
                save(crop(shot, 0.18, 0.95), out_name)
        except Exception as e:
            print("fail", path, e)

    # ImportNest already good — tighten hero to leave less empty bottom if needed
    inn = Image.open(ROOT / "_tmp-importnest.png").convert("RGB")
    save(crop(inn, 0.0, 0.70), "importnest-1-hero.png")
    save(crop(inn, 0.50, 1.0), "importnest-3-categories.png")


if __name__ == "__main__":
    main()
