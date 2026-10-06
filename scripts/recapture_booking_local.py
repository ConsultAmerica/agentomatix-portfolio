"""Capture high-res AppointEase + Sarco frames for portfolio media system."""
from __future__ import annotations

import io
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"


def shot(site: str, width: int = 1680, height: int = 1200) -> Image.Image:
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
    data = urllib.request.urlopen(req, timeout=120).read()
    im = Image.open(io.BytesIO(data)).convert("RGB")
    print(" ", im.size)
    return im


def save(im: Image.Image, name: str) -> None:
    # Cap width ~1920 for crisp but reasonable assets
    if im.width > 1920:
        ratio = 1920 / im.width
        im = im.resize((1920, max(1, int(im.height * ratio))), Image.Resampling.LANCZOS)
    path = ROOT / name
    im.save(path, optimize=True)
    print("wrote", name, im.size)


def crop(im: Image.Image, top: float, bottom: float) -> Image.Image:
    w, h = im.size
    return im.crop((0, int(h * top), w, int(h * bottom)))


def main() -> None:
    # AppointEase — try home + likely booking routes
    ae_home = shot("https://appointease-psi.vercel.app/", 1680, 1100)
    save(ae_home, "appointease-1-hero.png")
    save(ae_home, "appointease.png")

    # Probe flow / manage pages
    for url, out in [
        ("https://appointease-psi.vercel.app/book", "appointease-2-flow.png"),
        ("https://appointease-psi.vercel.app/booking", "appointease-2-flow.png"),
        ("https://appointease-psi.vercel.app/schedule", "appointease-2-flow.png"),
        ("https://appointease-psi.vercel.app/appointments", "appointease-3-manage.png"),
        ("https://appointease-psi.vercel.app/dashboard", "appointease-3-manage.png"),
        ("https://appointease-psi.vercel.app/manage", "appointease-3-manage.png"),
    ]:
        try:
            im = shot(url, 1680, 1100)
            # skip near-blank / soft 404
            avg = sum(im.resize((40, 30)).convert("L").getdata()) / (40 * 30)
            if avg > 245:
                print("skip blank", url)
                continue
            save(im, out)
        except Exception as e:
            print("fail", url, e)

    # If only home exists as full page, derive two vertical bands as last resort
    # Prefer distinct pages — check what we wrote
    flow = ROOT / "appointease-2-flow.png"
    manage = ROOT / "appointease-3-manage.png"
    if not flow.exists() or Image.open(flow).size == ae_home.size:
        # Try scrolling crop from taller capture
        tall = shot("https://appointease-psi.vercel.app/", 1680, 1600)
        save(crop(tall, 0.0, 0.55), "appointease-1-hero.png")
        save(crop(tall, 0.35, 0.95), "appointease-2-flow.png")

    # Sarco — full page + services
    sarco = shot("https://sarco-appliances.vercel.app/", 1680, 1200)
    save(sarco, "sarco-1-hero.png")
    save(sarco, "sarco.png")

    for url, out in [
        ("https://sarco-appliances.vercel.app/services", "sarco-2-services.png"),
        ("https://sarco-appliances.vercel.app/#services", "sarco-2-services.png"),
        ("https://sarco-appliances.vercel.app/about", "sarco-3-about.png"),
        ("https://sarco-appliances.vercel.app/contact", "sarco-3-about.png"),
    ]:
        try:
            im = shot(url, 1680, 1200)
            avg = sum(im.resize((40, 30)).convert("L").getdata()) / (40 * 30)
            if avg > 245:
                print("skip blank", url)
                continue
            save(im, out)
        except Exception as e:
            print("fail", url, e)

    # If sarco-2 missing, use lower band of tall home
    if not (ROOT / "sarco-2-services.png").exists():
        tall = shot("https://sarco-appliances.vercel.app/", 1680, 1800)
        save(crop(tall, 0.0, 0.55), "sarco-1-hero.png")
        save(crop(tall, 0.40, 0.95), "sarco-2-services.png")

    print("done")


if __name__ == "__main__":
    main()
