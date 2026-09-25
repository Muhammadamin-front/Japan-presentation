
import { clsx, } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Reveal delay for a [data-rev] atom. */
export const delay = (ms) => ({ "--d": `${ms}ms` }) 
/** Stagger index for a .w word span. */
export const wordIndex = (i) => ({ "--i": i }) 
