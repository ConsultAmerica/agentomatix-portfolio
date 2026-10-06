import re
import urllib.request
from pathlib import Path

html = urllib.request.urlopen(
    urllib.request.Request(
        "https://appointease-psi.vercel.app/",
        headers={"User-Agent": "Mozilla/5.0"},
    ),
    timeout=40,
).read().decode("utf-8", "ignore")

hrefs = sorted(set(re.findall(r'href=["\']([^"\']+)["\']', html)))
print("HREFS:")
for h in hrefs:
    print(" ", h)

paths = sorted(set(re.findall(r'"(/[a-zA-Z0-9_\-/]+)"', html)))
print("PATHS:")
for p in paths:
    if len(p) < 80:
        print(" ", p)
