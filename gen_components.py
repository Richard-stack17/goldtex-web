#!/usr/bin/env python3
"""Genera componentes de sección desde body_converted.jsx (alineado 1:1 con _extracted_body.html)."""
import re, os
from html.parser import HTMLParser

CONV = open('body_converted.jsx').read().split('\n')
ORIG = open('_extracted_body.html').read().split('\n')

VOID = {'img','source','br','hr','input','meta','link','area','base','col','embed','track','wbr',
        'path','circle','rect','line','polyline','polygon','stop','ellipse'}

class TopLevel(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.depth = 0
        self.items = []
        self.cur = None
    def handle_starttag(self, tag, attrs):
        if tag in VOID: return
        if self.depth == 0:
            d = dict(attrs)
            self.cur = {'tag': tag, 'id': d.get('id',''), 'class': d.get('class',''), 'start': self.getpos()[0]}
        self.depth += 1
    def handle_endtag(self, tag):
        if tag in VOID: return
        self.depth -= 1
        if self.depth == 0 and self.cur:
            self.cur['end'] = self.getpos()[0]
            self.items.append(self.cur)
            self.cur = None

def top_of(lines_text):
    p = TopLevel()
    p.feed(lines_text)
    return p.items

# --- nivel raíz (fuera de main): overlays + main
root = top_of(re.sub(r'^\s*<body[^>]*>', '', '\n'.join(ORIG)))
main_item = next(it for it in root if it['tag'] == 'main')
overlays = [it for it in root if it['tag'] != 'main']

# --- hijos de main
inner_orig = '\n'.join(ORIG[main_item['start']:main_item['end']-1])
inner_orig = re.sub(r'^\s*<main[^>]*>', '', inner_orig)
kids = top_of(inner_orig)
# alinear: kid line k (1-based en inner) -> CONV line: main_item['start'] + k - 1
base = main_item['start']

def grab(s, e):
    """s,e: 1-based inclusive en CONV/ORIG; CONV es lista 0-based → slice [s-1:e] da líneas s..e."""
    return '\n'.join(CONV[s-1:e])

os.makedirs('src/components/sections', exist_ok=True)
HEADER = "/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */\n"

def write_comp(name, chunk):
    comp = f"""{HEADER}export default function {name}() {{
  return (
    <>
{chunk}
    </>
  );
}}
"""
    open(f'src/components/sections/{name}.tsx', 'w').write(comp)
    n = chunk.count('\n') + 1
    print(f"→ {name}.tsx ({n} líneas)")

# Overlays: desde primera overlay hasta última overlay (son contiguas)
ov_lines = [(it, it['start'], it['end']) for it in overlays]
s_first = min(it['start'] for it in overlays)
s_last = max(it['end'] for it in overlays)
# rangos en ORIG: [s_first, s_last] ; en CONV igual (alineadas)
write_comp('Overlays', grab(s_first, s_last - 1 + 1))

ids_needed = {
    'main-nav': 'Navigation', 'hero-section': 'Hero', 'evidencia-1': 'Evidencia1',
    'evidencia-2': 'Evidencia2', 'evidencia-3': 'Evidencia3',
    'decoracion-tendencias': 'DecoracionTendencias',
    'experience-configurator': 'ExperienceConfigurator',
    'audiovisual': 'Audiovisual', 'footer': 'Footer',
}
by_id = {it['id']: it for it in kids if it['id']}
for id_, name in ids_needed.items():
    if id_ == 'footer' and 'footer' not in by_id:
        it = next(k for k in kids if k['tag'] == 'footer')
    else:
        it = by_id[id_]
    # ELEMENTO COMPLETO (apertura + interior + cierre): preserva ids/anclas/JS
    # mapeo: línea k (1-based) en inner ↔ CONV/ORIG línea base + k  (inner línea 1 = línea base+1)
    full_open = base + it['start']
    full_close = base + it['end']
    write_comp(name, grab(full_open, full_close))

print("OK")
