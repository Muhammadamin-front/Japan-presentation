"use client"

/**
 * 3D CoverFlow carousel (prompt.md, 21st.dev) re-cut as a gallery of the
 * Vatican Museums: framed plates in gilt double rules on a hedge ground,
 * the blurred current plate as the room's ambience. Changes from the source:
 * the window-wide ←/→ listener is removed (those keys belong to the
 * presenter), the arrows are real buttons, offsets scale with the stage
 * width, and reduced motion turns autoplay off.
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface CoverItem {
  img: string
  title: string
  sub: string
  desc: string
}

export function CoverFlow({ items, autoplayDelay = 5200, className }: { items: CoverItem[]; autoplayDelay?: number; className?: string }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [unit, setUnit] = useState(285)
  const stageRef = useRef<HTMLDivElement>(null)
  const touchX = useRef(0)
  const total = items.length

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || hovered || total <= 1) return
    const id = setInterval(next, autoplayDelay)
    return () => clearInterval(id)
  }, [autoplayDelay, hovered, next, total])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setUnit(Math.min(300, Math.max(120, e.contentRect.width * 0.24))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const item = items[current]

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-hedge-deep py-8 select-none", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const d = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(d) > 45) (d < 0 ? next : prev)()
      }}
    >
      {/* Ambience: the current plate, blurred into the room */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img key={item.img} src={item.img} alt="" className="h-full w-full scale-110 object-cover opacity-40 blur-[30px] saturate-[0.8] transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,38,26,0.35)_0%,rgba(19,38,26,0.94)_100%)]" />
      </div>

      <div ref={stageRef} className="relative mx-auto flex h-[min(480px,50svh)] w-full max-w-6xl items-center justify-center [perspective:1400px]">
        {items.map((it, idx) => {
          const off = (idx - current + total) % total
          let t = "translateX(0) scale(0.4)"
          let o = 0
          let z = 0
          let f = "brightness(0.4)"
          if (off === 0) (t = "translateX(0) scale(1)"), (o = 1), (z = 30), (f = "none")
          else if (off === 1) (t = `translateX(${unit}px) scale(0.82) rotateY(-26deg)`), (o = 0.7), (z = 20), (f = "brightness(0.7)")
          else if (off === 2) (t = `translateX(${unit * 1.78}px) scale(0.66) rotateY(-40deg)`), (o = 0.4), (z = 10), (f = "brightness(0.5)")
          else if (off === total - 1) (t = `translateX(${-unit}px) scale(0.82) rotateY(26deg)`), (o = 0.7), (z = 20), (f = "brightness(0.7)")
          else if (off === total - 2) (t = `translateX(${-unit * 1.78}px) scale(0.66) rotateY(40deg)`), (o = 0.4), (z = 10), (f = "brightness(0.5)")
          const center = off === 0
          return (
            <figure
              key={it.title}
              onClick={() => !center && setCurrent(idx)}
              aria-hidden={!center}
              className="absolute m-0 h-[min(440px,47svh)] w-[min(300px,60vw)] overflow-hidden border border-gilt-light/70 bg-hedge outline-1 outline-offset-[-8px] outline-gilt-light/40 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: t, opacity: o, zIndex: z, filter: f, cursor: center ? "default" : "pointer" }}
            >
              <img src={it.img} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,38,26,0)_40%,rgba(19,38,26,0.72)_68%,rgba(19,38,26,0.96)_100%)]" />
              <figcaption
                className={cn(
                  "absolute inset-x-0 bottom-0 p-6 text-center transition-[opacity,transform] duration-500",
                  center ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <p className="engr text-[1.35rem] tracking-[0.08em] text-spray">{it.title}</p>
                <p className="latin mt-1 text-gilt-light">{it.sub}</p>
                <span aria-hidden="true" className="mx-auto my-3 block h-px w-10 bg-gilt-light" />
                <p className="text-[0.95rem] leading-snug text-spray/90">{it.desc}</p>
              </figcaption>
            </figure>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-6">
        <button type="button" onClick={prev} aria-label="Oldingi asar" className="grid size-11 place-items-center border border-gilt-light/50 text-gilt-light transition-colors hover:bg-gilt-light hover:text-hedge-deep">
          <ChevronLeft className="size-5" strokeWidth={1.6} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Asarlar">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={it.title}
              onClick={() => setCurrent(i)}
              className={cn("h-2 rotate-45 transition-all duration-500", i === current ? "w-2 bg-gilt-light" : "w-2 bg-spray/30 hover:bg-spray/60")}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Keyingi asar" className="grid size-11 place-items-center border border-gilt-light/50 text-gilt-light transition-colors hover:bg-gilt-light hover:text-hedge-deep">
          <ChevronRight className="size-5" strokeWidth={1.6} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {item.title}, {item.sub}
      </p>
    </div>
  )
}
