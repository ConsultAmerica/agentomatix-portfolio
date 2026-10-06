"""Probe live app routes and capture unique portfolio media frames."""
from __future__ import annotations

import io
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def get_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "ignore")


def links(url: str) -> list[str]:
    html = get_html(url)
    hrefs = set(re.findall(r'href=["\']([^"\']+)["\']', html))
    paths = set(re.findall(r'"(/[a-zA-Z0-9_\-/]{1,60})"', html))
    out = []
    for h in sorted(hrefs | paths):
        if h.startswith("http") and urllib.parse.urlparse(url).netloc not in h:
            continue
        if h.startswith("#") or h.startswith("/_next") or "favicon" in h:
            continue
        if h.startswith("/"):
            out.append(urllib.parse.urljoin(url, h))
        elif h.startswith("http"):
            out.append(h)
    return sorted(set(out))


def microlink(url: str, width: int = 1680, height: int = 1100) -> Image.Image:
    api = "https://api.microlink.io/?" + urllib.parse.urlencode(
        {
            "url": url,
            "screenshot": "true",
            "meta": "false",
            "embed": "screenshot.url",
            "viewport.width": str(width),
            "viewport.height": str(height),
        }
    )
    print("ml", url)
    req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    return Image.open(io.BytesIO(data)).convert("RGB")


def thum(url: str, width: int = 1680, crop: int = 1100) -> Image.Image:
    api = f"https://image.thum.io/get/width/{width}/crop/{crop}/noanimate/{url}"
    print("thum", url)
    req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    return Image.open(io.BytesIO(data)).convert("RGB")


def save(im: Image.Image, name: str, max_w: int = 1920) -> Path:
    if im.width > max_w:
        r = max_w / im.width
        im = im.resize((max_w, max(1, int(im.height * r))), Image.Resampling.LANCZOS)
    path = ROOT / name
    im.save(path, optimize=True)
    print("wrote", name, im.size)
    return path


