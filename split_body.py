#!/usr/bin/env python3
"""Divide body_converted.jsx en componentes de sección Next.js."""
import re, os

src = open('body_converted.jsx').read()
lines = src.split('\n')

VOID = {'img','source','br','hr','input','meta','link','area','base','col','embed','track','wbr',
        'path','circle','rect','line','polyline','polygon','stop','ellipse'}

# Obtener top-level: escaneo con profundidad de etiquetas
top_items = []  # (start_line_idx, end_line_idx_exclusive, tag, id, class)
depth = 0
cur_start = None
cur_meta = None
pending_comment = None

import html as _html

parser_state = {'i': 0}

def scan_line(i, l):
    """Retorna (opens_tag_meta, closes_tag_count) aproximado por línea."""
    opens = re.findall(r'<(?!/)(?!!)(\w+)([^>]*)>', l)
    closes = len(re.findall(r'</(\w+)>', l))
    return opens, closes

depth = 0
i = 0
items = []
cur = None
while i < len(lines):
    l = lines[i]
    # ignorar líneas de comentarios JSX
    stripped = l.strip()
    opens = [o for o in re.finditer(r'<(?!/)(?!!)(\w+)((?:"[^"]*"|\'[^\']*\'|[^>"\'])*?)(/?)>', l)]
    closes = re.findall(r'</(\w+)>', l)
    n_open_effective = 0
    for m in opens:
        tag, attrs, selfclose = m.group(1), m.group(2), m.group(3)
        if tag.lower() in VOID: continue
        if selfclose == '/': continue
        n_open_effective += 1
    n_close_effective = sum(1 for c in closes if c not in VOID)
    if depth == 0 and n_open_effective > 0:
        m = opens[0]
        tag, attrs = m.group(1), m.group(2)
        idm = re.search(r'id="([^"]*)"', attrs)
        clm = re.search(r'className="([^"]*)"', attrs)
        cur = {'start': i, 'tag': tag, 'id': idm.group(1) if idm else '', 'class': clm.group(1) if clm else ''}
    depth += n_open_effective - n_close_effective
    if cur and depth == 0 and n_close_effective > 0:
        cur['end'] = i + 1
        items.append(cur)
        cur = None
    i += 1

for it in items:
    print(f"{it['start']+1:>5}-{it['end']:<5} <{it['tag']} id={it['id'] or '-'} class={it['class'][:50]}>")
import json
json.dump(items, open('top_level_map.json','w'))
