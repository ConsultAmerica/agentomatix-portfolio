from pathlib import Path
import re

media = Path(r"e:\projects\AI Projects\agentomatic-portfolio\src\data\projectMedia.ts").read_text(
    encoding="utf-8"
)
projects_path = Path(r"e:\projects\AI Projects\agentomatic-portfolio\src\data\projects.ts")
projects = projects_path.read_text(encoding="utf-8")

print("=== MEDIA AUDIT ===")
mapping = {}
for block in re.finditer(
    r'(?:"([^"]+)"|([a-z0-9-]+)):\s*\{[\s\S]*?heroImage:\s*"([^"]+)"[\s\S]*?cardImage:\s*"([^"]+)"[\s\S]*?gallery:\s*\[([\s\S]*?)\],',
    media,
):
    slug = block.group(1) or block.group(2)
    hero = block.group(3)
    card = block.group(4)
    gal_body = block.group(5)
    gal = re.findall(r'src:\s*"(/projects/[^"]+)"', gal_body)
    mapping[slug] = card
    print(f"{slug}: hero={hero.split('/')[-1]} gallery={len(gal)} {[g.split('/')[-1] for g in gal]}")
    if hero in gal:
        print("  ERROR hero reused in gallery")
    if len(gal) != len(set(gal)):
        print("  ERROR duplicate gallery paths")

out = projects
for slug, card in mapping.items():
    pattern = rf'(slug:\s*"{re.escape(slug)}"[\s\S]*?\n\s*image:\s*")[^"]+(")'
    new_out, n = re.subn(pattern, rf"\1{card}\2", out, count=1)
    if n:
        out = new_out
        print("updated image for", slug, "->", card)
    else:
        print("no image field update for", slug)

projects_path.write_text(out, encoding="utf-8")
print("projects.ts synced")
