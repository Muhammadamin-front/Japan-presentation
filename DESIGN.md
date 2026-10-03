---
name: Vatikan iqtisodiyoti
description: A speaker-led scroll presentation on the Vatican's economy, walked as the axial plan of the Vatican Gardens.
colors:
  gravel: "#e8ddc6"
  gravel-2: "#ddd0b3"
  stone: "#c7b994"
  spray: "#f6f5ef"
  statuary: "#8c8f8a"
  text: "#2b3a2f"
  muted: "#555d4b"
  hedge: "#1f3b2a"
  hedge-mid: "#2c5039"
  hedge-deep: "#13261a"
  leaf: "#9fb28f"
  gilt: "#a9853a"
  gilt-light: "#d2b46c"
  porphyry: "#8e2f25"
  water: "#6f8f8a"
typography:
  display:
    fontFamily: "Castoro Titling, Times New Roman, serif"
    fontSize: "clamp(3.4rem, 7.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Castoro Titling, Times New Roman, serif"
    fontSize: "clamp(1.8rem, 4.6vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "0.04em"
  title:
    fontFamily: "Castoro Titling, Times New Roman, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "0.06em"
  figure:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "\"lnum\" 1"
  lede:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"lnum\" 1"
  latin:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    letterSpacing: "0.01em"
  label:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 500
    letterSpacing: "0.2em"
  note:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  basin: "9999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4.5rem)"
  container: "1340px"
  rail: "220px"
  bar: "3rem"
  slide-pad: "5rem"
  frame-inset: "9px"
  card-pad: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.hedge}"
    textColor: "{colors.spray}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "3.5rem"
    padding: "0 0.75rem 0 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.hedge-mid}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.hedge-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "3.5rem"
    padding: "0 1.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.gravel-2}"
  button-splash:
    backgroundColor: "{colors.gilt-light}"
    textColor: "{colors.hedge-deep}"
    rounded: "{rounded.none}"
    height: "60px"
    padding: "0 1.6rem 0 2rem"
  rail-basin:
    backgroundColor: "{colors.hedge}"
    textColor: "{colors.leaf}"
    rounded: "{rounded.basin}"
    size: "2rem"
  rail-basin-awake:
    backgroundColor: "{colors.hedge-mid}"
    textColor: "{colors.gilt-light}"
    rounded: "{rounded.basin}"
    size: "2rem"
  rail-basin-active:
    backgroundColor: "{colors.gilt-light}"
    textColor: "{colors.hedge-deep}"
    rounded: "{rounded.basin}"
    size: "2rem"
  fountain-card:
    backgroundColor: "{colors.gravel}"
    textColor: "{colors.hedge-deep}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-pad}"
    height: "340px"
  fountain-card-back:
    backgroundColor: "{colors.hedge}"
    textColor: "{colors.spray}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-pad}"
    height: "340px"
  readout-card:
    backgroundColor: "{colors.spray}"
    textColor: "{colors.hedge-deep}"
    rounded: "{rounded.none}"
    padding: "1.25rem"
    width: "16rem"
  tooltip:
    backgroundColor: "{colors.hedge}"
    textColor: "{colors.spray}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.875rem"
---

# Design System: Vatikan iqtisodiyoti

## Overview

**Creative North Star: "The Axial Garden Plan"**

The presentation is walked as the Vatican Gardens drawn on an engraved plan: one grand axis runs from the dome to the fountains, and each presenter stop is a parterre that carries one figure. The ground is raked gravel, warm buff stone with fine horizontal rake lines; clipped hedge green owns the navigation rail, the full-bleed emphasis bands and the finale; gilt bronze draws the axes, the hairline frames, the fleurons and the "now" marker. Nothing is lit, glossy or gilded in gradient: gold is a 1px line, never a fill field.

Density is one idea per viewport. A stop is a full-height slide with a section title in engraved, widely spaced Roman capitals, a muted lede, then one composition (a ledger of figures, four fountain cards, a chart drawn as an allée, a scale-zoom map). Copy reads in a sturdy humanist sans with lining figures, sized for a projector at the back of a classroom (19px root, 21px at 1600px and wider).

