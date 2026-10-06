"""Capture Data Agent FAR / workflow screens from the live app."""
from __future__ import annotations

import io
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"
BASE = "https://data-agent-ca.vercel.app/"


def get_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "ignore")


def thum(url: str, width: int = 1680, crop: int = 1100) -> Image.Image:
    api = f"https://image.thum.io/get/width/{width}/crop/{crop}/noanimate/{url}"
    print("thum", url)
    req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=120).read()
    return Image.open(io.BytesIO(data)).convert("RGB")


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


def save(im: Image.Image, name: str) -> None:
    if im.width > 1920:
        r = 1920 / im.width
        im = im.resize((1920, max(1, int(im.height * r))), Image.Resampling.LANCZOS)
    path = ROOT / name
    im.save(path, optimize=True)
    print("wrote", name, im.size)


def capture(url: str, out: str) -> bool:
    time.sleep(2)
    try:
        im = microlink(url, 1680, 1200)
    except Exception as e:
        print("ml fail", e)
        try:
            im = thum(url, 1680, 1200)
        except Exception as e2:
            print("thum fail", e2)
            return False
    save(im, out)
    return True


def main() -> None:
    try:
        html = get_html(BASE)
        hrefs = sorted(set(re.findall(r'href=["\']([^"\']+)["\']', html)))
        paths = sorted(set(re.findall(r'"(/[a-zA-Z0-9_\-/]{1,80})"', html)))
        print("HREFS:")
        for h in hrefs:
            if h.startswith("/") or "data-agent" in h:
                print(" ", h)
        print("PATHS sample:")
        for p in paths[:60]:
            print(" ", p)
    except Exception as e:
        print("probe fail", e)

    candidates = [
        ("/", "data-agent-home.png"),
        ("/far", "data-agent-far-table.png"),
        ("/far/part-52", "data-agent-far-table.png"),
        ("/far-part-52", "data-agent-far-table.png"),
        ("/regulations", "data-agent-far-table.png"),
        ("/clauses", "data-agent-far-table.png"),
        ("/upload", "data-agent-upload.png"),
        ("/documents/upload", "data-agent-upload.png"),
        ("/ingest", "data-agent-upload.png"),
        ("/extract", "data-agent-extract.png"),
        ("/extraction", "data-agent-extract.png"),
        ("/universal-extraction", "data-agent-extract.png"),
        ("/workspace", "data-agent-extract.png"),
        ("/results", "data-agent-far-result.png"),
        ("/final-rule", "data-agent-far-result.png"),
        ("/far/final-rule", "data-agent-far-result.png"),
        ("/repository", "data-agent-repository.png"),
        ("/verify", "data-agent-verify.png"),
        ("/dashboard", "data-agent-dashboard.png"),
    ]

    written: set[str] = set()
    for path, out in candidates:
        if out in written:
            continue
        url = urllib.parse.urljoin(BASE, path)
        if capture(url, out):
            # skip near-blank
            im = Image.open(ROOT / out)
            avg = sum(im.resize((40, 24)).convert("L").getdata()) / (40 * 24)
            if avg > 248:
                print("blank", out)
                (ROOT / out).unlink(missing_ok=True)
            else:
                written.add(out)
        if len(written) >= 6:
            break

    print("written", sorted(written))


if __name__ == "__main__":
    main()
