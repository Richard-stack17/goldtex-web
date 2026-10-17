#!/usr/bin/env python3
"""Comparación visual: original index.html (file://) vs Next.js (localhost:3000)."""
from playwright.sync_api import sync_playwright

ORIG = "file:///Users/jhon151/Downloads/TRABAJO_GOLTEX/index.html"
NEXT = "http://localhost:3000"
VIEWS = [
    ("hero", "window.scrollTo(0,0)"),
    ("audiovisual", "document.getElementById('audiovisual').scrollIntoView()"),
    ("evidencia1", "document.getElementById('evidencia-1').scrollIntoView()"),
]

def shoot(page, url, name, skip):
    page.goto(url, wait_until="networkidle", timeout=60000)
    if skip:
        # Skip robusto: reintenta hasta que la cortina realmente desaparezca
        # (evita el clic perdido durante la ventana de hidratación de React)
        for _ in range(6):
            gone = page.evaluate("""() => {
                const c = document.getElementById('cinematic-curtain');
                if (!c) return true;
                const cs = getComputedStyle(c);
                return cs.display === 'none' || (parseFloat(cs.opacity) < 0.05 && cs.pointerEvents === 'none');
            }""")
            if gone:
                break
            page.evaluate("document.getElementById('skip-intro-btn')?.click()")
            page.wait_for_timeout(700)
        page.wait_for_timeout(400)
    for label, js in VIEWS:
        page.evaluate(js)
        page.wait_for_timeout(900)
        page.screenshot(path=f"shots/{name}_{label}.png")
        print(f"  shot {name}_{label}")

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1400, "height": 900})
    print("Original:");      shoot(page, ORIG, "orig", True)
    print("Next.js:");       shoot(page, NEXT, "next", True)
    b.close()
print("OK — comparar shots/orig_*.png vs shots/next_*.png")