Motion follows the plan: everything opens along an axis. Words rise out of a clipped line, blocks unfold symmetrically from their centre line, rules draw from the middle outward, chart marks grow from their baseline, and the rail's fountain jets wake one by one as the presenter advances. Content starts faint (15% opacity), never invisible, on desktop.

**Key Characteristics:**
- Raked-gravel ground (`gravel` with 1px rake lines every 7px) as the only texture.
- Clipped-hedge rail of nine stops, each a circular basin whose jet sleeps, wakes, or plays.
- Double hairline gilt frames with corner scrolls around every photograph, map and cartouche.
- Engraved uppercase Castoro Titling for display; Alegreya Sans for everything read.
- Square corners everywhere; circles only where water stands (basins, flag roundels, loader ring).
- Axial reveals on a single long ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).

## Colors

A warm garden palette: buff gravel and stone, three depths of clipped hedge, gilt bronze for line work, and one rationed porphyry red.

### Primary
- **Clipped Hedge** (`hedge`): the rail, the primary control, `on-hedge` emphasis bands, card backs, the chart tooltip and the finale ground. Its hover partner is **Hedge in Shade** (`hedge-mid`), which also fills "awake" basins and the scrollbar thumb; **Deep Hedge** (`hedge-deep`) is the darkest ink, used for display type and text on gilt.

### Secondary
- **Gilt Bronze** (`gilt`): 1px rules, fleurons, corner scrolls, the frame border, the active timeline diamond, the focus ring, comparison ratios and the caret. On hedge grounds it lightens to **Pale Gilt** (`gilt-light`), which also fills the active rail basin and the finale's splash button.

### Tertiary
- **Porphyry** (`porphyry`): Uzbekistan's mark in the comparison only (country name, its column of figures, its outline and Tashkent's dot on the scale-zoom map).
- **Pool Water** (`water`): a chart series colour only (the operating-result bars and the third revenue bed).

### Neutral
- **Raked Gravel** (`gravel`): the page ground, card fronts, ledger cells.
- **Shaded Gravel** (`gravel-2`): alternate slide bands and the secondary control's hover fill.
- **Travertine Stone** (`stone`): hairline dividers in ledgers and lists, the gap colour of figure grids, flag rings.
- **Fountain Spray** (`spray`): text on hedge; the readout cartouche and help dialog surface.
- **Statuary** (`statuary`): the silver key of the crossed-keys mark on light grounds.
- **Garden Ink** (`text`): running text on gravel. **Lichen** (`muted`): ledes, notes, labels, secondary data.
- **Young Leaf** (`leaf`): secondary text, Latin glosses and idle basin icons on hedge.

### Named Rules
**The Hedge Owns Rule.** Hedge green is a structural ground (rail, emphasis bands, finale, card backs, primary control), never a text accent on gravel beyond display type and figures.

**The Gilt Line Rule.** Gilt is drawn, not poured: 1px rules, frames, fleurons, markers. Its only solid fills are the active rail basin, the small timeline/ladder diamonds and the finale's splash button.

**The Porphyry Ration Rule.** Porphyry marks Uzbekistan in the comparison and nothing else. It is never an error, alert or emphasis colour.

## Typography

**Display Font:** Castoro Titling (with Times New Roman, serif), self-hosted
**Body Font:** Alegreya Sans (with ui-sans-serif, system-ui), self-hosted, weights 300/400/500/700 and 400 italic

**Character:** Engraved Roman capitals lettered like a garden-plan cartouche, against a warm humanist sans whose lining figures carry every number. The two never swap roles.

