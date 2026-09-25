---
name: Yaponiya iqtisodiyoti
description: A speaker-led scroll presentation on Japan's economy, rendered as a basin of suminagashi ink.
colors:
  paper-water: "#f6f7f9"
  wash: "#eceff3"
  mist: "#dde2e8"
  feathered-gray: "#aeb6c2"
  dilute-ink: "#606d80"
  ink-current: "#1e2d4a"
  indigo-depth: "#0a1a33"
  sumi-pool: "#060a12"
  shu-seal: "#c23b22"
typography:
  display:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 6.6vw, 6rem)"
    fontWeight: 250
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.2vw, 5.4rem)"
    fontWeight: 250
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 2.4vw, 2rem)"
    fontWeight: 300
    lineHeight: 1.2
  body:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 350
    lineHeight: 1.55
  lede:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.35vw, 1.3rem)"
    fontWeight: 350
    lineHeight: 1.6
  label:
    fontFamily: "Commissioner, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.18em"
  inscription:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)"
    fontWeight: 500
    letterSpacing: "0.3em"
rounded:
  control: "999px"
  card: "16px"
  tooltip: "8px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4.5rem)"
  slide-pad: "80px"
  container: "1320px"
  rail: "232px"
components:
  button-primary:
    backgroundColor: "{colors.indigo-depth}"
    textColor: "{colors.paper-water}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 12px 0 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.indigo-depth}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 28px"
  rail-item-active:
    backgroundColor: "{colors.indigo-depth}"
    textColor: "{colors.paper-water}"
    rounded: "{rounded.control}"
    size: "32px"
  flashcard:
    backgroundColor: "{colors.paper-water}"
    textColor: "{colors.indigo-depth}"
    rounded: "{rounded.card}"
    padding: "24px"
  flashcard-back:
    backgroundColor: "{colors.indigo-depth}"
    textColor: "{colors.paper-water}"
    rounded: "{rounded.card}"
    padding: "24px"
  tooltip:
    backgroundColor: "{colors.indigo-depth}"
    textColor: "{colors.paper-water}"
    rounded: "{rounded.tooltip}"
    padding: "8px 14px"
---

# Design System: Yaponiya iqtisodiyoti

## Overview

**Creative North Star: "The Suminagashi Basin"**

The page is one shallow basin of water on which ink is dropped. Each era of Japan's economy is a drop that spreads, thins and is pushed outward by the next, so the newest drop is always the darkest region. The same area-preserving marbling map drives the live WebGL hero, the hairline history rings, and the computed marbled textures on controls, the endpaper band and the future wash. The ink is never a picture of ink.

It is a projected talk, not a scrolling brochure. Every presenter stop is a full-viewport slide that holds one idea and is reached with → / PageDown. Paper-white water carries reading. Two indigo "pools" (the robot section and the finale) mark the climax and the close. A single vermilion seal is the only warm color on the page.

**Key Characteristics:**
- Cool paper-white ground, indigo and carbon ink that thins to feathered gray, no cream.
- Light-weight humanist sans at large sizes, with Japanese words hung as vertical mincho inscriptions beside headings.
- Structure from hairline rules and 1px gaps, never from drop shadows or boxed cards.
- Motion is ink: spreading (radial bloom), thinning (opacity plus blur resolving to focus), dissolving (masked erase with blur).
- Every figure carries its source and year. Approximations wear "~".

## Colors

A restrained ink palette: one hue family (indigo) stepping from water to depth, and one rationed warm seal.

### Primary
- **Indigo Depth** (indigo-depth): the darkest ink. Used for headings and body emphasis on paper, the primary control, the active rail item, the focus entity in charts (Japan), and the ground of the robot pool.
- **Ink Current** (ink-current): a working indigo. Used for chart marks, the progress meter, selection, focus rings and caret.

### Tertiary
- **Shu Seal** (shu-seal): vermilion from the rakkan seal on sumi-e paintings. It appears only in the mark's seal, the "now" marker (the current history row and the present point on the aging chart), the last timeline node, and one comparison reference line (Uzbekistan's growth).

### Neutral
- **Paper Water** (paper-water): the page ground and the text on ink.
- **Wash** (wash): the alternate band ground that separates adjacent paper slides.
- **Mist** (mist): hairline rules, grid gaps, chart gridlines.
- **Feathered Gray** (feathered-gray): old ink. Used for inactive ladder rows, secondary strokes, and dark-ground secondary text.
- **Dilute Ink** (dilute-ink): secondary text on paper (≈4.9:1) and ledes.
- **Sumi Pool** (sumi-pool): the deepest ground, behind the Spline robot card and the "why" chain.

### Named Rules
**The Newest Drop Is Darkest Rule.** Wherever time is shown, the present is the darkest mark and the past thins toward feathered gray. That covers the year's last two digits, the ring bands, the ladder rows and the aging line.

**The One Seal Rule.** Vermilion marks only the mark and "now". It is never a button, a link color or a series color.

## Typography

**Display Font:** Commissioner (with ui-sans-serif, system-ui)
**Body Font:** Commissioner
**Inscription Font:** Shippori Mincho B1 (with Hiragino Mincho ProN, Yu Mincho) — its ink-trap corners echo pooled ink.

