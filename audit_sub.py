from pathlib import Path
from playwright.sync_api import sync_playwright
OUT = Path("/private/var/folders/nn/br1ft6wn539c7ycc_wv01z740000gn/T/opencode/goldtex_audit")
SUBS = ["#quien-es","#publico-objetivo","#focus-group","#brief-estrategico","#historia","#benchmarking",
        "#concepto-creativo","#buyer-persona","#ejes-creativos","#matriz-metafiras","#piezas-graficas",
        "#tipografia-oficial","#identidad-color","#direccion-fotografica","#ev4-contexto",
        "#publicidad-calles-billboard","#decoracion-tendencias","#hint-cta", "#main-nav", "footer", "#hero-section"]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:3000", wait_until="domcontentloaded")
    for _ in range(30):
        try: pg.click("#skip-intro-btn", timeout=500)
        except: pass
        if pg.evaluate("()=>{const c=document.getElementById('cinematic-curtain');return c?getComputedStyle(c).display:'none'}")=='none': break
        pg.wait_for_timeout(300)
    pg.wait_for_timeout(1000)
    for sel in SUBS:
        try:
            loc = pg.locator(sel).first
            loc.scroll_into_view_if_needed(timeout=2500); pg.wait_for_timeout(500)
            loc.screenshot(path=str(OUT/f"sub{sel.replace('#','_')}.png"), timeout=10000)
            print("ok", sel)
        except Exception as e: print("X", sel, e.__class__.__name__)
    # móviles: secciones clave
    pg.close()
    pm = b.new_page(viewport={"width":390,"height":844})
    pm.goto("http://localhost:3000", wait_until="domcontentloaded")
    for _ in range(30):
        try: pm.click("#skip-intro-btn", timeout=500)
        except: pass
        if pm.evaluate("()=>{const c=document.getElementById('cinematic-curtain');return c?getComputedStyle(c).display:'none'}")=='none': break
        pm.wait_for_timeout(300)
    pm.wait_for_timeout(900)
    for sel in ["#main-nav","#hero-section","#historia","#quien-es","#ev4-contexto","footer"]:
        try:
            l = pm.locator(sel).first
            l.scroll_into_view_if_needed(timeout=2500); pm.wait_for_timeout(400)
            l.screenshot(path=str(OUT/f"m{sel.replace('#','_')}.png"), timeout=8000)
            print("ok-mobile", sel)
        except Exception: print("X-mobile", sel)
    b.close()
print("FIN")
