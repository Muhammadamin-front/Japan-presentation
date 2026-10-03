"use client"

/**
 * Parallax (parallax.md, Osmo) — the same GSAP ScrollTrigger timeline and layer
 * speeds, carried by a photograph of St Peter's dome rising over the Vatican
 * Gardens: the photo rides the middle speed, the engraved title drifts slower
 * in front of it, and a bank of clipped hedge (the front layer) closes the
 * view into the gravel below. Lenis is driven once for the page in lib/scroll.ts.
 */

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ParallaxComponent({
  title,
  image,
  alt,
  width,
  height,
  position = "50% 30%",
}: {
  title: ReactNode
  image: string
  alt: string
  width: number
  height: number
  position?: string
}) {
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
        { layer: "2", yPercent: 45 },
        { layer: "3", yPercent: 60 },
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
    <div ref={parallaxRef} className="relative h-svh min-h-[620px] overflow-hidden bg-hedge">
      <div data-parallax-layers className="absolute inset-0">
        <img
          data-parallax-layer="2"
          src={image}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ objectPosition: position }}
        />

        <div data-parallax-layer="3" className="absolute inset-x-0 top-[9%] flex flex-col items-center px-6 text-center will-change-transform">
          {title}
        </div>

        {/* Front layer: the clipped hedge closing the view; it overhangs the bottom so its drift never opens a seam */}
        <div
          data-parallax-layer="4"
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-[14%] h-[44%] bg-[linear-gradient(180deg,rgba(31,59,42,0)_0%,rgba(31,59,42,0.82)_40%,var(--color-hedge)_64%)] will-change-transform"
        />
      </div>
    </div>
  )
}