### Hierarchy
- **Display** (400, `clamp(3.4rem, 7.4vw, 6rem)`, 1.02, 0.04em, uppercase): the hero word "Vatikan" and the finale's thank-you. Its companion line runs smaller and far wider (0.24em) in `hedge-mid`.
- **Headline** (400, `clamp(1.8rem, 4.6vw, 4.6rem)`, 1.04, 0.04em, uppercase): every slide's section title, balanced wrap.
- **Title** (400, 1.35rem, 0.06–0.08em, uppercase): card, cartouche, timeline and comparison headings.
- **Figure** (Alegreya Sans 500, `clamp(2.2rem, 3.6vw, 3.4rem)`, line-height 1, lining figures): headline numbers in ledgers and cards, in `hedge`.
- **Lede** (400, `clamp(1.1rem, 1.4vw, 1.35rem)`, 1.55, max 60ch, `muted`): one paragraph under a section title.
- **Body** (400, 19px root / 21px at ≥1600px, 1.5): running text, pretty wrap.
- **Latin gloss** (italic 400, 0.01em): the Latin name under a rail stop, card or subtitle (`Civitas Vaticana`, `Aerarium`).
- **Label** (500, 0.74rem, 0.2em, uppercase): rail stop names, control text, comparison topics.
- **Note** (400, 0.82rem, 1.4, `muted`): source lines and figure captions.

### Named Rules
**The Engraved Capitals Rule.** Castoro Titling is always uppercase, weight 400, letter-spaced 0.04em or wider. It never sets running text, and figures in ledgers use Alegreya Sans unless the figure is itself a monument (the timeline year, the Davlat ledger values).

**The Every Figure Sourced Rule.** Every data block ends in a note-style source line in `muted`.

## Layout

The desktop layout is a fixed 220px hedge rail on the left (`--rail`, from 1024px) and a scrolling column of slides. Each slide fills the viewport (`min-height: 100svh`, content centred) with 5rem vertical padding inside a 1340px container with a fluid gutter. Slides alternate gravel and shaded gravel, punctuated by full-bleed hedge bands. Common compositions are two equal columns (title left, lede right, bottom-aligned), a 3-column ledger, and a 4-up card row. Pinned stages (`stage__pin`, sticky full-height) carry scroll-driven pieces: the history timeline, the scale-zoom comparison and the hero whiteout.

Below 1024px the rail collapses into a 3rem hedge bar fixed to the top: crossed keys, the current stop label, Roman numeral progress and a gilt progress hairline along its bottom edge. Grids stack to a single column and reveals start fully hidden so a half-drawn row never peeks in at the bottom edge.

**The One Stop One Viewport Rule.** A presenter stop holds one idea and fills the screen; a new idea is a new stop.

## Elevation & Depth

The plan is flat. Depth comes from tone (gravel against shaded gravel against hedge), from the double hairline frame, and from the raked texture, not from light. The only shadows in the build sit under transient floating layers that hover over content: the chart tooltip and the keyboard help dialog. Persistent surfaces (cards, cartouches, frames, controls) never cast shadows.

### Shadow Vocabulary
- **Overlay lift, tooltip** (`box-shadow: 0 10px 24px -12px rgba(19,38,26,0.6)`): chart tooltips only.
- **Overlay lift, dialog** (`box-shadow: 0 18px 40px -18px rgba(19,38,26,0.45)`): the keyboard help dialog only.

### Named Rules
**The Flat Plan Rule.** Surfaces are flat and framed. A shadow appears only beneath a layer that floats temporarily above the plan, and it is a soft hedge-tinted drop, never a hard offset.

## Shapes

Corners are square (0px) everywhere: controls, cards, cartouches, frames, tooltips, the scrollbar thumb. The recurring silhouette is the **double hairline frame**: a 1px gilt border at 70% plus a 1px gilt outline at 45% inset by 7px, finished with four corner scrolls, and with 9px of padding before a photograph or map. On hedge it uses pale gilt at 60%/35%. Circles are reserved for water: rail basins (2rem, ringed with an inner outline), flag roundels with a stone ring, the fountain loader ring. Small 45°-rotated squares (diamonds) mark the current timeline entry and ladder rungs.

**The Square Hedge Rule.** Nothing clipped from hedge or stone is rounded; a circle always means a basin.

## Components