def trim_bottom(im: Image.Image, threshold: int = 248) -> Image.Image:
    gray = im.convert("L")
    w, h = im.size
    px = gray.load()
    last = h - 1
    for y in range(h - 1, int(h * 0.25), -1):
        avg = sum(px[x, y] for x in range(0, w, 10)) / max(1, w // 10)
        if avg < threshold:
            last = min(h - 1, y + 48)
            break
    return im.crop((0, 0, w, last + 1))


def avg_brightness(im: Image.Image) -> float:
    s = im.resize((40, 24)).convert("L")
    return sum(s.getdata()) / (40 * 24)


def capture(url: str, out: str, delay: float = 1.5) -> bool:
    time.sleep(delay)
    try:
        im = microlink(url)
    except Exception as e:
        print("ml fail", e)
        try:
            im = thum(url)
        except Exception as e2:
            print("thum fail", e2)
            return False
    if avg_brightness(im) > 248:
        print("skip blank", url)
        return False
    save(trim_bottom(im), out)
    return True


def main() -> None:
    targets = {
        "joblens": {
            "base": "https://joblens-seven.vercel.app/",
            "wanted": [
                ("/", "joblens-g1-resume.png"),
                ("/analyze", "joblens-g1-resume.png"),
                ("/resume", "joblens-g1-resume.png"),
                ("/dashboard", "joblens-g1-resume.png"),
                ("/jobs", "joblens-g2-match.png"),
                ("/match", "joblens-g2-match.png"),
                ("/cover-letter", "joblens-g3-cover.png"),
                ("/cover", "joblens-g3-cover.png"),
                ("/letters", "joblens-g3-cover.png"),
                ("/applications", "joblens-g3-cover.png"),
            ],
        },
        "consultamerica": {
            "base": "https://consultamerica-nu.vercel.app/",
            "wanted": [
                ("/", "consultamerica-g1-home.png"),
                ("/services", "consultamerica-g2-services.png"),
                ("/ai", "consultamerica-g2-services.png"),
                ("/solutions", "consultamerica-g2-services.png"),
                ("/careers", "consultamerica-g3-jobs.png"),
                ("/jobs", "consultamerica-g3-jobs.png"),
                ("/portal", "consultamerica-g3-jobs.png"),
                ("/about", "consultamerica-g2-services.png"),
            ],
        },
        "smartwrite": {
            "base": None,  # may not have reliable live; use long crops
            "wanted": [],
        },
        "appointease": {
            "base": "https://appointease-psi.vercel.app/",
            "wanted": [
                ("/book", "appointease-g1-booking.png"),
                ("/auth/register", "appointease-g3-manage.png"),
                ("/chat", "appointease-g2-schedule.png"),
            ],
        },
        "sarco": {
            "base": "https://sarco-appliances.vercel.app/",
            "wanted": [
                ("/", "sarco-g1-home.png"),
                ("/services", "sarco-g2-services.png"),
                ("/shop", "sarco-g3-catalog.png"),
                ("/products", "sarco-g3-catalog.png"),
                ("/categories", "sarco-g3-catalog.png"),
            ],
        },
    }

    # Probe JobLens + Consult America links first
    for key in ("joblens", "consultamerica", "appointease", "sarco"):
        base = targets[key]["base"]
        if not base:
            continue
        try:
            print("\n==", key, "==")
            for u in links(base)[:40]:
                print(" ", u)
        except Exception as e:
            print("probe fail", key, e)

    # Capture preferred routes
    for key, cfg in targets.items():
        base = cfg["base"]
        if not base:
            continue
        written = set()
        for path, out in cfg["wanted"]:
            if out in written:
                continue
            url = urllib.parse.urljoin(base, path)
            ok = capture(url, out, delay=2.0)
            if ok:
                written.add(out)
            # stop hammering if we have 3 unique gallery files for this brand prefix
            prefix = out.split("-g")[0]
            have = [p.name for p in ROOT.glob(f"{prefix}-g*.png")]
            if len(have) >= 3:
                break

    # SmartWrite: derive unique gallery from long capture (exclude hero editor)
    long = ROOT / "smartwrite-long.png"
    if long.exists():
        im = Image.open(long).convert("RGB")
        w, h = im.size
        # lower bands often hold modes / results
        save(im.crop((0, int(0.08 * h), w, int(0.45 * h))), "smartwrite-g1-workspace.png")
        save(im.crop((0, int(0.35 * h), w, int(0.72 * h))), "smartwrite-g2-rewrite.png")
        save(im.crop((0, int(0.55 * h), w, int(0.92 * h))), "smartwrite-g3-result.png")

    # JobLens: if gallery missing, crop from joblens.png / long-like full
    jl = ROOT / "joblens.png"
    if jl.exists():
        im = Image.open(jl).convert("RGB")
        w, h = im.size
        if not (ROOT / "joblens-g1-resume.png").exists():
            save(im.crop((0, 0, w, int(0.7 * h))), "joblens-g1-resume.png")
        if not (ROOT / "joblens-g2-match.png").exists() and (ROOT / "joblens-2-workspace.png").exists():
            ws = Image.open(ROOT / "joblens-2-workspace.png").convert("RGB")
            save(ws, "joblens-g2-match.png")

    # Consult America: crop full for secondary if needed
    ca = ROOT / "consultamerica-full.png"
    if ca.exists():
        im = Image.open(ca).convert("RGB")
        w, h = im.size
        if not (ROOT / "consultamerica-g1-home.png").exists():
            save(im, "consultamerica-g1-home.png")
        if not (ROOT / "consultamerica-g2-services.png").exists():
            save(im.crop((0, int(0.35 * h), w, h)), "consultamerica-g2-services.png")

    # AppointEase: ensure gallery distinct from hero
    if (ROOT / "appointease-2-flow.png").exists():
        save(Image.open(ROOT / "appointease-2-flow.png").convert("RGB"), "appointease-g1-booking.png")

    # Sarco
    if (ROOT / "sarco.png").exists() and not (ROOT / "sarco-g1-home.png").exists():
        im = Image.open(ROOT / "sarco.png").convert("RGB")
        w, h = im.size
        save(im.crop((0, 0, w, int(0.75 * h))), "sarco-g1-home.png")
        save(im.crop((0, int(0.5 * h), w, h)), "sarco-g2-services.png")

    # ImportNest / Romeah: ensure contain-friendly full homepage heroes
    if (ROOT / "importnest-full.png").exists():
        im = Image.open(ROOT / "importnest-full.png").convert("RGB")
        w, h = im.size
        save(im.crop((0, 0, w, int(0.55 * h))), "importnest-hero.png")
        # gallery already has compare/categories distinct
    if (ROOT / "romeah.png").exists():
        im = Image.open(ROOT / "romeah.png").convert("RGB")
        save(im, "romeah-hero.png")

    print("done")


if __name__ == "__main__":
    main()
