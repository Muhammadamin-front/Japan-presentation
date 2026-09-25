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
