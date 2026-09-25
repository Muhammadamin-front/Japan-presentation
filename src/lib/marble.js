/**
 * Mathematical marbling (suminagashi) rendered to a texture.
 *
 * Operations are applied to the surface in order: ink drops (area-preserving
 * push, the same map the hero's WebGL basin uses), tine strokes (a comb drawn
 * through the bath) and waves. To colour a pixel we run the operations
 * backwards: undo each tine/wave, and for each drop either land inside it (that
 * drop's colour) or pull the point back to where it sat before the drop.
 * The result is the real pattern, not a picture of one.
 */







const hex = (h) => {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

 

const PALETTES = {
  /** Dark: controls on indigo depth. Veins stay dark enough for paper text. */
  ink: { bg: "#0a1a33", inks: ["#2b3d5e", "#3a4d70", "#1e2d4a", "#4a5d80"], clear: "#16264a" },
  /** Light: a quiet ground for reading, hairline veins only. */
  mist: { bg: "#f6f7f9", inks: ["#e6eaef", "#dde2e8", "#eef1f4", "#d3d9e1"], clear: "#f6f7f9" },
  /** Endpaper band between paper and the indigo pool. */
  endpaper: { bg: "#f6f7f9", inks: ["#1e2d4a", "#606d80", "#0a1a33", "#aeb6c2"], clear: "#f6f7f9" },
}

function buildOps(w, h, preset, seed) {
  const rnd = mulberry32(seed)
  const pal = PALETTES[preset]
  const ops = []
  const centers = preset === "endpaper" ? 7 : 4
  const ringsPer = 9
  // Size the drops so together they cover a set share of the sheet (mean factor² ≈ 0.47 below);
  // tiny drops on a small texture would leave it a flat field.
  const coverage = preset === "mist" ? 0.55 : 0.8
  const base = Math.sqrt((coverage * w * h) / (Math.PI * centers * ringsPer * 0.47))
  for (let c = 0; c < centers; c++) {
    // Spread the drop points evenly along the sheet so the combing reaches its whole width.
    const x = ((c + 0.5 + (rnd() - 0.5) * 0.6) / centers) * w
    const y = (0.2 + rnd() * 0.6) * h
    const rings = ringsPer - 2 + Math.floor(rnd() * 5)
    for (let i = 0; i < rings; i++) {
      const ink = i % 2 === 0
      ops.push({
        kind: "drop",
        x,
        y,
        r: base * (ink ? 0.35 + rnd() * 0.25 : 0.6 + rnd() * 0.5),
        color: hex(ink ? pal.inks[Math.floor(rnd() * pal.inks.length)] : pal.clear),
      })
    }
  }
  // Comb the bath: parallel tines, then a gentle wave — the classic "feathered" pass.
  const tines = 5
  for (let i = 0; i < tines; i++) {
    const y = ((i + 0.5) / tines) * h
    const dir = i % 2 === 0 ? 1 : -1
    ops.push({ kind: "tine", x: 0, y, dx: dir, dy: 0, alpha: w * 0.12, lambda: h * 0.06 })
  }
  ops.push({ kind: "wave", axis: "y", amp: h * 0.05, period: w * 0.45, phase: rnd() * Math.PI * 2 })
  ops.push({ kind: "wave", axis: "x", amp: w * 0.015, period: h * 0.9, phase: rnd() * Math.PI * 2 })
  return ops
}

function colorAt(px, py, ops, bg) {
  let x = px
  let y = py
  for (let k = ops.length - 1; k >= 0; k--) {
    const o = ops[k]
    if (o.kind === "wave") {
      if (o.axis === "y") y -= o.amp * Math.sin((2 * Math.PI * x) / o.period + o.phase)
      else x -= o.amp * Math.sin((2 * Math.PI * y) / o.period + o.phase)
    } else if (o.kind === "tine") {
      // Displacement along the tine direction, decaying with distance d from it.
      const d = Math.abs((x - o.x) * o.dy - (y - o.y) * o.dx)
      const z = (o.alpha * o.lambda) / (d + o.lambda)
      x -= z * o.dx
      y -= z * o.dy
    } else {
      const ex = x - o.x
      const ey = y - o.y
      const d2 = ex * ex + ey * ey
      const r2 = o.r * o.r
      if (d2 < r2) return o.color
      const s = Math.sqrt(1 - r2 / d2)
      x = o.x + ex * s
      y = o.y + ey * s
    }
  }
  return bg
}

const cache = new Map()

/** Render a marbled texture once and return it as a data URL (cached). */
export function marbleTexture(preset, w = 640, h = 220, seed = 7) {
  const key = `${preset}-${w}-${h}-${seed}`
  const hit = cache.get(key)
  if (hit) return hit
  if (typeof document === "undefined") return ""
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""
  const img = ctx.createImageData(w, h)
  const ops = buildOps(w, h, preset, seed)
  const bg = hex(PALETTES[preset].bg)
  // 2×2 supersampling keeps the hairline veins smooth.
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      let r = 0
      let g = 0
      let b = 0
      for (const [ox, oy] of [
        [0.25, 0.25],
        [0.75, 0.25],
        [0.25, 0.75],
        [0.75, 0.75],
      ]) {
        const c = colorAt(i + ox, j + oy, ops, bg)
        r += c[0]
        g += c[1]
        b += c[2]
      }
      const p = (j * w + i) * 4
      img.data[p] = r / 4
      img.data[p + 1] = g / 4
      img.data[p + 2] = b / 4
      img.data[p + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  const url = canvas.toDataURL("image/png")
  cache.set(key, url)
  return url
}
