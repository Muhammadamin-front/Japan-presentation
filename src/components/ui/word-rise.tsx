/**
 * Per-word "ink settling" rise (scroll-web.md per-atom motion). Each word is an
 * inline-block that resolves from blur into focus on a 40ms stagger once the
 * parent enters view (the single reveal observer adds `is-in`).
 */

import type { CSSProperties, ElementType } from "react"
import { cn } from "@/lib/utils"

interface WordRiseProps {
  text: string
  as?: ElementType
  className?: string
  start?: number
}

export function WordRise({ text, as: Tag = "span", className, start = 0 }: WordRiseProps) {
  const words = text.split(" ")
  return (
    <Tag className={cn(className)} data-words="">
      {words.map((w, i) => (
        <span key={i}>
          <span className="w" style={{ "--i": i + start } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  )
}
