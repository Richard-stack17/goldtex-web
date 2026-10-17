---
name: Peruvian Haute Textile Editorial
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#c0c8c5'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8a938f'
  outline-variant: '#404946'
  surface-tint: '#9fd0c4'
  primary: '#9fd0c4'
  on-primary: '#00382f'
  primary-container: '#083e35'
  on-primary-container: '#79a99d'
  inverse-primary: '#38675c'
  secondary: '#f8bd3a'
  on-secondary: '#412d00'
  secondary-container: '#c79201'
  on-secondary-container: '#442f00'
  tertiary: '#bcc9c4'
  on-tertiary: '#27332f'
  tertiary-container: '#2d3936'
  on-tertiary-container: '#96a29e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#baeddf'
  primary-fixed-dim: '#9fd0c4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#1e4f45'
  secondary-fixed: '#ffdea3'
  secondary-fixed-dim: '#f8bd3a'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#d8e5e0'
  tertiary-fixed-dim: '#bcc9c4'
  on-tertiary-fixed: '#121e1b'
  on-tertiary-fixed-variant: '#3d4946'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  headline-hero:
    fontFamily: Bodoni Moda
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: -0.03em
  headline-hero-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 56px
    fontWeight: '500'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-uppercase:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.22em
  label-caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.04em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-tablet: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.5rem
  space-lg: 3rem
  space-xl: 6rem
---

## Brand & Style

This design system defines an Awwwards-caliber digital experience celebrating Peruvian textile excellence. Built for haute-couture fashion houses, interior ateliers, and discerning design professionals, the aesthetic blends monumental editorial high-fashion with tactile artisanal mastery. 

The visual personality balances confidence, heritage, and fluid kinetic drama. Rooted in an avant-garde editorial movement, it features cinematic proportions, generous dark space, hairline golden rules, subtle film grain, and glowing atmospheric light leaks that mirror the luminous drape of emerald velvet and spun liquid gold. Interactions feel weightless yet grounded in deep physical craftsmanship.

## Colors

The palette is anchored by the deep, cavernous tone of **Obsidian Void** (`#010806`), providing infinite contrast and an immersive backdrop for rich textile imagery. **Brunswick Green** (`#083E35`) represents the heritage weave and biological richness of premium Peruvian fibers, appearing in lush surface fills, deep gradients, and elevated container accents.

**Papaya Gold** (`#F1B734`) serves as the active metallic spark—used for fine bounding lines, metric highlights, active states, and radiant edge glows. **Chalk White** (`#F4F3F3`) provides stark, crisp typographic contrast, applied deliberately to oversized display titles and legible captions to ensure uncompromised editorial hierarchy.

## Typography

The typographic hierarchy juxtaposes monumental, high-contrast serif display typography with immaculate, geometric sans-serif body copy. 

**Bodoni Moda** delivers dramatic vertical stroke contrast, sharp serifs, and high-fashion authority. It is deployed exclusively for campaign statements, hero titling, and section headers. 

**Plus Jakarta Sans** acts as the balanced, clean partner. It delivers razor-sharp legibility across technical thread compositions, narrative body columns, and micro-labeled indexes. Editorial captions and index markers utilize expanded letter spacing to evoke luxury publication credits.

## Layout & Spacing

The structural layout uses an asymmetric 12-column fluid grid system engineered for cinematic storytelling. Column spans follow editorial asymmetry: hero statements break margins, high-resolution imagery occupies 7-column or 5-column rhythms, and descriptive text columns float off-center to produce pacing akin to a tactile art monograph.

On desktop, wide outer margins (`4rem`) frame the experience like a gallery canvas. Tablet screens condense outer margins to `2.5rem` with tight 8-column grouping, while mobile views compress margins to `1.25rem` under a single or 2-column stacked flow. Macro spacing (`space-xl` at 6rem) separates thematic collection chapters, giving full resonance to motion assets and high-density fiber photographs.

## Elevation & Depth

Visual depth is achieved through layered tonal textures, atmospheric light diffusion, and hairline golden perimeters rather than heavy shadows:

- **Surface Tiers:** Backgrounds begin at deep Obsidian Void (`#010806`). Floating cards and panels use translucent Brunswick Green blends (`rgba(8, 62, 53, 0.35)`) paired with high-performance backdrop blurs (`backdrop-filter: blur(24px)`).
- **Golden Borders:** Surfaces and dividing rules employ ultra-fine 1px hairlines colored in semi-translucent Papaya Gold (`rgba(241, 183, 52, 0.2)`), catching light like spun metallic thread.
- **Ambient Glows:** Focal imagery and primary interactive touchpoints emit diffuse radial glows tinted in emerald and gold (`box-shadow: 0 0 60px -10px rgba(241, 183, 52, 0.12)`).

## Shapes

The shape vocabulary uses strict architectural precision (`roundedness: 0`). Sharp 90-degree corners enforce high-fashion rigor, echoing architectural weaving looms, fine cut-fabric bolts, and luxury print editions. 

Interactive chips and secondary tags may adopt minimal 1px micro-chamfers or sharp rectilinear silhouettes framed by fine metallic borders. Rounded corners are intentionally excluded to maintain severe, uncompromising editorial elegance.

## Components

### Buttons
- **Primary Action:** Solid Papaya Gold (`#F1B734`) background with Obsidian Void (`#010806`) text set in `label-uppercase`. Sharp rectilinear edges (`roundedness: 0`). On hover: background shifts to Brunswick Green with glowing Papaya Gold border and Chalk White text.
- **Secondary / Ghost Action:** Transparent background bounded by a 1px hairline border in `rgba(241, 183, 52, 0.4)`. Text in Chalk White. Hover triggers an inward fill of translucent green (`rgba(8, 62, 53, 0.4)`).

### Editorial Chips & Tags
- Used for fabric specs (e.g., "100% Peruvian Pima Cotton", "Weight: 380 GSM"). Built with 1px border lines, dark Obsidian fill, uppercase tracking, and a gold bullet accent (`•`).

### Timeline & Navigation Sliders
- Minimalist track line spanning across screen margins in `rgba(244, 243, 243, 0.2)`. Active phase indicators illuminate in solid Papaya Gold with expanding directional chevrons.

### Input Fields & Selectors
- Border-bottom-only style: 1px rule in Chalk White (`rgba(244, 243, 243, 0.3)`), transitioning to intense Papaya Gold upon focus. Transparent background, crisp typography, and floating uppercase field labels.

### Gallery Cards
- Framed in subtle 1px border (`rgba(241, 183, 52, 0.15)`), filled with deep obsidian/brunswick translucent glass. Includes image zoom effect on hover with silk-like damping.