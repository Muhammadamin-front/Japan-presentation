"use client"

/**
 * FountainSquare — the hero's live plate.
 *
 * Translation of the "Tubes" cursor hero (Hero animate.md) into the garden
 * world: the pointer still steers the scene, but here it is wind across the
 * water — both real fountains of St Peter's Square (Maderno 1614, Bernini
 * 1677) bend their jets toward it — and a click wakes a new jet with a ring
 * on the pavement. On load the two fountains wake in sequence, left then
 * right, like the water theatre of a formal garden.
 *
 * Fountain positions are measured on the photograph (1920 × 1280) and mapped
 * through the same object-fit: cover maths the <img> uses, so the jets stay
 * on the basins at any panel size.
 */

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const IMG_W = 1920
const IMG_H = 1280
/** Basin nozzles and the obelisk, in photo pixels. */
const FOUNTAINS = [
  { x: 630, y: 892, wake: 500 },
  { x: 1438, y: 900, wake: 1300 },
]
const OBELISK = { x: 1037, base: 930, top: 686 }

interface Drop {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
}
interface Ring {
  x: number
  y: number
  r: number
  a: number
}

export function FountainSquare({
  src,
  alt,
  posX = 0.58,
  posY = 0.55,
  className,
  children,
}: {
  src: string
  alt: string
  posX?: number
  posY?: number
  className?: string
  children?: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const axisRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const axis = axisRef.current
    if (!host || !canvas || !axis) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    let s = 1
    let ox = 0
    let oy = 0
    let raf = 0
    let visible = false
    let wind = 0
    let windTarget = 0
    const start = performance.now()
    const drops: Drop[] = []
    const rings: Ring[] = []
    const extra: { x: number; y: number; until: number }[] = []

    // Photo pixel → canvas pixel, matching object-fit: cover + object-position.
    const map = (px: number, py: number) => ({ x: ox + px * s, y: oy + py * s })

    const layout = () => {
      const r = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s = Math.max(w / IMG_W, h / IMG_H)
      ox = (w - IMG_W * s) * posX
      oy = (h - IMG_H * s) * posY
      // The grand axis overlay is drawn in the same mapped space.
      const top = map(OBELISK.x, OBELISK.top)
      const base = map(OBELISK.x, OBELISK.base)
      axis.setAttribute("viewBox", `0 0 ${w} ${h}`)
      const line = axis.querySelector<SVGLineElement>("[data-axis]")
      line?.setAttribute("x1", String(top.x))
      line?.setAttribute("x2", String(top.x))
      line?.setAttribute("y1", "0")
      line?.setAttribute("y2", String(h))
      // The square is photographed from the dome, so its circles read as ellipses.
      axis.querySelectorAll<SVGEllipseElement>("[data-basin]").forEach((c, i) => {
        const p = map(FOUNTAINS[i].x, FOUNTAINS[i].y + 14)
        c.setAttribute("cx", String(p.x))
        c.setAttribute("cy", String(p.y))
        c.setAttribute("rx", String(62 * s))
        c.setAttribute("ry", String(26 * s))
      })
      // Bernini's paving: radial lines from the obelisk ring out to the colonnade ellipse, drawn as plan linework.
      const plan = axis.querySelector<SVGPathElement>("[data-plan]")
      if (plan) {
        const c = map(OBELISK.x, OBELISK.base + 4)
        const parts: string[] = []
        for (let k = 0; k < 16; k++) {
          const t = (k / 16) * Math.PI * 2
          const x1 = c.x + Math.cos(t) * 175 * s
          const y1 = c.y + Math.sin(t) * 62 * s
          const x2 = c.x + Math.cos(t) * 470 * s
          const y2 = c.y + Math.sin(t) * 165 * s
          parts.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`)
        }
        const rx = 470 * s
        const ry = 165 * s
        parts.push(`M${(c.x - rx).toFixed(1)} ${c.y.toFixed(1)}a${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 0 ${(2 * rx).toFixed(1)} 0a${rx.toFixed(1)} ${ry.toFixed(1)} 0 1 0 ${(-2 * rx).toFixed(1)} 0`)
        plan.setAttribute("d", parts.join(""))
      }
      const ob = axis.querySelector<SVGEllipseElement>("[data-obelisk]")
      ob?.setAttribute("cx", String(base.x))
      ob?.setAttribute("cy", String(base.y + 4))
      ob?.setAttribute("rx", String(175 * s))
      ob?.setAttribute("ry", String(62 * s))
    }

    const emit = (x: number, y: number, power: number) => {
      const n = 8
      for (let i = 0; i < n; i++) {
        const spread = (Math.random() - 0.5) * 0.5
        drops.push({
          x: x + (Math.random() - 0.5) * 2,
          y,
          vx: spread + wind * 0.9,
          vy: -(power * (0.86 + Math.random() * 0.22)),
          life: 0,
          max: 70 + Math.random() * 30,
        })
      }
    }

    const frame = (now: number) => {
      raf = 0
      const t = now - start
      wind += (windTarget - wind) * 0.04
      ctx.clearRect(0, 0, w, h)
      const power = Math.max(2.2, 7.2 * Math.sqrt(s))

      FOUNTAINS.forEach((f) => {
        if (t < f.wake) return
        const ramp = Math.min(1, (t - f.wake) / 1400)
        const p = map(f.x, f.y)
        if (p.x > -20 && p.x < w + 20) emit(p.x, p.y, power * (0.35 + 0.65 * ramp))
      })
      for (let i = extra.length - 1; i >= 0; i--) {
        if (now > extra[i].until) extra.splice(i, 1)
        else emit(extra[i].x, extra[i].y, power * 0.9)
      }

      const g = 0.16 * Math.sqrt(s) + 0.05
      ctx.lineCap = "round"
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.vy += g
        d.vx += wind * 0.012
        d.x += d.vx
        d.y += d.vy
        d.life++
        if (d.life > d.max) {
          drops.splice(i, 1)
          continue
        }
        const a = Math.min(1, d.life / 6) * (1 - d.life / d.max) * 0.95
        ctx.strokeStyle = `rgba(246, 245, 239, ${a})`
        ctx.lineWidth = 1.7
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.vx * 1.6, d.y - d.vy * 1.6)
        ctx.stroke()
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i]
        r.r += 1.4
        r.a *= 0.965
        if (r.a < 0.02) {
          rings.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(210, 180, 108, ${r.a})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.42, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (visible) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      windTarget = ((e.clientX - r.left) / r.width - 0.5) * 2.4
    }
    const onLeave = () => (windTarget = 0)
    const onDown = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      extra.push({ x, y, until: performance.now() + 2600 })
      rings.push({ x, y, r: 4, a: 0.9 })
    }

    const ro = new ResizeObserver(layout)
    ro.observe(host)
    layout()
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting && !reduce
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(host)
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("pointerdown", onDown)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
    }
  }, [posX, posY])

  return (
    <div ref={hostRef} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        width={IMG_W}
        height={IMG_H}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: `${posX * 100}% ${posY * 100}%` }}
      />
      {/* Gilt plan lines laid over the photograph: the grand axis, the obelisk circle, both basins */}
      <svg ref={axisRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line data-axis className="draw" pathLength={1} stroke="var(--color-gilt-light)" strokeWidth="1.5" strokeOpacity="0.9" />
        <ellipse data-obelisk className="draw" pathLength={1} fill="none" stroke="var(--color-gilt-light)" strokeWidth="1.8" />
        <ellipse data-basin className="draw" pathLength={1} fill="none" stroke="var(--color-gilt-light)" strokeWidth="1.8" />
        <ellipse data-basin className="draw" pathLength={1} fill="none" stroke="var(--color-gilt-light)" strokeWidth="1.8" />
        <path data-plan fill="none" stroke="var(--color-gilt-light)" strokeWidth="1" strokeOpacity="0.85" />
      </svg>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full cursor-crosshair" />
      {children}
    </div>
  )
}
