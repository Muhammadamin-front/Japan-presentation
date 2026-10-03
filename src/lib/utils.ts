import type { CSSProperties } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Reveal delay for a [data-rev] atom. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties
/** Stagger index for a .w word span. */
export const wordIndex = (i: number) => ({ "--i": i }) as CSSProperties

/** Roman numerals for stop counters — the Vatican's own way of counting (Leo XIV). */
export function roman(n: number) {
  const map: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ]
  let out = ""
  for (const [v, s] of map) while (n >= v) (out += s), (n -= v)
  return out
}

/** Uzbek number formatting (space thousands, comma decimals) via ru-RU, which every browser ships. */
export const fmt = (v: number, d = 0) => v.toLocaleString("ru-RU", { minimumFractionDigits: d, maximumFractionDigits: d })
