 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * One scroll spine for the whole page (scroll-web.md: ONE rAF-throttled handler
 * writing CSS custom properties) plus Lenis smooth scrolling and GSAP
 * ScrollTrigger (parallax.md), plus hash sync and presenter navigation between "stops".
 */

import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { clamp } from "./utils"

gsap.registerPlugin(ScrollTrigger)

let lenis = null


const stages = new Set()
const listeners = new Set()
let ticking = false

function measure() {
  ticking = false
  const vh = window.innerHeight
  for (const s of stages) {
    const r = s.el.getBoundingClientRect()
    const span = r.height - vh
    const p = span > 0 ? clamp(-r.top / span) : r.top <= 0 ? 1 : 0
    if (Math.abs(p - s.last) > 0.0005) {
      s.last = p
      s.el.style.setProperty("--p", p.toFixed(4))
      _optionalChain([s, 'access', _ => _.cb, 'optionalCall', _2 => _2(p)])
    }
  }
  const y = window.scrollY
  for (const l of listeners) l(y)
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(measure)
}

export function startScroll() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!reduce && !lenis) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => _optionalChain([lenis, 'optionalAccess', _3 => _3.raf, 'call', _4 => _4(time * 1000)]))
    gsap.ticker.lagSmoothing(0)
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  onScroll()
  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    _optionalChain([lenis, 'optionalAccess', _5 => _5.destroy, 'call', _6 => _6()])
    lenis = null
  }
}

/** Register a pinned stage; its progress 0..1 is written to --p and passed to cb. */
export function registerStage(el, cb) {
  const s = { el, cb, last: -1 }
  stages.add(s)
  onScroll()
  return () => {
    stages.delete(s)
  }
}

export function onScrollY(fn) {
  listeners.add(fn)
  fn(window.scrollY)
  return () => {
    listeners.delete(fn)
  }
}

export function scrollToY(y, immediate = false) {
  if (lenis) lenis.scrollTo(y, { duration: immediate ? 0 : 1.35, immediate, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" })
}

/** Below the rail breakpoint a 48px bar sits over the page; slides are framed beneath it. */
const barOffset = () => (window.innerWidth < 1024 ? 48 : 0)

export function scrollToId(id, immediate = false) {
  const el = document.getElementById(id)
  if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - barOffset(), immediate)
}

/** Every stop is addressable: the hash follows the presenter, so a refresh returns to the same section. */
export function syncHash(id) {
  if (location.hash.slice(1) !== id) history.replaceState(null, "", `#${id}`)
}

export function restoreHash() {
  const id = decodeURIComponent(location.hash.slice(1))
  if (id) requestAnimationFrame(() => scrollToId(id, true))
}

/**
 * Stops for the presenter: every [data-stop] element's top, and for pinned
 * stages carrying data-stops="0.08,0.25,…" one stop per progress value.
 */
export function collectStops() {
  const out = []
  const vh = window.innerHeight
  document.querySelectorAll("[data-stop]").forEach((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY
    const list = el.dataset.stops
    if (list) {
      const span = el.offsetHeight - vh
      for (const v of list.split(",")) out.push(Math.round(top + parseFloat(v) * span))
    } else out.push(Math.round(top - barOffset()))
  })
  return Array.from(new Set(out)).sort((a, b) => a - b)
}

export function step(dir) {
  const stops = collectStops()
  const y = lenis ? lenis.targetScroll : window.scrollY
  const next = dir === 1 ? stops.find((s) => s > y + 6) : [...stops].reverse().find((s) => s < y - 6)
  // Past the last stop there is nothing new to frame, so the page stays put.
  if (next !== undefined) scrollToY(next)
}
