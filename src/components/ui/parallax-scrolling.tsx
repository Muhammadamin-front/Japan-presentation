"use client"

/**
 * Parallax (parallax.md, Osmo) — the same GSAP ScrollTrigger timeline and layer
 * speeds, carried by a real photograph of Mount Fuji: the photo rides the
 * middle speed, the title drifts slower in front of it, and a band of mist
 * (the front layer) dissolves the city into the paper below.
 * Lenis is driven once for the whole page in lib/scroll.ts.
 */

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ParallaxComponent({ title, image, alt }: { title: ReactNode; image: string; alt: string }) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]")
    if (!triggerElement) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: triggerElement, start: "0% 0%", end: "100% 0%", scrub: 0 },
      })
      const layers = [
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ]
      layers.forEach((l, idx) => {
        tl.to(triggerElement.querySelectorAll(`[data-parallax-layer="${l.layer}"]`), { yPercent: l.yPercent, ease: "none" }, idx === 0 ? undefined : "<")
      })
    }, parallaxRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={parallaxRef} className="relative h-svh min-h-[620px] overflow-hidden bg-paper">
      <div data-parallax-layers className="absolute inset-0">
        <img
          data-parallax-layer="2"
          src={image}
          alt={alt}
          width={2400}
          height={1561}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_62%] saturate-[0.88] will-change-transform"
        />

        <div data-parallax-layer="3" className="absolute inset-x-0 top-[5%] flex flex-col items-center text-center will-change-transform">
          {title}
        </div>

        {/* Front layer: mist rising off the valley; it overhangs the bottom so its drift never opens a seam */}
        <div
          data-parallax-layer="4"
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-[14%] h-[48%] bg-[linear-gradient(180deg,rgba(246,247,249,0)_0%,rgba(246,247,249,0.8)_38%,var(--color-paper)_62%)] will-change-transform"
        />
      </div>
    </div>
  )
}
