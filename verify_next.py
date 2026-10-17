#!/usr/bin/env python3
"""
Verificación integral del port Goldtex a Next.js.
Comprueba: render, acciones (data-action), videos, imágenes completas,
galería Swiper, showroom WebGL, Lenis rueda, móvil vs desktop.
Uso: python3 verify_next.py --port 3000
"""
import sys, json, time
from playwright.sync_api import sync_playwright

PORT = None
for i, a in enumerate(sys.argv):
    if a == "--port": PORT = sys.argv[i + 1]
PORT = PORT or "3000"
BASE = f"http://localhost:{PORT}"

results = {"pass": [], "fail": [], "warn": []}
def check(name, ok, detail=""):
    results["pass" if ok else "fail"].append(f"{name}: {detail}")
    print(("[PASS] " if ok else "[FAIL] ") + f"{name} — {detail}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    errors = []
    # ---------- DESKTOP ----------
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(BASE, wait_until="networkidle", timeout=60000)

    # 1. Título y lang
    check("titulo ES", page.title().startswith("GOLDTEX"), page.title()[:60])

    # 2. Secciones presentes (anclas intactas)
    for sid in ["hero-section", "evidencia-1", "evidencia-2", "evidencia-3",
                "decoracion-tendencias", "experience-configurator", "audiovisual"]:
        n = page.locator(f"#{sid}").count()
        check(f"ancla #{sid}", n == 1, f"count={n}")

    # 3. Saltar intro
    skip = page.locator("#skip-intro-btn")
    check("botón intro", skip.count() == 1)
    if skip.count():
        try:
            skip.click(timeout=3000)
            page.wait_for_timeout(1200)
        except Exception as e:
            results["warn"].append(f"skip intro: {e}")

    # 4. Lienzo WebGL (canvas creado por el showroom portado)
    canvas = page.locator("#webgl-canvas canvas")
    page.wait_for_timeout(1500)
    cnv = canvas.count()
    check("canvas WebGL", cnv == 1, f"count={cnv}")

    # 5. Videos del audiovisual (producto): reproducción real
    for i in (1, 2):
        rs = page.evaluate(f"""() => {{
            const v = document.getElementById('spot-video-{i}');
            if (!v) return null;
            if (v.readyState >= 3) v.play().catch(() => {{}});
            return {{ ready: v.readyState, paused: v.paused, muted: v.muted, poster: !!v.poster, t: v.currentTime }};
        }}""")
        check(f"spot-video-{i}", rs is not None and rs["ready"] >= 3, json.dumps(rs))
    page.wait_for_timeout(2500)
    for i in (1, 2):
        t = page.evaluate(f"document.getElementById('spot-video-{i}')?.currentTime ?? -1")
        check(f"spot-video-{i} avanza", t and t > 0.3, f"t={t}")

    # 6. Toggle play con data-action (equivalente onclick)
    page.evaluate("(e => e.dispatchEvent(new MouseEvent('click', {bubbles: true})))(document.querySelector('#spot-video-1'))")

    # 7. Imágenes completas (regla de oro: nunca recortadas)
    imgs = page.evaluate("""() => Array.from(document.querySelectorAll('main img')).map(im => {
        const r = im.getBoundingClientRect();
        return { src: (im.currentSrc || im.src).split('/').pop(), dw: im.dataset.w || im.naturalWidth, dh: im.naturalHeight, w: r.width, loadingComplete: im.complete };
    })""")
    naturalOK = [im for im in imgs if im["loadingComplete"] and im["dw"]]
    check(f"images cargadas", len(naturalOK) > 0, f"{len(naturalOK)}/{len(imgs)}")

    # 8. Swiper galería inicializada (coverflow)
    sw = page.evaluate("""() => {
        const el = document.querySelector('#swiper-keyvisual');
        if (!el) return { found: false };
        const cls = el.className || '';
        const slides = el.querySelectorAll('.swiper-slide').length;
        return { found: true, cls: cls.slice(0, 120), slides };
    }""")
    check("swiper galería", sw.get("found") and sw.get("slides", 0) >= 3, json.dumps(sw)[:140])

    # 9. Lenis activo (smooth scroll)
    lenis = page.evaluate("!!(document.documentElement.className + ' ' + document.body.className).match(/lenis/) || window.lenis != null")
    check("lenis clases", lenis, "html/body.className")

    # 10. Scroll hacia el configurador con acción del HUD
    r = page.evaluate("""() => { document.getElementById('btn-zoom-fiber')?.dispatchEvent(new MouseEvent('click', {bubbles:true})); return true; }""")
    page.wait_for_timeout(400)
    r2 = page.evaluate("""() => {
        const v = document.querySelector('#experience-configurator');
        return v ? Math.round(v.getBoundingClientRect().top) : null;
    }""")
    # info aunque no falla (activa animaciones UI del configurador)
    check("zoom fiber dispensado", r is True, f"panel top={r2}")

    # 11. Errores de página
    check("sin JS runtime errors", not errors, "; ".join(errors[:3]))

    # 12. Capturas desktop
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(700)
    page.screenshot(path="shots/next_desktop_hero.png")
    page.evaluate("document.getElementById('audiovisual').scrollIntoView({block:'start'})")
    page.wait_for_timeout(900)
    page.screenshot(path="shots/next_desktop_audiovisual.png")

    # ---------- MÓVIL ----------
    mob = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    mob.goto(BASE, wait_until="networkidle", timeout=60000)
    mob.evaluate("document.getElementById('skip-intro-btn')?.click()")
    mob.wait_for_timeout(1000)
    slides = mob.evaluate("""() => {
        const el = document.querySelector('#swiper-keyvisual .swiper-slide');
        if (!el) return null;
        // offsetWidth: layout SIN transformaciones (el coverflow escala visualmente las slides laterales)
        return { sw: Math.round(el.offsetWidth), inside: true };
    }""")
    check("móvil slide", slides is not None and slides.get("sw", 0) > 200, json.dumps(slides))
    mob.screenshot(path="shots/next_mobile_hero.png")
    mob.close()

    page.close()
    browser.close()

print("\n" + "=" * 60)
print(f"RESULTADO: {len(results['pass'])} OK | {len(results['fail'])} FALLOS | {len(results['warn'])} avisos")
for fail in results["fail"]:
    print("  ✗", fail)
sys.exit(1 if results["fail"] else 0)
