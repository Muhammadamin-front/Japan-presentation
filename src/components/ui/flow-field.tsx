"use client"

/**
 * @name: FlowField (motion.md, kokonutui — MIT)
 * Adapted to the garden world: a "fountain" theme draws gilt and spray currents
 * across a dark basin of hedge-green water, the canvas sizes to its container
 * instead of the window, and the loop pauses when the section is off-screen.
 */

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type ColorTheme = "fountain" | "aurora" | "ember" | "ocean"
type ParticleDensity = "sparse" | "medium" | "dense"

interface Particle {
  x: number
  y: number
  speed: number
  hue: number
  life: number
  maxLife: number
}

interface ThemeConfig {
  hueStart: number
  hueRange: number
  saturation: number
  lightness: number
  bg: string
  trailAlpha: number
  size: number
}

export interface FlowFieldProps {
  className?: string
  children?: ReactNode
  theme?: ColorTheme
  density?: ParticleDensity
}

const PARTICLE_COUNTS: Record<ParticleDensity, number> = {
  sparse: 600,
  medium: 1200,
  dense: 2000,
}

const THEMES: Record<ColorTheme, ThemeConfig> = {
  fountain: { hueStart: 38, hueRange: 26, saturation: 48, lightness: 66, bg: "19, 38, 26", trailAlpha: 0.05, size: 1 },
  aurora: { hueStart: 120, hueRange: 200, saturation: 90, lightness: 62, bg: "5, 5, 8", trailAlpha: 0.06, size: 1.3 },
  ember: { hueStart: 0, hueRange: 55, saturation: 95, lightness: 58, bg: "8, 4, 2", trailAlpha: 0.07, size: 1.3 },
  ocean: { hueStart: 180, hueRange: 90, saturation: 88, lightness: 60, bg: "2, 6, 10", trailAlpha: 0.06, size: 1.3 },
}

/** Smooth organic 2D noise via a multi-octave trigonometric series. */
function fieldAngle(x: number, y: number, t: number): number {
  const s = 0.0025
  return (
    Math.sin(x * s + t * 0.0007) * Math.PI +
    Math.cos(y * s + t * 0.0005) * Math.PI +
    Math.sin((x + y) * s * 0.6 + t * 0.0009) * Math.PI * 0.6 +
    Math.cos((x - y) * s * 0.4 + t * 0.0006) * Math.PI * 0.4
  )
}

export default function FlowField({ className, children, theme = "fountain", density = "medium" }: FlowFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cfg = THEMES[theme]
    const count = PARTICLE_COUNTS[density]
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let animId = 0
    let time = 0
    let visible = false
    let particles: Particle[] = []

    const spawn = (): Particle => {
      const maxLife = 200 + Math.floor(Math.random() * 300)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.9 + Math.random() * 1.5,
        hue: cfg.hueStart + Math.random() * cfg.hueRange,
        life: Math.floor(Math.random() * maxLife),
        maxLife,
      }
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = `rgb(${cfg.bg})`
      ctx.fillRect(0, 0, width, height)
      particles = Array.from({ length: count }, spawn)
    }

    const render = () => {
      animId = 0
      time++
      ctx.fillStyle = `rgba(${cfg.bg}, ${cfg.trailAlpha})`
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, time)
        p.x += Math.cos(angle) * p.speed
        p.y += Math.sin(angle) * p.speed
        p.life++

        if (p.life > p.maxLife) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.life = 0
          p.hue = cfg.hueStart + Math.random() * cfg.hueRange
          continue
        }
        if (p.x < 0) p.x += width
        else if (p.x > width) p.x -= width
        if (p.y < 0) p.y += height
        else if (p.y > height) p.y -= height

        const progress = p.life / p.maxLife
        const alpha = Math.min(progress * 8, 1) * Math.min((1 - progress) * 6, 1) * 0.8
        const hueMod = (p.hue + (angle / (Math.PI * 2)) * 12 + 360) % 360

        ctx.beginPath()
        ctx.arc(p.x, p.y, cfg.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hueMod}, ${cfg.saturation}%, ${cfg.lightness}%, ${alpha})`
        ctx.fill()
      }
      if (visible && !reduce) animId = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? false
      if (visible && !animId) animId = requestAnimationFrame(render)
    })
    const ro = new ResizeObserver(resize)
    resize()
    if (reduce) for (let i = 0; i < 160; i++) render()
    ro.observe(host)
    io.observe(host)

    return () => {
      cancelAnimationFrame(animId)
      io.disconnect()
      ro.disconnect()
    }
  }, [theme, density])

  const bg = THEMES[theme].bg

  return (
    <div ref={hostRef} className={cn("relative w-full overflow-hidden", className)} style={{ background: `rgb(${bg})` }}>
      <canvas aria-hidden="true" className="pointer-events-none absolute inset-0" ref={canvasRef} />
      {/* Radial vignette — focuses centre, dims edges back into the basin */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 62% at 50% 50%, transparent 20%, rgba(${bg}, 0.9) 100%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: `linear-gradient(to bottom, rgb(${bg}), transparent)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: `linear-gradient(to top, rgb(${bg}), transparent)` }}
      />
      {children}
    </div>
  )
}
