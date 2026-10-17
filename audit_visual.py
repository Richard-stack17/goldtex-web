"""Captura de evidencia visual GOLDTEX — auditoría premium (desktop/tablet/móvil).
Uso: python3 audit_visual.py [BASE_URL_BASE]
Produce PNGs en /private/var/folders/.../T/opencode/goldtex_audit + reporte de errores/overflow.
"""
import os
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
OUT = pathlib.Path("/private/var/folders/nn/br1ft6wn539c7ycc_wv01z740000gn/T/opencode/goldtex_audit")
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    ("desktop", 1440, 900),
    ("laptop", 1280, 800),
    ("tablet", 768, 1024),
    ("mobile", 390, 844),
    ("mobile_narrow", 360, 800),
]

SECTIONS = [
    ("#hero-section", "hero"),
    ("#evidencia-1", "ev1"),
    ("#evidencia-2", "ev2"),
    ("#evidencia-3", "ev3"),
    ("#evidencia-4", "ev4"),
    ("#audiovisual", "audiovisual"),
    ("#decoracion-tendencias", "decor"),
    ("#configurador-experiencia", "config"),
    ("#experience-configurator", "config2"),
    ("footer", "footer"),
    ("#main-nav", "nav"),
]


def skip_curtain(page):
    """La cortina de intro bloquea el resto: hacer click en skip hasta que desaparezca."""
    for _ in range(30):
        display = page.evaluate(
            "()=>{const c=document.getElementById('cinematic-curtain');return c?getComputedStyle(c).display:'none'}"
        )
        if display == "none":
            return True
        try:
            page.click("#skip-intro-btn", timeout=800)
        except Exception:
            pass
        page.wait_for_timeout(400)
    return False


errors = []
with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, w, h in VIEWPORTS:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.on("console", lambda msg: errors.append(f"[{name}] console.{msg.type}: {msg.text[:160]}") if msg.type == "error" else None)
        page.goto(BASE, wait_until="domcontentloaded", timeout=30000)
        curtain = skip_curtain(page)
        page.wait_for_timeout(1200)
        print(f"== {name} ({w}x{h}) curtain_skip={curtain}")

        # overflow horizontal
        ow = page.evaluate("()=>document.documentElement.scrollWidth - window.innerWidth")
        print(f"   overflow_x: {ow}px" + ("  ⚠ HORIZONTAL SCROLL" if ow > 2 else ""))

        if name in ("desktop", "mobile"):
            page.screenshot(path=str(OUT / f"full_{name}.png"), full_page=True, timeout=20000)
            print(f"   -> full_{name}.png")

        for sel, label in SECTIONS:
            try:
                loc = page.locator(sel).first
                if loc.count() == 0:
                    continue
                loc.scroll_into_view_if_needed(timeout=2500)
                page.wait_for_timeout(600)
                loc.screenshot(path=str(OUT / f"{label}_{name}.png"), timeout=8000)
            except Exception as e:
                print(f"   ! {label}@{name}: {e.__class__.__name__}")
        page.close()
    browser.close()

print("\n== ERRORES DE CONSOLA ==")
seen = set()
for e in errors:
    key = e.split("]", 1)[0] + e[10:60]
    if key not in seen:
        print(" ", e)
        seen.add(key)
if not errors:
    print("  (ninguno)")
print(f"\nShots en: {OUT}")
