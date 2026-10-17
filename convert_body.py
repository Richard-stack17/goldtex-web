#!/usr/bin/env python3
"""
Conversor HTML -> JSX para la migración Goldtex a Next.js.
Transformaciones mecánicas fieles (sin alterar contenido):
  class= -> className=          style="..." -> style={{...}} (camelCase)
  onclick="fn(a)" -> data-action="fn(a)"
  void tags -> self-closing     SVG attrs -> camelCase
  autoplay->autoPlay, playsinline->playsInline, tabindex->tabIndex
  <!-- x --> -> {/* x */}       src relativos de assets -> /ruta
"""
import re, os, sys

BODY = open('_extracted_body.html').read()

def camel(name: str) -> str:
    parts = name.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])

CAMEL_CSS = {
    'background-color','background-image','background-size','background-position','background-clip',
    'border-radius','border-color','border-top','border-bottom','border-left','border-right',
    'border-top-color','border-bottom-color','box-shadow','font-size','font-family','font-weight',
    'font-style','letter-spacing','line-height','margin-top','margin-bottom','margin-left','margin-right',
    'padding-top','padding-bottom','padding-left','padding-right','text-align','text-transform',
    'text-decoration','text-shadow','text-indent','object-fit','object-position','aspect-ratio',
    'backdrop-filter','z-index','min-height','max-height','min-width','max-width','grid-template-columns',
    'grid-template-rows','grid-column','grid-row','grid-gap','gap','flex-direction','flex-wrap','flex-flow',
    'justify-content','align-items','align-content','align-self','white-space','word-break','overflow-wrap',
    'overflow-x','overflow-y','transition','transition-property','transition-duration','transition-timing-function',
    'transition-delay','animation','animation-name','animation-duration','animation-timing-function',
    'animation-delay','animation-iteration-count','animation-direction','animation-fill-mode','transform',
    'transform-origin','transform-style','perspective','perspective-origin','clip-path','will-change',
    'scroll-snap-type','scroll-snap-align','touch-action','pointer-events','user-select','mix-blend-mode',
    'filter','backface-visibility','box-sizing','outline','outline-offset','list-style','list-style-type',
    'column-count','column-gap','row-gap','place-items','place-content','text-overflow','vertical-align',
    'border-collapse','border-spacing','table-layout','counter-reset','counter-increment','content','fill',
    'stroke','caret-color','image-rendering','shape-outside','mask-image','mask-size','mask-position',
    'background-position-x','background-position-y','margin','padding','top','bottom','left','right','inset'
}

def style_to_jsx(style_str: str) -> str:
    # divide en declaraciones respetando url(...), rgba(...) etc.
    decls = []
    depth = 0; cur = ''
    for ch in style_str:
        if ch == '(': depth += 1
        if ch == ')': depth -= 1
        if ch == ';' and depth == 0:
            decls.append(cur); cur = ''
        else:
            cur += ch
    if cur.strip(): decls.append(cur)
    props = []
    for d in decls:
        if ':' not in d: continue
        k, v = d.split(':', 1)
        k = k.strip().lower(); v = v.strip()
        if not k or not v: continue
        jk = camel(k) if k in CAMEL_CSS else camel(k)
        # prefijos webkit: -webkit-backdrop-filter -> WebkitBackdropFilter
        if jk.startswith('webkit'):
            jk = 'Webkit' + jk[len('webkit'):]
        # valores entre comillas dobles escapando internas (los valores de CSS
        # contienen comillas simples: font-family: 'Cinzel', serif)
        esc = v.replace('\\', '\\\\').replace('"', '\\"')
        props.append(f'{jk}: "{esc}"')
    return '{{ ' + ', '.join(props) + ' }}'

def convert(html: str) -> str:
    out = html
    # comentarios HTML -> JSX
    out = re.sub(r'<!--(.*?)-->', lambda m: '{/* ' + m.group(1).replace('*/', '*[SLASH]') + ' */}', out, flags=re.S)
    # onclick -> data-action
    out = re.sub(r'\sonclick="([^"]*)"', lambda m: f' data-action="{m.group(1)}"', out)
    # class -> className
    out = re.sub(r'\sclass="', ' className="', out)
    # style -> objeto
    out = re.sub(r'\sstyle="([^"]*)"', lambda m: ' style=' + style_to_jsx(m.group(1)), out)
    # svg camelCase
    for a in ['stroke-linecap','stroke-linejoin','stroke-width','fill-rule','clip-rule','stroke-miterlimit',
              'stroke-dasharray','stroke-dashoffset','stroke-opacity','stop-color','stop-opacity','stroke-dashoffset']:
        out = re.sub(rf'\s{a}="', ' ' + camel(a) + '="', out)
    # tabindex
    out = out.replace('tabindex=', 'tabIndex=')
    # video
    out = re.sub(r'\sautoplay(?=[\s>])', ' autoPlay', out)
    out = re.sub(r'\splaysinline(?=[\s>])', ' playsInline', out)
    # void tags -> self-closing
    for t in ['img','source','br','hr','input','meta','link','area','base','col','embed','track','wbr',
              'path','circle','rect','line','polyline','polygon','stop','ellipse']:
        # <t ...> que no termina en /> y no es cierre
        out = re.sub(rf'<({t})((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)(?<!/)>', r'<\1\2 />', out, flags=re.I)
    # src relativos -> absolutos para assets
    def fix_src(m):
        val = m.group(2)
        if val.startswith(('http', '/', '#', 'data:', 'mailto:', 'tel:')) or val.endswith(('.html', '.css', '.js')):
            return m.group(0)
        if re.search(r'\.(png|jpe?g|gif|svg|mp4|webm|webp|ico|json)$', val, re.I):
            return f'{m.group(1)}="/{val}"'
        return m.group(0)
    out = re.sub(r'\b(src|poster|href)="([^"]*)"', fix_src, out)
    return out

converted = convert(BODY)
open('body_converted.jsx', 'w').write(converted)
print("convertido OK, líneas:", converted.count('\n') + 1)