### Buttons
- **Shape:** square (0px), 3.5rem tall.
- **Primary:** hedge fill, spray label text (0.18em tracking), a 1px hedge outline offset 4px that opens to 7px on hover while the fill shifts to `hedge-mid`; a framed 2.25rem gilt-bordered square holds the arrow icon, which dips 2px on hover. Active scales to 0.98.
- **Secondary:** transparent with a 1px hedge border at 40%, hedge-deep label; hover firms the border and fills with `gravel-2`.
- **Splash (finale):** pale gilt fill with a pale gilt outline offset 5px (8px on hover, scale 1.03); letters roll out and back in per character, a gilt stroke traces the perimeter and a spray of short dashes bursts outward.
- **Focus:** global 2px gilt outline, 3px offset.

### Chips
- **Table toggle:** a square bordered summary (stone border on gravel, pale gilt at 40% on hedge) that reveals a data table under every chart.

### Cards / Containers
- **Fountain card:** 340px flip card. Front on gravel inside the double frame with corner scrolls: engraved title, Latin gloss, fleuron rule, figure, meaning. Back on hedge with the light frame: pale gilt title, explanation in spray, Latin gloss in leaf. Flips on hover, click (pinned, `aria-pressed`) and keyboard, 700ms `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Readout cartouche:** 16rem framed spray panel (95% opacity) over the hero photograph; engraved title, fleuron rule, label/value rows divided by stone hairlines.
- **Ledger:** figure rows between a gilt top rule and stone hairlines, or a 1px-gap grid whose gap shows stone.
- **Padding:** 1.5rem in cards, 2–2.5rem in comparison articles.

### Navigation
- **Rail:** hedge column, crossed-keys mark with engraved "Vatikan" and its Latin gloss at the head; a vertical pale gilt axis at 30% runs through nine basins. Each stop pairs a basin (line icon at 15px, stroke 1.6) with a label and its Latin gloss. Idle basins are hedge with leaf icons; passed basins are `hedge-mid` with a sleeping jet at 70%; the current basin fills with pale gilt and its jet plays (`rail-jet`, 1.6s alternate). The foot shows "Bo‘lim" with Roman numeral progress, a gilt progress hairline and the keyboard hint.
- **Mobile bar:** 3rem hedge bar, label and Roman progress, gilt progress hairline.
- **Keyboard:** arrows, PageUp/PageDown and Space step between stops (clicker compatible), F toggles fullscreen, ? opens the framed help dialog.

### Fleuron Rule (signature)
A centred gilt fleuron (a bud between two scrolled leaves) between two 1px rules at 70%; the rules draw outward from the fleuron on reveal. It opens the hero, divides cartouches and cards, and leads emphasis bands (pale gilt on hedge).

### Fountain Square and Scale Zoom (signature)
Photographs and maps are framed plans with a computed overlay drawn in pale gilt strokes (axis, obelisk ellipse, basins, parterre) that draw stroke by stroke. The comparison zoom descends at one scale from Uzbekistan (porphyry) to Tashkent to the Vatican (gilt marker).

## Do's and Don'ts

### Do:
- **Do** lay every reading surface on raked gravel (`gravel` with rake lines `rgba(120,100,60,0.05)` every 7px) or a hedge band, alternating with `gravel-2` for rhythm.
- **Do** frame photographs, maps and cartouches with the double hairline gilt frame and corner scrolls, padded 9px.
- **Do** set section titles in uppercase Castoro Titling and pair them with a `muted` lede of at most 60ch.
- **Do** open content along an axis: words rising from a clipped line, blocks unfolding from their centre, rules drawing outward, on `cubic-bezier(0.16, 1, 0.3, 1)`; and turn every pinned stage into a normal band under reduced motion.
- **Do** end each data block with a source note and offer a table view for every chart.

### Don't:
- **Don't** round a control, card or frame; circles are for basins, flag roundels and the loader only.
- **Don't** use porphyry for anything other than Uzbekistan in the comparison.
- **Don't** pour gilt into gradients or large fills; it is line work and markers.
- **Don't** shadow persistent surfaces; only floating tooltip and dialog layers lift.
- **Don't** set Castoro Titling in lowercase, bold, or for running text.
- **Don't** let a reveal start invisible on desktop; content begins at 15% opacity.
