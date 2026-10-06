from pathlib import Path

forbidden = [
    "Consult America",
    "ConsultAmerica",
    "Acme Global",
    "CA-2024-0897",
    "W912HQ",
    "1,250,000",
    "$1.25M",
    "May 15, 2024",
    "08/19/2026",
    "Contract_ConsultAmerica",
]
required = [
    "DEMO-2026-001",
    "Sample Date",
    "Sample Amount",
    "Example Organization",
    "Demo Services LLC",
]

root = Path(r"e:/projects/AI Projects/agentomatic-portfolio/public/projects")
demo = Path(r"e:/projects/AI Projects/agentomatic-portfolio/scripts/data-agent-demo")

print("=== Demo HTML source ===")
for p in sorted(demo.glob("*.html")):
    text = p.read_text(encoding="utf-8")
    bad = [f for f in forbidden if f.lower() in text.lower()]
    missing = [r for r in required if r not in text]
    print(f"{p.name}: {'OK' if not bad and not missing else f'bad={bad} missing={missing}'}")

print("\n=== Image files present ===")
for name in [
    "data-agent-clean.jpg",
    "data-agent-extract-ui.jpg",
    "data-agent-anon.jpg",
    "data-agent.png",
    "data-agent-ui.png",
]:
    p = root / name
    print(f"{name}: {'OK' if p.exists() and p.stat().st_size > 10000 else 'MISSING/SMALL'}")
