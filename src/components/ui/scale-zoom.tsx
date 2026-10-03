"use client"

/**
 * One-scale descent: Uzbekistan → Tashkent → Vatican, all drawn in the same
 * equal-area kilometre space (lib/geo.ts). The pinned stage's progress drives
 * the SVG viewBox on a logarithmic zoom, written straight to the DOM so the
 * scrub never re-renders React. A cartographic scale bar re-labels itself as
 * the view descends three orders of magnitude.
 */

import { useEffect, useRef, useState } from "react"
import { TASHKENT, TASHKENT_R, UZ_BOX, UZ_PATH, VAT_BOX, VAT_PATH } from "@/lib/geo"
import { registerStage } from "@/lib/scroll"
import { clamp, cn } from "@/lib/utils"

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const C0 = { x: UZ_BOX.x + UZ_BOX.w / 2, y: UZ_BOX.y + UZ_BOX.h / 2 }
const W0 = UZ_BOX.w * 1.12
const W1 = TASHKENT_R * 2 * 2.6
const C2 = { x: VAT_BOX.x + VAT_BOX.w / 2, y: VAT_BOX.y + VAT_BOX.h / 2 }
const W2 = Math.max(VAT_BOX.w, VAT_BOX.h) * 2.4

/** Progress → view (centre, width in km). Holds at each level so the presenter can talk. */
function view(p: number) {
  const a = ease(clamp((p - 0.16) / 0.3))
  const b = ease(clamp((p - 0.6) / 0.3))
  if (b <= 0) {
    const w = Math.exp(lerp(Math.log(W0), Math.log(W1), a))
    const k = (1 - w / W0) / (1 - W1 / W0)
    return { x: lerp(C0.x, TASHKENT.x, k), y: lerp(C0.y, TASHKENT.y, k), w }
  }
  const w = Math.exp(lerp(Math.log(W1), Math.log(W2), b))
  return { x: lerp(TASHKENT.x, C2.x, b), y: lerp(TASHKENT.y, C2.y, b), w }
}

function niceKm(km: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(km)))
  const n = km / pow
  const step = n >= 5 ? 5 : n >= 2 ? 2 : 1
  return step * pow
}

export const SCALE_STOPS_AT = "0.08,0.5,0.95"

export function ScaleZoom({ stageRef, onLevel }: { stageRef: React.RefObject<HTMLElement | null>; onLevel?: (i: number) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const barLabel = useRef<HTMLSpanElement>(null)
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const stage = stageRef.current
    const svg = svgRef.current
    if (!stage || !svg) return
    let lastLevel = -1
    const apply = (p: number) => {
      const v = view(p)
      const r = svg.getBoundingClientRect()
      const aspect = r.height / Math.max(1, r.width)
      const h = v.w * aspect
      svg.setAttribute("viewBox", `${v.x - v.w / 2} ${v.y - h / 2} ${v.w} ${h}`)
      // Scale bar: about 140 px of screen, rounded to a cartographer's length.
      const kmPerPx = v.w / Math.max(1, r.width)
      const km = niceKm(kmPerPx * 140)
      if (barRef.current) barRef.current.style.width = `${km / kmPerPx}px`
      if (barLabel.current) barLabel.current.textContent = km >= 1 ? `${km.toLocaleString("ru-RU")} km` : `${Math.round(km * 1000)} m`
      const lv = p < 0.33 ? 0 : p < 0.75 ? 1 : 2
      if (lv !== lastLevel) {
        lastLevel = lv
        setLevel(lv)
        onLevel?.(lv)
      }
    }
    const off = registerStage(stage, apply)
    const ro = new ResizeObserver(() => apply(Number(stage.style.getPropertyValue("--p")) || 0))
    ro.observe(svg)
    return () => {
      off()
      ro.disconnect()
    }
  }, [stageRef, onLevel])

  return (
    <div className="relative h-full w-full">
      <svg ref={svgRef} role="img" aria-label="O‘zbekiston, Toshkent va Vatikan bir xil masshtabda" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <path d={UZ_PATH} fill="rgba(142,47,37,0.09)" stroke="var(--color-porphyry)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <circle
          cx={TASHKENT.x}
          cy={TASHKENT.y}
          r={TASHKENT_R}
          fill="rgba(142,47,37,0.08)"
          stroke="var(--color-porphyry)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
          className={cn("transition-opacity duration-700", level >= 1 ? "opacity-100" : "opacity-0")}
        />
        <circle cx={TASHKENT.x} cy={TASHKENT.y} r={W0 / 260} fill="var(--color-porphyry)" className={cn("transition-opacity duration-500", level === 0 ? "opacity-100" : "opacity-0")} />
        <path d={VAT_PATH} fill="var(--color-hedge)" stroke="var(--color-gilt)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-1.5 text-hedge-deep">
        <span ref={barLabel} className="tnum text-sm font-medium">
          500 km
        </span>
        <div ref={barRef} className="h-2 border-x border-b border-hedge-deep" style={{ width: 140 }} />
      </div>
    </div>
  )
}
