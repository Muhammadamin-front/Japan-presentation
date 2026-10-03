/**
 * Computed parterre de broderie: one quarter of scrollwork is generated from
 * a seed and mirrored four ways inside a box-hedge border, the way a garden
 * plan is laid out from one axis. Returned as an SVG data URL so it can tile
 * as a background (the drifting aurora layer) at any size.
 */

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function parterreTile(seed = 7, color = "#1f3b2a", opacity = 0.18, w = 520, h = 320) {
  const r = rng(seed)
  const cx = w / 2
  const cy = h / 2
  const q = []
  // Scroll arms in the top-left quarter, curling toward the centre basin.
  for (let i = 0; i < 4; i++) {
    const x0 = 30 + r() * (cx - 120)
    const y0 = 26 + r() * (cy - 70)
    const x1 = x0 + 40 + r() * 60
    const y1 = y0 + 10 + r() * 30
    const x2 = cx - 40 - r() * 30
    const y2 = cy - 20 - r() * 30
    const k = 8 + r() * 10
    q.push(`M${x0.toFixed(1)} ${y0.toFixed(1)} C${x1.toFixed(1)} ${(y0 - 26).toFixed(1)} ${(x2 - 60).toFixed(1)} ${(y1 + 40).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`)
    // the curl at the arm's end
    q.push(`M${x0.toFixed(1)} ${y0.toFixed(1)} c${-k} 0 ${-k} ${k} 0 ${k} c${k * 0.6} 0 ${k * 0.6} ${-k * 0.6} 0 ${-k * 0.6}`)
  }
  const quarter = q.join(" ")
  const g = (t) => `<path d="${quarter}" transform="${t}"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.6" stroke-linecap="round">
${g("")}${g(`translate(${w} 0) scale(-1 1)`)}${g(`translate(0 ${h}) scale(1 -1)`)}${g(`translate(${w} ${h}) scale(-1 -1)`)}
<rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="18"/>
<rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="12" stroke-opacity="${opacity * 0.6}"/>
<ellipse cx="${cx}" cy="${cy}" rx="34" ry="22"/><ellipse cx="${cx}" cy="${cy}" rx="22" ry="13"/>
<path d="M${cx} 18 V${cy - 22} M${cx} ${cy + 22} V${h - 18}" stroke-dasharray="2 6"/>
</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}