**Character:** A quiet humanist sans set very light and very large, answered by a brushed mincho that hangs vertically like a scroll inscription.

### Hierarchy
- **Display** (250, clamp(3.2rem, 6.6vw, 6rem), 0.98): the hero title and chapter openers (e.g. "Robotlar mamlakati").
- **Headline** (250, clamp(2.6rem, 5.2vw, 5.4rem), 1.02): section headings, split into per-word spans that settle from blur.
- **Title** (300, 1.45–2rem, 1.2): item headings in ledgers, sector rows, the future list and problem blocks.
- **Body** (350, 18px root, 1.55): reading copy. Ledes cap at 62ch.
- **Label** (500, 0.72rem, 0.18em, uppercase): rail items, control labels. Never placed above a heading.
- **Figures** (200–300, 2–4.4rem): lining numerals for large figures. Tabular numerals only where numbers align (tables, ticks, timeline years).

### Named Rules
**The Inscription, Not Kicker, Rule.** A Japanese word belongs beside its heading in vertical writing (writing-mode: vertical-rl, 0.3em tracking), never as a small line above it.

## Layout

A fixed left rail (232px at ≥1024px; a 48px opaque top bar below that) and a content column capped at 1320px with a clamp(1.25rem, 4vw, 4.5rem) gutter. Every presenter stop is a `.slide`: min-height 100svh, content vertically centred, about 80px vertical padding. Pinned stages (the history ladder at 560svh, the whiteout at 260svh) hold a sticky 100svh frame and write their progress to `--p`. Grids use explicit tracks: 2-column text/figure splits, 3-cell and 2-cell ledgers separated by 1px mist gaps, a 6-track future grid (3 + 2), and a 4-up flashcard row. Charts are SVG with viewBox scaling. Text sizes inside the viewBox are chosen to render at or above 14px on a 1440px projector frame.

## Elevation & Depth

Flat by default. Depth comes from ink density and ground changes (paper → wash → indigo pool → sumi), not from shadows. Two soft shadows exist: the help overlay and the chart tooltip each float with one offset shadow (0 18px 40px -18px / 0 10px 24px -12px, rgba of indigo depth).

### Named Rules
**The Density Is Depth Rule.** To bring something forward, give it darker ink or put it on a pool. Never add a card shadow.

## Shapes

Pills for controls and rail items (999px). 16px radius for the flashcards and the robot card. Everything else is square-cornered and rule-bound. Circles are data: flag drops (area ∝ GDP), ring bands and timeline nodes.

## Components

### Buttons
- **Shape:** full pill (999px), 56px tall.
- **Primary:** indigo depth filled with a computed marbled-ink texture (lib/marble.ts, "ink" preset). Paper label in tracked caps. A 36px ringed arrow disc sits at the right. On hover the marble drifts across (background-position, 1.6s ease-ink).
- **Secondary:** a feathered-gray 1px outline pill. On hover the border turns indigo depth.
- **Splash button (finale):** a paper pill on the pool. The label swaps letter by letter and ink splash strokes burst on hover.

### Navigation
- **Rail:** the seal mark and wordmark on top, ten items (a lucide icon in a 32px disc plus a tracked label), then a section counter (tabular), a 1px progress line and key hints. Active: an indigo-depth disc with a paper icon. Inactive: a dilute icon and label. Hover: indigo depth.
- **Presenter keys:** → ↓ PageDown Space step forward through `[data-stop]` stops (and through `data-stops` progress points inside pinned stages); ← ↑ PageUp step back; F toggles fullscreen; ? opens the help overlay, which also lists the live effects.

### Flashcards
A paper card with a mist border (16px). The romaji label sits top-left and the kanji is set vertically in mincho. It flips 180° on hover, click or Enter to an indigo-depth back that carries the meaning.

### Ink Basin (signature)
A WebGL2 stable-fluid solver on paper. Dye is stored as absorbance and shown with Beer–Lambert, so thinning ink goes gray-blue, not transparent. Drops use the area-preserving marbling map, the pointer drags currents, and a click drops ink. The simulation pauses off-screen.

### Ledgers
Figure plus label rows on hairline rules. The figure counts up once (NumberFlow, ru-RU grouping: space thousands, comma decimals), and a source note sits under the label.

## Do's and Don'ts

### Do:
- **Do** give every figure a source and a year, and prefix rounded values with "~".
- **Do** make each presenter stop one full-viewport slide with one idea.
- **Do** compute ink (marbling map, fluid solver) instead of drawing pictures of ink.
- **Do** hang Japanese words vertically beside headings.
- **Do** keep chart text at 14px or more at projector size, and give every chart a "Jadval ko‘rinishi" table view.

### Don't:
- **Don't** put a kicker or eyebrow label above a heading.
- **Don't** use vermilion for anything but the seal and "now".
- **Don't** use drop shadows on cards or sections. Depth is ink density.
- **Don't** use gradient text, glass or blur as decoration.
- **Don't** show on-screen interaction instructions to the audience. They live in the "?" overlay.
